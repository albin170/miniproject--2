export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST allowed" });
  }

  const { symptoms } = req.body || {};

  if (!symptoms || symptoms.trim() === "") {
    return res.status(200).json({
      reply: "Please describe your symptoms clearly."
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              text:
                "Give simple general health advice (not diagnosis). " +
                "Answer clearly.\n\nQuestion: " + symptoms
            }]
          }]
        })
      }
    );

    const data = await response.json();

    // 🔥 LOGIC FIX (important)
    let reply = "Please consult a nearby healthcare professional for proper guidance.";

    if (
      data &&
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    }

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(200).json({
      reply: "AI service temporarily unavailable."
    });
  }
}

