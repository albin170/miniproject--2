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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    "You are a rural healthcare assistant. Give simple, safe medical advice and recommend seeing a doctor if symptoms are serious.\n\nPatient symptoms: " +
                    symptoms
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    res.status(200).json({
      reply: reply || "Unable to generate response"
    });

  } catch (error) {
    res.status(500).json({ error: "AI service error" });
  }
}
