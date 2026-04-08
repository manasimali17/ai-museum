const API_KEY = "YOUR_API_KEY"; // ← replace this

// Wait for A-Frame to load
window.addEventListener("load", () => {
  const exhibits = document.querySelectorAll(".clickable");

  exhibits.forEach((exhibit) => {
    exhibit.addEventListener("click", async () => {
      const topic = exhibit.getAttribute("data-topic");
      await askGuide(topic);
    });
  });
});

async function askGuide(topic) {
  const responseDiv = document.getElementById("chat-response");
  const loadingDiv = document.getElementById("loading");

  // Show loading state
  responseDiv.style.display = "none";
  loadingDiv.style.display = "block";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `You are a friendly museum guide AI. Explain this exhibit topic in 3-4 sentences in a way a college student can understand: "${topic}"`
          }
        ]
      })
    });

    const data = await res.json();
    const text = data.content[0].text;

    // Show response
    loadingDiv.style.display = "none";
    responseDiv.style.display = "block";
    responseDiv.innerHTML = `<p><strong>${topic}</strong><br><br>${text}</p>`;

  } catch (err) {
    loadingDiv.style.display = "none";
    responseDiv.style.display = "block";
    responseDiv.innerHTML = `<p style="color:#f87171">Error: ${err.message}</p>`;
  }
}