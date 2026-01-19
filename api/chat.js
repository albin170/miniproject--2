export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: "Symptoms required" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    "You are a rural healthcare assistant. Give simple, safe medical advice and suggest consulting a doctor if symptoms are serious.\n\nPatient symptoms: " +
                    symptoms
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // ✅ SAFE extraction
    const reply =
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0].text;

    return res.status(200).json({
      reply: reply || "AI could not generate a response. Please consult a healthcare professional."
    });

  } catch (error) {
    return res.status(500).json({ error: "AI service error" });
  }
}
