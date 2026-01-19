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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    "You are a healthcare information assistant for rural areas. " +
                    "Do NOT give diagnosis or prescriptions. " +
                    "Only provide general health advice, home care tips, and clearly suggest consulting a doctor.\n\n" +
                    "Symptoms: " + symptoms
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200
          }
        })
      }
    );

    const data = await response.json();

    // 🔍 DEBUG SAFETY (optional)
    if (!data.candidates || data.candidates.length === 0) {
      return res.status(200).json({
        reply:
          "Based on your symptoms, please take rest, stay hydrated, and consult the nearest healthcare professional for proper evaluation."
      });
    }

    const reply = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      reply:
        "Unable to connect to AI service. Please consult a healthcare professional."
    });
  }
}

