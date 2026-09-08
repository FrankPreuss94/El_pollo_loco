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

let canvas;
let world;
let worlds = [];
let keyboard = new Keyboard;

AudioHub.loadMuteState();
updateMuteIcons();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard, showEndScreen);
    worlds.push(world);
    startScreenRef.style.display = "none";
    endScreenRef.classList.remove("endscreen_won", "endscreen_lost");
    AudioHub.playLoop(AudioHub.GAME_BACKGROUND);
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 32) {
        keyboard.space = true;
    }
    if (event.keyCode == 37) {
        keyboard.left = true;
    }
    if (event.keyCode == 38) {
        keyboard.up = true;
    }
    if (event.keyCode == 39) {
        keyboard.right = true;
    }
    if (event.keyCode == 40) {
        keyboard.down = true;
    }
    if (event.keyCode == 68) {
        keyboard.d = true;
    }
})

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 32) {
        keyboard.space = false;
    }
    if (event.keyCode == 37) {
        keyboard.left = false;
    }
    if (event.keyCode == 38) {
        keyboard.up = false;
    }
    if (event.keyCode == 39) {
        keyboard.right = false;
    }
    if (event.keyCode == 40) {
        keyboard.down = false;
    }
    if (event.keyCode == 68) {
        keyboard.d = false;
    }
})

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

function openHowTo() {
    howToRef.showModal();
}

function closeHowTo() {
    howToRef.close();
}

function openImprint() {
    imprintRef.showModal();
}

function closeImprint() {
    imprintRef.close();
}

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
}

function backHome() {
    world.stopGame();
    AudioHub.stopAll();
    endScreenRef.classList.remove("endscreen_won", "endscreen_lost");
    startScreenRef.style.display = "flex";
}

function toggleMute() {
    AudioHub.toggleMute();
    updateMuteIcons();
}

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

// window.addEventListener('load', init)