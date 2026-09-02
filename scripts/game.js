import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

const startScreenRef = document.getElementById("start-screen")
const startBtnRef = document.getElementById("start-btn");
const howToRef = document.getElementById("howto-dialog");
const howToBtnRef = document.getElementById("howto-btn");
const imprintRef = document.getElementById("imprint-dialog");
const imprintBtnRef = document.getElementById("imprint-btn");
let canvas;
let world;
let keyboard = new Keyboard;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    startScreenRef.style.display = "none";
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

function openHowTo() {
    howToRef.showModal();
}

function openImprint() {
    imprintRef.showModal();
}

howToBtnRef.addEventListener("click", openHowTo);

imprintBtnRef.addEventListener("click", openImprint);

startBtnRef.addEventListener("click", init)

// window.addEventListener('load', init)