const API_KEY = "AIzaSyCdyMmsY-WPBqb-KJjIqxA1Gy0qfTcDRLI"; // Replace with a secure new key

async function send() {
  const question = document.getElementById("userInput").value;
  const replyBox = document.getElementById("reply");
  replyBox.innerText = "Thinking...";

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Answer in simple words for awareness only. Question: " + question
            }]
          }]
        })
      }
    );

    const data = await res.json();
    console.log(data); // Check what Gemini actually returns

    if (
      data?.candidates?.length > 0 &&
      data.candidates[0].content?.parts?.length > 0
    ) {
      replyBox.innerText = data.candidates[0].content.parts[0].text;
    } else {
      replyBox.innerText = "AI returned no text. Try a simpler question.";
    }

  } catch (err) {
    console.log(err);
    replyBox.innerText = "Network or API error. Check your key.";
  }
}
