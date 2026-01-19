export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: "Symptoms required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a rural healthcare assistant. Give safe advice and suggest a doctor if needed." },
          { role: "user", content: symptoms }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: "AI service error" });
  }
}
