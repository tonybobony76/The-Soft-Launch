const video = document.getElementById("bgVideo");
const countdown = document.getElementById("countdown");

const TOTAL_TIME = 6 * 60 * 60 * 1000;
const startTime = new Date("2026-06-26T06:00:00Z").getTime();

let duration = 0;
let ready = false;

// Force first frame ASAP
video.addEventListener("loadeddata", () => {
  try {
    video.currentTime = 0;
  } catch (e) {}
});

// Wait until video is actually usable
video.addEventListener("canplay", () => {
  duration = video.duration;
  ready = true;

  video.play().catch(() => {});
});

function update() {
  const now = Date.now();

  if (!ready || !duration || !isFinite(duration)) {
    countdown.textContent = "Loading...";
    requestAnimationFrame(update);
    return;
  }

  const elapsed = now - startTime;

  if (elapsed < 0) {
    video.currentTime = 0;
    countdown.textContent = "Starting soon";
    requestAnimationFrame(update);
    return;
  }

  let progress = elapsed / TOTAL_TIME;
  if (progress > 1) progress = 1;

  const targetTime = progress * duration;

  // IMPORTANT: throttle seeking (prevents black flicker)
  if (Math.abs(video.currentTime - targetTime) > 0.2) {
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
