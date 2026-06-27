const video = document.getElementById("bgVideo");
const countdown = document.getElementById("countdown");

// 12:00 AM CDT June 27, 2026 (UTC)
const EVENT_START = new Date("2026-06-27T05:00:00Z").getTime();
const EVENT_DURATION = 6 * 60 * 60 * 1000;

let started = false;

function format(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));

    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    return `${h}h ${m}m ${s}s`;
}

function updateCountdown() {
    const now = Date.now();

    if (now < EVENT_START) {
        countdown.textContent = format(EVENT_START - now);
    } else {
        const remaining = Math.max(EVENT_DURATION - (now - EVENT_START), 0);
        countdown.textContent = format(remaining);
    }
}

function tryStartVideo() {
    if (started) return;
    if (!video.duration || !isFinite(video.duration)) return;

    const now = Date.now();

    if (now < EVENT_START) {
        video.pause();
        video.currentTime = 0;
        return;
    }

    started = true;

    // VERY IMPORTANT:
    // stretch video across full event duration
    const speed = video.duration / (EVENT_DURATION / 1000);

    video.playbackRate = speed;

    video.play().catch(() => {});
}

video.addEventListener("loadedmetadata", () => {
    video.currentTime = 0;
    video.pause();
});

setInterval(() => {
    updateCountdown();
    tryStartVideo();
}, 500);

updateCountdown();
