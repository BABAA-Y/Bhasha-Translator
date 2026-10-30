import { useState, useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

export function useBhashaSync() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const [mongoUser, setMongoUser] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasSyncedRef.current) return;

    let isMounted = true;

    async function syncWithBackend() {
      setIsSyncing(true);
      setSyncError(null);

      try {
        // Obtain authenticated Clerk session token
        const token = await getToken();
        if (!token) return;

        // Securely sync with FastAPI backend -> MongoDB
        const backendUrl = "http://localhost:8000";
        const res = await fetch(`${backendUrl}/api/auth/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Sync failed with status: ${res.status}`);
        }

        const data = await res.json();
        if (isMounted) {
          setMongoUser(data.user);
          hasSyncedRef.current = true;
          // Cache in localStorage for offline resiliency
          localStorage.setItem("bhasha_mongo_user", JSON.stringify(data.user));
        }
      } catch (err) {
        console.warn("MongoDB User Sync Note:", err.message);
        if (isMounted) {
          setSyncError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsSyncing(false);
        }
      }
    }

    syncWithBackend();

    return () => {
      isMounted = false;
    };
  }, [isLoaded, isSignedIn, getToken]);

  return {
    isLoaded,
    isSignedIn,
    clerkUser,
    mongoUser,
    isSyncing,
    syncError,
  };
}
