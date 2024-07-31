// Set the date we're counting down to
const countdownDate = new Date("Jul 20, 2024 19:05:00").getTime();

function updateCountdownElement(id, value) {
  const element = document.getElementById(id);
  element.innerText = value;
  element.classList.remove("fade");
  void element.offsetWidth; // Trigger reflow to restart animation
  element.classList.add("fade");
}

// Play beep sound
function playBeepSound() {
  const beep = document.getElementById("countdown-beep");
  beep.play();
}

// Play finish song when countdown ends
function playFinishSong() {
  const finishSong = document.getElementById("finish-song");
  finishSong.play();
  finishSong.onended = () => {
    window.location.href = "/home"; // Redirect to /home route after song ends
  };
}

// Check countdown on page load
function checkCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    window.location.href = "/home";
  }
}

// Update the countdown every 1 second
const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Time calculations for days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the countdown elements
  updateCountdownElement("days", days);
  updateCountdownElement("hours", hours);
  updateCountdownElement("minutes", minutes);
  updateCountdownElement("seconds", seconds);

  // Play beep sound every second
  if (distance > 10000) {
    playBeepSound();
  }

  // Show final countdown when there are 10 seconds left
  if (distance <= 10000 && distance > 0) {
    document.querySelector(".countdown-container").style.opacity = "0";
    document.querySelector(".final-countdown").style.display = "block";
    document.getElementById("final-number").innerText = Math.ceil(
      distance / 1000
    );

    // Play the final countdown sound
    const finalCountdownSound = document.getElementById(
      "final-countdown-sound"
    );
    if (finalCountdownSound.paused) {
      finalCountdownSound.play();
    }
  }

  // If the countdown is finished, display 0 and then play the finish song
  if (distance < 1000 && distance >= 0) {
    // Display 0
    updateCountdownElement("days", 0);
    updateCountdownElement("hours", 0);
    updateCountdownElement("minutes", 0);
    updateCountdownElement("seconds", 0);

    // Stop the final countdown sound
    const finalCountdownSound = document.getElementById(
      "final-countdown-sound"
    );

    // Play the finish song after a short delay to ensure 0 is displayed
    setTimeout(playFinishSong, 1000);
  }

  // If the countdown is finished, clear the interval
  if (distance < 0) {
    clearInterval(countdownFunction);
  }
}, 1000);

// Update final countdown every second
const finalCountdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance <= 10000 && distance > 0) {
    document.getElementById("final-number").innerText = Math.ceil(
      distance / 1000
    );
  }

  if (distance < 0) {
    clearInterval(finalCountdownFunction);
  }
}, 1000);

// Check countdown on page load
window.onload = function () {
  checkCountdown();
};
