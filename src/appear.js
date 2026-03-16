let maxPopups = 18;
let count = 0;

function playLoseSound() {
  const loseSound = new Audio('public/sounds/lose.mp3');
  loseSound.play();
}

function addSkipButton(popup) {
  const skipBtn = document.createElement('button');
  skipBtn.classList.add('skip-btn');
  skipBtn.textContent = 'Skip Intro';
  skipBtn.style.marginLeft = '10px'; // styling example
  popup.querySelector('.rectangular').appendChild(skipBtn);

  skipBtn.addEventListener('click', () => {
    // Clear all popups and intervals and go straight to homepage
    clearInterval(popupInterval);
    document.querySelectorAll('.pop-up').forEach(p => p.remove());
    window.location.href = 'homepage.html';
  });
}

function showYouLostPopup() {
  const lossPopup = document.createElement('div');
  lossPopup.classList.add('pop-up');
  lossPopup.style.position = 'fixed';
  lossPopup.style.top = '50%';
  lossPopup.style.left = '50%';
  lossPopup.style.transform = 'translate(-50%, -50%)';
  lossPopup.style.zIndex = '10000';
  lossPopup.style.border = '3px solid #773f32ff';
  lossPopup.style.boxShadow = '0 0 20px #A76D60 ';
  lossPopup.innerHTML = `
    <div class="rectangular">
      <p class="error">YOU LOST</p>
      <span class="exit-btn">X</span>
    </div>
    <div class="error-container">
      <img id="error-sign" src="public/images/error-icon.png" alt="error" />
      <p class="error-text">You lost.</p>
    </div>
    <button class="try-again">Try Again</button>
  `;

  document.body.appendChild(lossPopup);

  lossPopup.querySelector('.exit-btn').addEventListener('click', () => {
    lossPopup.remove();
  });

  lossPopup.querySelector('.try-again').addEventListener('click', () => {
    lossPopup.remove();
    // Trigger final popup again
    showFinalPopup();
  });
}

function showFinalPopup() {
  const finalPopup = document.createElement('div');
  finalPopup.classList.add('pop-up');
  finalPopup.style.position = 'fixed';
  finalPopup.style.top = '50%';
  finalPopup.style.left = '50%';
  finalPopup.style.transform = 'translate(-50%, -50%)';
  finalPopup.style.zIndex = '10000';
  finalPopup.style.border = '3px solid #b23012ff ';
  finalPopup.style.boxShadow = '0 0 20px #A76D60 ';
  finalPopup.innerHTML = `
    <div class="rectangular">
      <p class="error">TRY AGAIN</p>
      <span class="exit-btn">X</span>
    </div>
    <div class="error-container">
      <img id="error-sign" src="public/images/error-icon.png" alt="error" />
      <p class="error-text">Click <a class="ok" href="homepage.html" style="text-decoration: none;"><strong>OK</strong></a> to pass.</p>
    </div>
    <button id="ko-button">K.O</button>
  `;

  document.body.appendChild(finalPopup);

  finalPopup.querySelector('#ko-button').addEventListener('click', () => {
    playLoseSound();
    showYouLostPopup();
  });

  finalPopup.querySelector('.exit-btn').addEventListener('click', () => {
    finalPopup.remove();
  });
}


function createPopup(isLast = false) {
  fetch('popup.html')
    .then(response => response.text())
    .then(html => {
      const container = document.createElement('div');
      container.innerHTML = html;
      const popup = container.querySelector('.pop-up');
      const sound = new Audio('public/sounds/error-sound.wav');
      sound.play();

      // Position
      popup.style.position = 'fixed';
      if (isLast) {
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.zIndex = '9999';
        popup.style.border = '3px solid #ac3014ff ';
        popup.style.boxShadow = '0 0 20px #ac3014ff';
      } else {
        popup.style.top = `${Math.random() * 70 + 10}%`;
        popup.style.left = `${Math.random() * 70 + 10}%`;
      }

      document.body.appendChild(popup);
      popup.classList.add('glitch-effect');

      // Add event listener for close
      popup.querySelector('.exit-btn').addEventListener('click', () => popup.remove());

      const okBtn = popup.querySelector('.ok');

      if (isLast) {
        popup.querySelector('.error-text').innerHTML = `Click <a class="ok" href="homepage.html" style="text-decoration: none;"><strong>OK</strong></a> to pass.`;
        okBtn.innerText = "K.O";

        okBtn.addEventListener('click', () => {
          popup.remove();

          // Show "You lost" popup
          const lossPopup = document.createElement('div');
          lossPopup.classList.add('pop-up');
          lossPopup.style.position = 'fixed';
          lossPopup.style.top = '50%';
          lossPopup.style.left = '50%';
          lossPopup.style.transform = 'translate(-50%, -50%)';
          lossPopup.style.zIndex = '10000';
          lossPopup.style.border = '3px solid #773f32ff ';
          lossPopup.style.boxShadow = '0 0 20px #A76D60 ';
          lossPopup.innerHTML = `
            <div class="rectangular">
              <p class="error">YOU LOST</p>
              <span class="exit-btn">X</span>
            </div>
            <div class="error-container">
              <img id="error-sign" src="public/images/error-icon.png" alt="error" />
              <p class="error-text">You lost.</p>
            </div>
            <button class="try-again">Try Again</button>
          `;

          document.body.appendChild(lossPopup);
          

          // Play losing sound
          const loseSound = new Audio('public/sounds/lose.mp3');
          loseSound.play();

          lossPopup.querySelector('.exit-btn').addEventListener('click', () => {
            lossPopup.remove();
          });

          lossPopup.querySelector('.try-again').addEventListener('click', () => {
            lossPopup.remove();

            // Show the final popup again but with real OK link
            const finalPopup = document.createElement('div');
            finalPopup.classList.add('pop-up');
            finalPopup.style.position = 'fixed';
            finalPopup.style.top = '50%';
            finalPopup.style.left = '50%';
            finalPopup.style.transform = 'translate(-50%, -50%)';
            finalPopup.style.zIndex = '10000';
            finalPopup.style.border = '3px solid #806942ff';
            finalPopup.style.boxShadow = '0 0 20px #C9A66B';
            finalPopup.innerHTML = `
              <div class="rectangular">
                <p class="error">FINAL CHANCE</p>
                <span class="exit-btn">X</span>
              </div>
              <div class="error-container">
                <img id="error-sign" src="public/images/error-icon.png" alt="error" />
                <p class="error-text">Click <a class="ok" href="homepage.html" style="text-decoration: none;"><strong>OK</strong></a> to pass.</p>
              </div>
              <button id="ko-button">K.O</button>
            `;

            document.body.appendChild(finalPopup);
            const koBtn = finalPopup.querySelector('#ko-button');
            koBtn.addEventListener('click', () => {
             // You lost sequence
            playLoseSound();
            showYouLostPopup();
            });

            
            finalPopup.querySelector('.exit-btn').addEventListener('click', () => {
              finalPopup.remove();
            });
          });
        });
      } else {
        okBtn.addEventListener('click', () => popup.remove());
      }
    });
}

// Call the popups repeatedly
let popupInterval = setInterval(() => {
  count++;
  createPopup(count === maxPopups);
  if (count >= maxPopups) {
    clearInterval(popupInterval);
  }
}, 200);

