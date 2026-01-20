const API_KEY = "AIzaSyCdyMmsY-WPBqb-KJjIqxA1Gy0qfTcDRLI"; // Gemini key

async function ask() {
  const q = document.getElementById("q").value;
  const out = document.getElementById("out");
  out.innerText = "Thinking...";

  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "Give general advice only.\n" + q }]
        }]
      })
    }
  );

  const j = await r.json();
  out.innerText =
    j?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Please consult a healthcare professional.";
}
