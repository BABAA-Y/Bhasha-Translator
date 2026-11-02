const getApiBase = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== "undefined" && window.location.hostname && window.location.hostname !== "localhost") {
    return `http://${window.location.hostname}:8000/api`;
  }
  return "http://localhost:8000/api";
};

const API_BASE = getApiBase();

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(6000) });
    return await res.json();
  } catch (err) {
    console.error("Health check error:", err);
    return null;
  }
}

export async function fetchQuickCards() {
  try {
    const res = await fetch(`${API_BASE}/quick-cards`, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn("Quick cards fetch notice, using fallback phrases:", err);
    return [];
  }
}

export async function translateVoice(audioBlob, sourceLang, targetLang) {
  const formData = new FormData();
  const fileExt = audioBlob.type.includes("mp4") ? "m4a" : "webm";
  formData.append("audio", audioBlob, `speech.${fileExt}`);
  formData.append("source_lang", sourceLang);
  formData.append("target_lang", targetLang);

  const res = await fetch(`${API_BASE}/translate-voice`, {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Voice translation failed (${res.status}): ${errText}`);
  }

  return await res.json();
}

export async function translateText(text, sourceLang, targetLang) {
  const res = await fetch(`${API_BASE}/translate-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      source_lang: sourceLang,
      target_lang: targetLang,
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Text translation failed (${res.status}): ${errText}`);
  }

  return await res.json();
}
