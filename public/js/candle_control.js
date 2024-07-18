async function setupMicrophone() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    microphone.connect(analyser);

    const flames = document.querySelectorAll(".flame");

    function detectBlow() {
      if (!isListening) return; // Nếu không đang lắng nghe thì thoát khỏi hàm

      analyser.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += (dataArray[i] - 128) * (dataArray[i] - 128);
      }
      const rms = Math.sqrt(sum / bufferLength);
      if (rms > 30) {
        // Adjust this threshold as needed
        flames.forEach((flame) => (flame.style.opacity = 0));
        // Hiển thị đoạn văn tiếp theo sau khi thổi tắt nến
        document.getElementById("title").innerHTML = "";
        startTypingEffect(text2); // Bắt đầu lại hiệu ứng với đoạn văn tiếp theo

        // Dừng bài nhạc số 2 và phát lại bài nhạc số 1
        const backgroundMusic1 = document.getElementById("backgroundMusic1");
        const backgroundMusic2 = document.getElementById("backgroundMusic2");
        backgroundMusic2.pause();
        backgroundMusic2.currentTime = 0;
        backgroundMusic1.play();

        // Bỏ làm đen màn hình
        document.body.style.background =
          "linear-gradient(to right, #ffafbd , #ffc3a0)";
        // Dừng lắng nghe âm thanh
        isListening = false;
        document.getElementById("scroll-container").style.display = "none";
      }
      requestAnimationFrame(detectBlow);
    }

    detectBlow();
  } catch (err) {
    console.error("Error accessing the microphone:", err);
  }
}
