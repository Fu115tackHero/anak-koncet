document.addEventListener("DOMContentLoaded", (event) => {
  const scanButton = document.getElementById("scan-button");
  const qrReaderContainer = document.getElementById("qr-reader-container");
  const qrReader = document.getElementById("qr-reader");
  const closeScannerButton = document.getElementById("close-scanner");

  const SERVER_URL = "https://popdrinkgo-server.vercel.app/";

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
          alert(`QR Code berhasil dipindai: ${decodedText}`);
          stopScanner();

          // Kirim data ke server
          fetch(`${SERVER_URL}/scan-qr`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ qrcode: decodedText }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Respons dari server:", data);
              alert(`Data berhasil dikirim ke server!`);
            })
            .catch((error) => {
              console.error("Ada masalah saat mengirim data ke server:", error);
              alert("Gagal mengirim data ke server.");
            });
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
