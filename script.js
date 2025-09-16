document.addEventListener("DOMContentLoaded", (event) => {
  const scanButton = document.getElementById("scan-button");
  const qrReaderContainer = document.getElementById("qr-reader-container");
  const closeScannerButton = document.getElementById("close-scanner");

  let html5QrCode = null;

  const startScanner = () => {
    qrReaderContainer.style.display = "block";
    scanButton.style.display = "none";

    html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText, decodedResult) => {
          // Ketika QR code berhasil dipindai
          console.log(`QR Code berhasil dipindai: ${decodedText}`);
          stopScanner();

          // Arahkan ke halaman spinwheel.html
          window.location.href = "spinwheel.html";
        },
        (errorMessage) => {
          // Jangan lakukan apa-apa, ini untuk mencegah log error
        }
      )
      .catch((err) => {
        alert(`Gagal mengakses kamera: ${err}`);
        stopScanner();
      });
  };

  const stopScanner = () => {
    if (html5QrCode) {
      html5QrCode
        .stop()
        .then(() => {
          console.log("QR Code scanner stopped.");
        })
        .catch((err) => {
          console.log("Failed to stop scanner: ", err);
        });
      qrReaderContainer.style.display = "none";
      scanButton.style.display = "block";
    }
  };

  scanButton.addEventListener("click", startScanner);
  closeScannerButton.addEventListener("click", stopScanner);
});
