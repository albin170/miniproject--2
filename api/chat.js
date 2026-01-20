export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST allowed" });
  }

  const { symptoms } = req.body || {};

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Answer clearly:\n" + symptoms
            }]
          }]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Please consult a nearby healthcare professional for proper guidance.";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(200).json({
      reply: "AI service error. Try again later."
    });
  }
}
