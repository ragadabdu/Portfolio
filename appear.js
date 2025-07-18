window.onload = function () {
  const numPopups = 18;
  const delayBetween = 200;

  for (let i = 0; i < numPopups; i++) {
    setTimeout(() => {
      fetch('popup.html')
        .then(response => {
          if (!response.ok) throw new Error("Failed to load popup.html");
          return response.text();
        })
        .then(html => {
          const container = document.createElement('div');
          container.innerHTML = html;
          const popup = container.querySelector('.pop-up');

          // Random position
          const x = Math.floor(Math.random() * (window.innerWidth - 300));
          const y = Math.floor(Math.random() * (window.innerHeight - 150));
          popup.style.left = `${x}px`;
          popup.style.top = `${y}px`;

          // Add close listeners
          popup.querySelector('.exit-btn').addEventListener('click', () => popup.remove());
          popup.querySelector('.ok').addEventListener('click', () => popup.remove());

          document.body.appendChild(popup);
        })
        .catch(err => console.error("Error loading popup:", err));
    }, i * delayBetween);
  }
};
