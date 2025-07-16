export async function translateSubtitles (lines, targetLang) {
  try {
    const response = await fetch("http://localhost:3001/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({lines, targetLang}),
    });

    if (!response.ok) throw new Error("Translation failed");

    const data = await response.json();
    return data.translated;

  } catch (err) {
    console.error("Error translating subtitles:", err);
    return [];
  }
}
