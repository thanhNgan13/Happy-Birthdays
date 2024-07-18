const text1 = "Mỗi người một quan điểm, mỗi người một cách code khác nhau.";
const text2 =
  "Đây là đoạn văn bản thứ hai, sẽ được hiển thị sau khi thổi tắt nến.";

let i = 0;
let j = 0;
let isTyping = false; // Biến để kiểm tra nếu đang trong quá trình typing
let count = 0;
let isListening = true; // Biến để kiểm tra nếu đang lắng nghe âm thanh

function startTypingEffect(text) {
  const sentences = text.split(". "); // Tách đoạn văn thành các câu
  i = 0; // Đặt lại biến i
  j = 0; // Đặt lại biến j

  const speed = 100; // Speed of typing
  const deleteSpeed = 5; // Speed of deleting
  const pauseBeforeDelete = 1000; // Pause before starting to delete
  const delayBetweenSentences = 500; // Delay before starting the next sentence
  const delayBetweenParagraphs = 2000; // Delay before repeating the paragraph

  // Xóa hoàn toàn nội dung của title khi bắt đầu lại
  document.getElementById("title").innerHTML = "";

  function typeWriter() {
    if (i < sentences[j].length) {
      document.getElementById("title").innerHTML += sentences[j].charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      // Chờ một chút trước khi xóa câu
      setTimeout(deleteWriter, pauseBeforeDelete);
    }
  }

  function deleteWriter() {
    if (i >= 0) {
      document.getElementById("title").innerHTML = sentences[j].substring(0, i);
      i--;
      setTimeout(deleteWriter, deleteSpeed);
    } else {
      j++;
      if (j < sentences.length) {
        i = 0;
        setTimeout(typeWriter, delayBetweenSentences);
      } else {
        if (count < 1) {
          count++;

          document.getElementById("relightBtn").style.display = "block";
        } else {
          // Hiển thị nút "Thắp nến" sau khi hoàn thành đoạn văn đầu tiên
          j = 0;
          i = 0;
          setTimeout(() => {
            startTypingEffect(text2);
          }, delayBetweenParagraphs);
        }
      }
    }
  }

  typeWriter();
}

document.getElementById("startButton").addEventListener("click", function () {
  document.body.style.background =
    "linear-gradient(to right, #ffafbd , #ffc3a0)";
  document.getElementById("startButton").style.display = "none";

  document.getElementById("os-phrases").style.display = "none";

  const cakeContainer = document.getElementById("cake-container");
  const bannerImage = document.getElementById("bannerImage");
  cakeContainer.style.display = "block";
  bannerImage.style.display = "block";

  setTimeout(() => {
    cakeContainer.style.opacity = 1;
    bannerImage.style.opacity = 1;
  }, 10); // Slight delay to ensure the transition effect

  const balloonImage = document.getElementById("balloonImage");
  balloonImage.classList.remove("hidden");

  setTimeout(() => {
    balloonImage.style.bottom = "100%";
  }, 20); // Slight delay to ensure the transition effect

  setTimeout(() => {
    balloonImage.style.opacity = 0;
  }, 4000); // Delay to fade out after reaching the top

  // Hiển thị chữ và bắt đầu hiệu ứng typing sau các hiệu ứng khác
  const titleElement = document.getElementById("title");
  titleElement.style.display = "block"; // Hiển thị chữ

  setTimeout(() => {
    startTypingEffect(text1);
  }, 2000);

  playSound();
  const innerElements = document.querySelectorAll(".inner");
  innerElements.forEach((inner) => {
    inner.innerHTML = "❤️"; // Change the content to a snowflake
    inner.style.fontSize = "0.7em"; // Change the font size
  });
});

document.getElementById("relightBtn").addEventListener("click", function () {
  // Làm đen màn hình
  document.body.style.background = "linear-gradient(#0007, #0000)  #123";

  // Dừng bài nhạc số 1 và phát bài nhạc số 2
  const backgroundMusic1 = document.getElementById("backgroundMusic1");
  const backgroundMusic2 = document.getElementById("backgroundMusic2");
  backgroundMusic1.pause();
  backgroundMusic1.currentTime = 0;
  backgroundMusic2.play();

  // Hiển thị ngọn lửa và ẩn nút "Thắp nến"
  document.querySelectorAll(".flame").forEach((flame) => {
    flame.style.opacity = 1;
  });
  document.getElementById("relightBtn").style.display = "none";

  const innerElements = document.querySelectorAll(".inner");
  innerElements.forEach((inner) => {
    inner.innerHTML = "🎉"; // Change the content to a snowflake
    inner.style.fontSize = "0.7em"; // Change the font size
  });

  // Gọi hàm setupMicrophone khi đã thắp nến
  setupMicrophone();

  // Hiển thị slideshow
  document.getElementById("leftSlideshow").style.display = "block";
  document.getElementById("rightSlideshow").style.display = "block";
  startSlideshow("leftSlideshow");
  startSlideshow("rightSlideshow");

  startFirework();
});

function startSlideshow(slideshowId) {
  const slides = document.querySelectorAll(`#${slideshowId} img`);
  let currentSlide = 0;

  slides[currentSlide].classList.add("active");

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 3000); // Thay đổi slide mỗi 3 giây
}

document.addEventListener("DOMContentLoaded", function () {
  const snowflakesContainer = document.querySelector(".snowflakes");
  const numberOfSnowflakes = 20;
  const snowflakeHTML =
    '<div class="snowflake"><div class="inner">♥</div></div>';

  for (let i = 0; i < numberOfSnowflakes; i++) {
    snowflakesContainer.innerHTML += snowflakeHTML;
  }

  const cake = document.getElementById("cake");
  const numberOfCandles = 10;

  for (let i = 1; i <= numberOfCandles; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.id = `candle${i}`;

    const container = document.createElement("div");
    container.className = "container flame";

    const redFlame = document.createElement("div");
    redFlame.className = "red flame";
    container.appendChild(redFlame);

    const orangeFlame = document.createElement("div");
    orangeFlame.className = "orange flame";
    container.appendChild(orangeFlame);

    const yellowFlame = document.createElement("div");
    yellowFlame.className = "yellow flame";
    container.appendChild(yellowFlame);

    const whiteFlame = document.createElement("div");
    whiteFlame.className = "white flame circle";
    container.appendChild(whiteFlame);

    const blueFlame = document.createElement("div");
    blueFlame.className = "blue flame circle";
    container.appendChild(blueFlame);

    candle.appendChild(container);
    cake.appendChild(candle);
  }
});

function startFirework() {
  const fireworksContainer = document.getElementById("fireworksContainer");
  const numberOfFireworks = 3; // Number of fireworks you want to show
  const screenWidth = window.innerWidth;

  for (let i = 0; i < numberOfFireworks; i++) {
    const pyro = document.createElement("div");
    pyro.className = "pyro";
    pyro.style.left = `${(i + 1) * (screenWidth / (numberOfFireworks + 1))}px`;

    const before = document.createElement("div");
    before.className = "before";
    const after = document.createElement("div");
    after.className = "after";

    pyro.appendChild(before);
    pyro.appendChild(after);
    fireworksContainer.appendChild(pyro);
  }
}

function playSound() {
  const backgroundMusic1 = document.getElementById("backgroundMusic1");
  backgroundMusic1.play();
}

$("#os-phrases > h2")
  .css("opacity", 1)
  .lettering("words")
  .children("span")
  .lettering()
  .children("span")
  .lettering();

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Wait for the window to load all resources (images, scripts, etc.)
  window.addEventListener("load", function () {
    // Hide the spinner
    var spinner = document.getElementById("loading-spinner");
    if (spinner) {
      spinner.style.display = "none";
    }

    // Show the main content
    var mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.display = "block";
    }
  });
});
