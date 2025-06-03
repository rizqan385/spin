const canvas   = document.getElementById("wheel");
const ctx      = canvas.getContext("2d");
const spinBtn  = document.getElementById("spinBtn");
const hasil    = document.getElementById("hasil");
const claimBtn = document.getElementById("claimBtn");

const segments = [
  "Diskon 10%",
  "Diskon 20%",
  "Gratis Ongkir",
  "Zonk",
  "Es Teh Gratis"
];

const colors = ["#FFEB3B", "#4CAF50", "#2196F3", "#E91E63", "#FF9800"];
const segCount = segments.length;
const anglePerSeg = 360 / segCount;
const pointerAngle = 270; // arah panah ▼ di atas
let rotation = 0;
let isSpinning = false;

function drawWheel() {
  for (let i = 0; i < segCount; i++) {
    const startDeg = i * anglePerSeg;
    const endDeg = startDeg + anglePerSeg;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, 
            (startDeg * Math.PI) / 180,
            (endDeg * Math.PI) / 180);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(((startDeg + anglePerSeg / 2) * Math.PI) / 180);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText(segments[i], 140, 5);
    ctx.restore();
  }
}
drawWheel();

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  isSpinning = true;
  claimBtn.style.display = "none";
  hasil.textContent = "";

  const extraSpin = Math.random() * 360 + 1440;
  const targetAngle = rotation + extraSpin;
  const duration = 4000;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = rotation + (targetAngle - rotation) * easeOut;

    ctx.clearRect(0, 0, 300, 300);
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate((current * Math.PI) / 180);
    ctx.translate(-150, -150);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rotation = targetAngle % 360;
      isSpinning = false;

      const delta = (pointerAngle - rotation + 360) % 360;
      const index = Math.floor(delta / anglePerSeg);
      const prize = segments[index];

if (prize === "Zonk") {
  hasil.textContent = "Maaf, kamu gagal 😢";
  claimBtn.style.display = "none";
} else {
  hasil.textContent = `Kamu mendapat: ${prize}`;
  claimBtn.href = `https://wa.me/6281234567890?text=Halo%2C%20saya%20mendapatkan%20${encodeURIComponent(prize)}%20dari%20Spin%20Promo`;
  claimBtn.style.display = "inline-block";
}

    }
  }

  requestAnimationFrame(animate);
});
