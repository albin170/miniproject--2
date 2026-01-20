const API_KEY = "AIzaSyCdyMmsY-WPBqb-KJjIqxA1Gy0qfTcDRLI"; // Gemini key

async function send() {
  const text = document.getElementById("userInput").value;
  const replyBox = document.getElementById("reply");

  replyBox.innerText = "Thinking...";

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text }]
        }]
      })
    }
  );

  const data = await response.json();

  replyBox.innerText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response from AI";
}

