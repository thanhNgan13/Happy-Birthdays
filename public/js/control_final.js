const text1 =
  "Mỗi người một quan điểm, mỗi người một cách code khác nhau. Anh Yêu em.";
const text2 =
  "Đây là đoạn văn bản thứ hai, sẽ được hiển thị sau khi thổi tắt nến.";

let i = 0;
let j = 0;
let isTyping = false; // Biến để kiểm tra nếu đang trong quá trình typing
let count = 0;
let isListening = true; // Biến để kiểm tra nếu đang lắng nghe âm thanh

function startTypingEffect(text) {
  console.log("CALL");
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
        switch (count) {
          case 0:
            count++;
            // Hiển thị nút "Thắp nến" sau khi hoàn thành đoạn văn đầu tiên
            document.getElementById("relightBtn").style.display = "block";
            break;
          // case 1:
          //   count++;
          //   break;
          default:
            j = 0;
            i = 0;
            setTimeout(() => {
              startTypingEffect(text2);
            }, delayBetweenParagraphs);
            break;
        }
        // if (count < 1) {
        //   count++;

        //   document.getElementById("relightBtn").style.display = "block";
        // } else {
        //   // Hiển thị nút "Thắp nến" sau khi hoàn thành đoạn văn đầu tiên
        //   j = 0;
        //   i = 0;
        //   setTimeout(() => {
        //     startTypingEffect(text2);
        //   }, delayBetweenParagraphs);
        // }
      }
    }
  }

  typeWriter();
}

document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các tài nguyên cần tải
  const resources = [
    "../assets/images/banner.png",
    "../assets/images/Balloon-Border.png",
    "../assets/images/img1.jpg",
    "../assets/images/img2.jpg",
    "../assets/images/img3.jpg",
    "../assets/images/img4.jpg",
    "../assets/images/img5.jpg",
    "../assets/images/img6.jpg",
    "../assets/images/img7.jpg",
    "../assets/images/img8.jpg",
    "../assets/audios/music.mp3",
    "../assets/audios/mucic_2.mp3",
    "../css/style_flame.css",
    "../css/style_snow.css",
    "../css/style_firework.css",
    "../css/style_intro_text.css",
    "../css/style_final.css",
  ];

  let loadedResources = 0;

  function resourceLoaded() {
    loadedResources++;
    if (loadedResources === resources.length) {
      document.getElementById("loadingSpinner").style.display = "none";
      document.getElementById("content").style.display = "flex";
    }
  }

  // Hàm tải ảnh
  function loadImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = resourceLoaded;
    img.onerror = resourceLoaded;
  }

  // Hàm tải audio
  function loadAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.onloadeddata = resourceLoaded;
    audio.onerror = resourceLoaded;
  }

  // Hàm tải CSS
  function loadCSS(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = resourceLoaded;
    link.onerror = resourceLoaded;
    document.head.appendChild(link);
  }

  // Bắt đầu tải các tài nguyên
  resources.forEach((resource) => {
    if (resource.endsWith(".jpg") || resource.endsWith(".png")) {
      loadImage(resource);
    } else if (resource.endsWith(".mp3")) {
      loadAudio(resource);
    } else if (resource.endsWith(".css")) {
      loadCSS(resource);
    }
  });
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

document.getElementById("startButton").addEventListener("click", function () {
  setTimeout(() => {
    document.body.style.background =
      "linear-gradient(to right, #ffafbd , #ffc3a0)";
  }, 100); // Slight delay to ensure the transition effect

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

$("#os-phrases > h2")
  .css("opacity", 1)
  .lettering("words")
  .children("span")
  .lettering()
  .children("span")
  .lettering();

function playSound() {
  const backgroundMusic1 = document.getElementById("backgroundMusic1");
  backgroundMusic1.play();
}

document.getElementById("relightBtn").addEventListener("click", function () {
  // Làm đen màn hình
  document.body.style.background = "linear-gradient(#0007, #0000)  #123";
  runText();

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

function runText() {
  const text1 = "Hãy nhắm mắt lại và ước điều ước em mong muốn đi.";
  const text2 = "Xong rồi thì mở mắt ra và thổi nến đi em.";
  const scrollText = document.getElementById("scroll-text");
  document.getElementById("scroll-container").style.display = "flex";
  let showText1 = true;

  scrollText.addEventListener("animationiteration", () => {
    scrollText.style.opacity = 0; // Tạm thời ẩn văn bản

    setTimeout(() => {
      // Chuyển đổi văn bản sau khi hoàn thành một chu kỳ animation
      scrollText.textContent = showText1 ? text2 : text1;
      scrollText.style.opacity = 1; // Hiển thị lại văn bản
      showText1 = !showText1; // Đảo ngược trạng thái văn bản
    }, 100); // Thời gian delay để tạo hiệu ứng ẩn/hiển thị
  });
}
