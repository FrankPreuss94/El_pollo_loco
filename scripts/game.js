import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { AudioHub } from "../models/audiohub.class.js";

const startScreenRef = document.getElementById("start-screen")
const startBtnRef = document.getElementById("start-btn");
const howToRef = document.getElementById("howto-dialog");
const howToBtnRef = document.getElementById("howto-btn");
const closeHowtoRef = document.getElementById("close-howto")
const imprintRef = document.getElementById("imprint-dialog");
const imprintBtnRef = document.getElementById("imprint-btn");
const closeImprintRef = document.getElementById("close-imprint")
const endScreenRef = document.getElementById("end-screen");
const playAgainRef = document.getElementById("play-again-btn");
const backHomeRef = document.getElementById("back-home-btn");
const startMuteBtnRef = document.getElementById("start-mute-btn");
const startMuteIconRef = document.getElementById("start-mute-icon");
const gameMuteBtnRef = document.getElementById("game-mute-btn");
const gameMuteIconRef = document.getElementById("game-mute-icon");
const leftBtnRef = document.getElementById("left-btn");
const rightBtnRef = document.getElementById("right-btn");
const jumpBtnRef = document.getElementById("jump-btn");
const throwBtnRef = document.getElementById("throw-btn");
const canvasRef = document.getElementById("canvas");
const mobileCtrlRef = document.getElementById("mobile-controls");

let canvas;
let world;
let worlds = [];
let keyboard = new Keyboard;

AudioHub.loadMuteState();
updateMuteIcons();

/**
 * Starts a new game and initializes the game world.
 */
function init() {
    canvasRef.style.display = "block";
    mobileCtrlRef.classList.add("mobile_controls_active");
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard, showEndScreen);
    worlds.push(world);
    startScreenRef.style.display = "none";
    endScreenRef.classList.remove("endscreen_won", "endscreen_lost");
    AudioHub.playLoop(AudioHub.GAME_BACKGROUND);
}

/**
 * Handles left and right movement keys.
 * @param {KeyboardEvent} event - Keyboard event.
 * @param {boolean} pressed - Current key state.
 */
function handleMovementKey(event, pressed) {
    if (event.keyCode == 37) {
        keyboard.left = pressed;
    }
    if (event.keyCode == 39) {
        keyboard.right = pressed;
    }
}

/**
 * Handles jump and throw action keys.
 * @param {KeyboardEvent} event - Keyboard event.
 * @param {boolean} pressed - Current key state.
 */
function handleActionKey(event, pressed) {
    if (event.keyCode == 32) {
        keyboard.space = pressed;
    }
    if (event.keyCode == 38) {
        keyboard.up = pressed;
    }
    if (event.keyCode == 68) {
        keyboard.d = pressed;
    }
}

/**
 * Handles all keyboard input.
 * @param {KeyboardEvent} event - Keyboard event.
 * @param {boolean} pressed - Current key state.
 */
function handleKey(event, pressed) {
    handleMovementKey(event, pressed);
    handleActionKey(event, pressed);
}

window.addEventListener("keydown", (event) => {
    handleKey(event, true);
});

window.addEventListener("keyup", (event) => {
    handleKey(event, false);
});

/**
 * Adds touch controls for moving left.
 */
function addLeftControl() {
    leftBtnRef.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.left = true;
    });
    leftBtnRef.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.left = false;
    });
    leftBtnRef.addEventListener("touchcancel", () => {
        keyboard.left = false;
    });
}

/**
 * Adds touch controls for moving right.
 */
function addRightControl() {
    rightBtnRef.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.right = true;
    });
    rightBtnRef.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.right = false;
    });
    rightBtnRef.addEventListener("touchcancel", () => {
        keyboard.right = false;
    });
}

/**
 * Adds touch controls for jumping.
 */
function addJumpControl() {
    jumpBtnRef.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.space = true;
    });
    jumpBtnRef.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.space = false;
    });
    jumpBtnRef.addEventListener("touchcancel", () => {
        keyboard.space = false;
    });
}

/**
 * Adds touch controls for throwing bottles.
 */
function addThrowControl() {
    throwBtnRef.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.d = true;
    });
    throwBtnRef.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.d = false;
    });
    throwBtnRef.addEventListener("touchcancel", () => {
        keyboard.d = false;
    });
}

addLeftControl();

addRightControl();

addJumpControl();

addThrowControl();

/**
 * Opens the how-to dialog.
 */
function openHowTo() {
    howToRef.showModal();
}

/**
 * Closes the how-to dialog.
 */
function closeHowTo() {
    howToRef.close();
}

/**
 * Opens the imprint dialog.
 */
function openImprint() {
    imprintRef.showModal();
}

/**
 * Closes the imprint dialog.
 */
function closeImprint() {
    imprintRef.close();
}

/**
 * Stops the current game and displays the result screen.
 * @param {string} result - Result class for the end screen.
 */
function showEndScreen(result) {
    world.stopGame();
    world.character.stopIntervals();
    worlds.splice(worlds.indexOf(world), 1);
    AudioHub.stopAll();
    if (result == "endscreen_won") {
        AudioHub.playOne(AudioHub.GAME_WON);
    } else if (result == "endscreen_lost") {
        AudioHub.playOne(AudioHub.GAME_LOST);
    }
    endScreenRef.classList.add(result);
    mobileCtrlRef.classList.remove("mobile_controls_active");
}

/**
 * Stops the current game and returns to the start screen.
 */
function backHome() {
    world.stopGame();
    AudioHub.stopAll();
    canvasRef.style.display = "none";
    endScreenRef.classList.remove("endscreen_won", "endscreen_lost");
    startScreenRef.style.display = "flex";
}

/**
 * Toggles the mute state and updates the mute icons.
 */
function toggleMute() {
    AudioHub.toggleMute();
    updateMuteIcons();
}

/**
 * Updates the mute icons according to the current mute state.
 */
function updateMuteIcons() {
    const icon = AudioHub.muted ? "sound_off.png" : "sound_on.png";
    startMuteIconRef.src = `assets/img/menu/${icon}`;
    gameMuteIconRef.src = `assets/img/menu/${icon}`;
}

howToBtnRef.addEventListener("click", openHowTo);

closeHowtoRef.addEventListener("click", closeHowTo);

imprintBtnRef.addEventListener("click", openImprint);

closeImprintRef.addEventListener("click", closeImprint);

startBtnRef.addEventListener("click", init);

playAgainRef.addEventListener("click", init);

backHomeRef.addEventListener("click", backHome);

startMuteBtnRef.addEventListener("click", toggleMute);

gameMuteBtnRef.addEventListener("click", toggleMute);
