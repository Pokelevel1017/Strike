async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  const typing = addMessage("Typing...", "bot");

  const response = await fetch("https://strike-9c0k.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();
  typing.remove();
  addMessage(data.reply, "bot");
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}
