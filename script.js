const countdown = document.getElementById("countdown");
const mask = document.getElementById("mask");

// 12:00 AM CDT June 27, 2026 (UTC 05:00)
const EVENT_START = new Date("2026-06-27T05:00:00Z").getTime();
const EVENT_DURATION = 6 * 60 * 60 * 1000;

function format(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));

    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    return `${h}h ${m}m ${s}s`;
}

// makes midpoint MUCH more noticeable
function ease(p) {
    return Math.pow(p, 1.6);
}

function update() {
    const now = Date.now();

    if (now < EVENT_START) {
        countdown.textContent = format(EVENT_START - now);
        mask.style.opacity = 1;
        mask.style.filter = "none";
        requestAnimationFrame(update);
        return;
    }

    const elapsed = now - EVENT_START;
    const raw = Math.min(elapsed / EVENT_DURATION, 1);
    const p = ease(raw);

    // 🔥 core reveal
    mask.style.opacity = 1 - p;

    // 🔥 adds visible mid-phase change
    mask.style.filter = `
        brightness(${1 + p * 0.3})
        contrast(${1 + p * 0.8})
    `;

    countdown.textContent = format(EVENT_DURATION - elapsed);

    requestAnimationFrame(update);
}

update();
