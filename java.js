
// RABBIT BIRTHDAY WEBSITE 🐰💗

// SECRET PIN
const CORRECT_PIN = "4556";

let pin = "";

const lockScreen = document.getElementById("lockScreen");
const mainSite = document.getElementById("mainSite");
const dots = document.querySelectorAll("#pinDots i");
const error = document.getElementById("pinError");

// UPDATE PIN DOTS
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle("filled", index < pin.length);
    });
}

// ENTER NUMBER
function enterDigit(number) {
    if (pin.length >= 4) return;

    pin += number;
    error.textContent = "";

    updateDots();

    if (pin.length === 4) {
        checkPin();
    }
}

// CLEAR PIN
function clearPin() {
    pin = "";
    updateDots();
    error.textContent = "";
}

// CHECK PIN
function checkPin() {

    if (pin === CORRECT_PIN) {

        lockScreen.classList.add("hidden");
        mainSite.classList.remove("hidden");

        window.scrollTo(0, 0);

        toast("Welcome Rabbit! Your surprise is ready 💗");

        confetti(70);

    } else {

        error.textContent = "Wrong PIN! Try again 💗";

        pin = "";
        updateDots();
    }
}

// KEYPAD
document.querySelectorAll(".keypad button").forEach(button => {

    button.addEventListener("click", () => {

        const key = button.dataset.key;

        if (key === "clear") {
            clearPin();
        }

        else if (key === "back") {
            pin = pin.slice(0, -1);
            updateDots();
        }

        else {
            enterDigit(key);
        }

    });

});

document.getElementById("unlockBtn")
.addEventListener("click", checkPin);

// KEYBOARD PIN
document.addEventListener("keydown", event => {

    if (lockScreen.classList.contains("hidden")) return;

    if (/^[0-9]$/.test(event.key)) {
        enterDigit(event.key);
    }

    if (event.key === "Backspace") {
        pin = pin.slice(0, -1);
        updateDots();
    }

    if (event.key === "Escape") {
        clearPin();
    }

});

// BIRTHDAY CAKE
const candles = document.querySelectorAll(".candle");

candles.forEach(candle => {

    candle.addEventListener("click", () => {

        candle.classList.add("out");

        if ([...candles].every(c => c.classList.contains("out"))) {

            document.getElementById("wishMessage").textContent =
                "Your wish will come true! Happy Birthday Rabbit! 💗";

            confetti(50);
        }

    });

});

// LIGHT CANDLES AGAIN
document.getElementById("relightBtn")
.addEventListener("click", () => {

    candles.forEach(candle => {
        candle.classList.remove("out");
    });

    document.getElementById("wishMessage").textContent =
        "Close your eyes and make a wish! 🌟";

    toast("Candles are glowing again! 🎂");

});

// BACKGROUND BIRTHDAY MUSIC
// Original melody generated using Web Audio API.

let audioContext;
let musicTimer;
let musicPlaying = false;
let noteIndex = 0;

const musicButton = document.getElementById("musicBtn");

const melody = [
    523.25, 523.25, 587.33, 523.25,
    698.46, 659.25, 523.25, 523.25,
    587.33, 523.25, 783.99, 698.46,
    523.25, 523.25, 1046.5, 880,
    698.46, 659.25, 587.33
];

function playNote(frequency) {

    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);

    gain.gain.exponentialRampToValueAtTime(
        0.07,
        audioContext.currentTime + 0.03
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.27
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

function startMusic() {

    const AudioClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioClass) {
        toast("Audio is not supported in this browser.");
        return;
    }

    audioContext = audioContext || new AudioClass();

    audioContext.resume();

    musicPlaying = true;

    musicButton.textContent = "♫ Pause Music";

    clearInterval(musicTimer);

    playNote(melody[noteIndex++ % melody.length]);

    musicTimer = setInterval(() => {

        playNote(melody[noteIndex % melody.length]);

        noteIndex++;

    }, 330);

}

function stopMusic() {

    musicPlaying = false;

    clearInterval(musicTimer);

    musicButton.textContent = "♫ Play Birthday Music";

}

musicButton.addEventListener("click", () => {

    if (musicPlaying) {
        stopMusic();
    } else {
        startMusic();
    }

});

// CONFETTI ANIMATION
function confetti(amount = 100) {

    const symbols = [
        "💗", "🌸", "✨", "🎀",
        "💕", "⭐", "🎉"
    ];

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("span");

        piece.className = "confetti";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.fontSize =
            (12 + Math.random() * 15) + "px";

        piece.style.setProperty(
            "--drift",
            (Math.random() * 200 - 100) + "px"
        );

        piece.style.setProperty(
            "--duration",
            (2 + Math.random() * 3) + "s"
        );

        document.body.appendChild(piece);

        piece.addEventListener("animationend", () => {
            piece.remove();
        }, { once: true });

    }

}

// CELEBRATE BUTTON
document.getElementById("celebrateBtn")
.addEventListener("click", () => {

    confetti(150);

    toast("Happy Birthday My Rabbit! 🐰❤️");

});

// TOAST MESSAGE
let toastTimer;

function toast(message) {

    const element = document.getElementById("toast");

    element.textContent = message;

    element.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        element.classList.remove("show");

    }, 3000);

}

console.log("Made with love for Rabbit 🐰💗");
