const video = document.getElementById("bgVideo");
const countdown = document.getElementById("countdown");

const TOTAL_TIME = 6 * 60 * 60 * 1000;

// 12 AM CST (UTC)
const startTime = new Date("2026-06-26T06:00:00Z").getTime();

let duration = null;
let ready = false;

// FORCE FIRST FRAME VISIBILITY (prevents black screen)
video.addEventListener("loadeddata", () => {
  video.currentTime = 0.001;
});

video.addEventListener("loadedmetadata", () => {
  duration = video.duration;
  ready = true;

  video.play().catch(() => {
    // autoplay can fail silently in some browsers
  });
});

function update() {
  const now = Date.now();

  if (!ready || !duration) {
    countdown.textContent = "Loading...";
    requestAnimationFrame(update);
    return;
  }

  const elapsed = now - startTime;

  // before start
  if (elapsed < 0) {
    video.currentTime = 0;
    countdown.textContent = "Starting soon";
    requestAnimationFrame(update);
    return;
  }

  let progress = elapsed / TOTAL_TIME;

  if (progress > 1) progress = 1;

  // key fix: only set time when valid
  const targetTime = progress * duration;

  if (isFinite(targetTime)) {
    video.currentTime = targetTime;
  }

  const remaining = Math.max(TOTAL_TIME - elapsed, 0);

  const seconds = Math.floor(remaining / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  countdown.textContent = `${h}h ${m}m ${s}s`;

  requestAnimationFrame(update);
}

update();
