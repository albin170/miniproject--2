async function askAI() {
  const symptoms = document.getElementById("symptoms").value;
  const responseBox = document.getElementById("response");

  responseBox.innerText = "Loading...";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms })
  });

  const data = await res.json();
  responseBox.innerText = data.reply;
}
