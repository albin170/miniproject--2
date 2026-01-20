export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST allowed" });
  }

  const { symptoms } = req.body || {};

  if (!symptoms) {
    return res.status(200).json({
      reply: "Please describe your health issue clearly."
    });
  }

  try {
    const geminiURL =
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY;

    const geminiRes = await fetch(geminiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text:
                  "Answer the user's question simply and clearly. " +
                  "Give general health guidance only.\n\nQuestion: " +
                  symptoms
              }
            ]
          }
        ]
      })
    });

    const data = await geminiRes.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Based on your question, please consult a nearby healthcare professional.";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(200).json({
      reply: "Unable to reach AI service. Please try again later."
    });
  }
}


