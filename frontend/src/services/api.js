const API_BASE = "http://localhost:8000/api";

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    console.error("Health check error:", err);
    return null;
  }
}

export async function fetchQuickCards() {
  try {
    const res = await fetch(`${API_BASE}/quick-cards`);
    return await res.json();
  } catch (err) {
    console.error("Quick cards error:", err);
    return [];
  }
}

export async function translateVoice(audioBlob, sourceLang, targetLang) {
  const formData = new FormData();
  formData.append("audio", audioBlob, "speech.webm");
  formData.append("source_lang", sourceLang);
  formData.append("target_lang", targetLang);

  const res = await fetch(`${API_BASE}/translate-voice`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Voice translation failed with status: ${res.status}`);
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
  });

  if (!res.ok) {
    throw new Error(`Text translation failed with status: ${res.status}`);
  }

  return await res.json();
}
