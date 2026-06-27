const countdown = document.getElementById("countdown");
const mask = document.getElementById("mask");

// ================================
// CONFIG (YOU ONLY EDIT THIS)
// ================================

// Event: 12:00 AM Central Time, June 27, 2026
const EVENT_LOCAL = {
    year: 2026,
    month: 5,   // JS months: 0 = Jan, so 5 = June
    day: 27,
    hour: 0,
    minute: 0,
    second: 0
};

// Duration (6 hours)
const EVENT_DURATION = 6 * 60 * 60 * 1000;

// ================================
// TIMEZONE CONVERSION (CENTRAL TIME SAFE)
// ================================

function getCentralTimeOffset(date) {
    // Detect DST automatically
    const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    const isDST = date.getTimezoneOffset() === Math.min(jan, jul);

    // CST = UTC-6, CDT = UTC-5
    return isDST ? 5 : 6;
}

function getEventStartUTC() {
    const now = new Date();

    const offsetHours = getCentralTimeOffset(now);

    // Build "Central Time" date
    const local = new Date(
        Date.UTC(
            EVENT_LOCAL.year,
            EVENT_LOCAL.month,
            EVENT_LOCAL.day,
            EVENT_LOCAL.hour + offsetHours,
            EVENT_LOCAL.minute,
            EVENT_LOCAL.second
        )
    );

    return local.getTime();
}

const EVENT_START = getEventStartUTC();

// ================================
// FORMAT TIMER
// ================================

function format(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));

    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    return `${h}h ${m}m ${s}s`;
}

// ================================
// MAIN LOOP
// ================================

function update() {
    const now = Date.now();

    const elapsed = now - EVENT_START;
    const progress = Math.min(Math.max(elapsed / EVENT_DURATION, 0), 1);

    // BEFORE START
    if (progress <= 0) {
        countdown.textContent = format(EVENT_START - now);
        mask.style.opacity = 1;
        requestAnimationFrame(update);
        return;
    }

    // DURING EVENT
    mask.style.opacity = 1 - progress;

    countdown.textContent = format(EVENT_DURATION - elapsed);

    requestAnimationFrame(update);
}

update();
