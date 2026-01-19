async function analyzeSymptoms() {
  const symptoms = document.getElementById("symptoms").value;
  const result = document.getElementById("result");

  if (!symptoms.trim()) {
    result.innerHTML = "Please enter symptoms";
    return;
  }

  result.innerHTML = "Analyzing with AI...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms })
    });

    const data = await response.json();
    result.innerHTML = `<b>AI Advice:</b><br>${data.reply}`;

  } catch (error) {
    result.innerHTML = "AI service error";
  }
}
