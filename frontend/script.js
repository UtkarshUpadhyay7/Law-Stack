async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (input.value.trim() === "") return;

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = input.value;
  chatBox.appendChild(userMsg);

  // AI loading message
  const aiMsg = document.createElement("div");
  aiMsg.className = "ai-msg";
  aiMsg.innerText = "⚖️ Analyzing law...";
  chatBox.appendChild(aiMsg);

  // Send request to backend
  const response = await fetch("http://localhost:5000/api/law/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: input.value })
  });

  const data = await response.json();
  aiMsg.innerText = `${data.summary}\n\n⚠️ ${data.disclaimer}`;

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
