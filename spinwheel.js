document.addEventListener("DOMContentLoaded", () => {
  const spinButton = document.getElementById("spin-button");
  const wheel = document.querySelector(".wheel");
  const resultElement = document.getElementById("result");

  // Hadiah yang akan muncul di roda
  const prizes = [
    "Diskon 10%",
    "Zonk",
    "Diskon 50%",
    "1 Poin",
    "Minuman Gratis",
    "Diskon 20%",
    "2 Poin",
    "Diskon 50%",
  ];

  // Warna segmen
  const colors = [
    "#e74c3c",
    "#3498db",
    "#9b59b6",
    "#2ecc71",
    "#f1c40f",
    "#e67e22",
    "#34495e",
    "#c0392b",
  ];

  // Fungsi untuk membuat segmen roda secara dinamis
  function createWheelSegments() {
    wheel.innerHTML = "";
    const numPrizes = prizes.length;
    const sliceAngle = 360 / numPrizes;
    const skewY = 90 - sliceAngle;
    prizes.forEach((prize, index) => {
      const segment = document.createElement("div");
      segment.classList.add("segment");
      segment.style.transform = `rotate(${
        index * sliceAngle
      }deg) skewY(-${skewY}deg)`;
      segment.style.background = colors[index % colors.length];

      const prizeText = document.createElement("span");
      prizeText.textContent = prize;
      prizeText.style.position = "absolute";
      prizeText.style.top = "80%";
      prizeText.style.left = "60%";
      prizeText.style.transform = "translate(-110%, -110%) rotate(50deg)";
      prizeText.style.width = "80px";
      prizeText.style.textAlign = "center";
      prizeText.style.fontWeight = "bold";
      prizeText.style.color = "#fff";
      prizeText.style.textShadow = "1px 1px 2px rgba(0,0,0,0.5)";
      prizeText.style.pointerEvents = "none";

      segment.appendChild(prizeText);
      wheel.appendChild(segment);
    });
  }

  // Fungsi untuk memutar roda
  let currentRotation = 0;
  function spinWheel() {
    spinButton.disabled = true;
    resultElement.textContent = "";

    const numPrizes = prizes.length;
    const sliceAngle = 360 / numPrizes;
    const randomIndex = Math.floor(Math.random() * numPrizes);
    const prize = prizes[randomIndex];

    // Hitung sudut agar segmen yang dipilih berada di atas (pin)
    const targetRotation =
      360 * 5 + (360 - randomIndex * sliceAngle - sliceAngle / 2);
    currentRotation = targetRotation;

    wheel.style.transition = "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      resultElement.textContent = `Selamat! Kamu mendapatkan: ${prize}`;
      spinButton.disabled = false;
    }, 5000);
  }

  spinButton.addEventListener("click", spinWheel);
  createWheelSegments();
});
