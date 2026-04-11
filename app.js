window.addEventListener("load", () => {
  const exhibits = document.querySelectorAll(".clickable");
  exhibits.forEach((exhibit) => {
    exhibit.addEventListener("click", () => {
      const topic = exhibit.getAttribute("data-topic");
      const responseDiv = document.getElementById("chat-response");
      responseDiv.style.display = "block";
      responseDiv.innerHTML = `<p><strong>${topic}</strong></p>`;
    });
  });
});
