const spinBtn = document.getElementById("spinBtn");
const hasil = document.getElementById("hasil");
const wheel = document.getElementById("wheel");
const claimBtn = document.getElementById("claimBtn");

// Ambil data hadiah dari JSON
fetch("hadiah.json")
  .then((res) => res.json())
  .then((hadiahList) => {
    // Cek apakah sudah spin
    if (localStorage.getItem("sudahSpin") === "true") {
      spinBtn.disabled = true;
      hasil.textContent = "Kamu sudah melakukan spin.";
      const hadiah = localStorage.getItem("hadiahSpin");
      if (hadiah && hadiah !== "Coba Lagi") {
        claimBtn.style.display = "inline-block";
        claimBtn.href = `https://wa.me/6289513270487?text=Halo%2C%20saya%20telah%20menang%20${encodeURIComponent(
          hadiah
        )}%20dari%20Spin%20Promo!`;
      }
    }

    spinBtn.addEventListener("click", () => {
      spinBtn.disabled = true;

      const hasilIndex = Math.floor(Math.random() * hadiahList.length);
      const hadiah = hadiahList[hasilIndex];

      const putaran =
        5 * 360 + hasilIndex * (360 / hadiahList.length) + Math.floor(Math.random() * (360 / hadiahList.length));
      wheel.style.transform = `rotate(${putaran}deg)`;

      setTimeout(() => {
        hasil.textContent = "Kamu dapat: " + hadiah;
        localStorage.setItem("sudahSpin", "true");
        localStorage.setItem("hadiahSpin", hadiah);

        if (hadiah !== "Coba Lagi") {
          claimBtn.style.display = "inline-block";
          claimBtn.href = `https://wa.me/6281234567890?text=Halo%2C%20saya%20telah%20menang%20${encodeURIComponent(
            hadiah
          )}%20dari%20Spin%20Promo!`;
        } else {
          hasil.textContent += " 😅 Maaf, belum beruntung.";
        }
      }, 4000);
    });
  })
  .catch((err) => {
    hasil.textContent = "Gagal mengambil data hadiah.";
    console.error(err);
  });