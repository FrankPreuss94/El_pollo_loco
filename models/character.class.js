import { AudioHub } from "./audiohub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    y = 140;
    height = 295;
    width = 150;
    speed = 10;
    world;
    coins = 0;          // eventuell in andere class verschieben
    coinsMax = 10;
    bottle = 0;
    bottleMax = 10;
    lastThrow = 0;
    showFrame = true; // nur für die Hitboxen später entfernen
    offset = {
        top: 120,
        right: 50,
        bottom: 16,
        left: 40
    };
    idleTimer = new Date().getTime();
    lastHitSound = 0;
    lastJumpSound = 0;
    dyingSoundPlayed = false;


    constructor() {
        super().loadImage(ImageHub.charakter.idle[1]);
        this.loadImages(ImageHub.charakter.walk);
        this.loadImages(ImageHub.charakter.jump);
        this.loadImages(ImageHub.charakter.dead);
        this.loadImages(ImageHub.charakter.hurt);
        this.loadImages(ImageHub.charakter.idle);
        this.loadImages(ImageHub.charakter.long_idle);
        this.applyGravity();
        this.animate();
        this.getHitBox();

    }

    animate() {
        this.movementInterval = setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x && !this.isDead()) {
                this.moveRight();
                this.otherDirection = false;
                this.resetIdleTimer();
            }
            if (this.world.keyboard.left && this.x > 0 && !this.isDead()) {
                this.moveLeft();
                this.otherDirection = true;
                this.resetIdleTimer();
            }
            if ((this.world.keyboard.space && !this.isAboveGround() || this.world.keyboard.up && !this.isAboveGround()) && !this.isDead()) {
                this.jump();
                this.resetIdleTimer();
            }
            this.world.camera_x = -this.x + 100;
            this.idle();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.checkCharacterSound();
            if (this.isDead()) {
                this.playAnimation(ImageHub.charakter.dead);
            } else if (this.isHurt()) {
                this.playAnimation(ImageHub.charakter.hurt);
            } else if (this.isAboveGround()) {
                this.playAnimation(ImageHub.charakter.jump);
            } else if (this.world.keyboard.right || this.world.keyboard.left) {
                AudioHub.playLoop(AudioHub.CHAR_RUN);
                this.playAnimation(ImageHub.charakter.walk);
            } else if (this.idle()) {
                this.playAnimation(ImageHub.charakter.long_idle);
            } else {
                this.playAnimation(ImageHub.charakter.idle);
            }
        }, 100);
    }

    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }

    checkCharacterSound() {
        this.checkDamageSound();
        this.checkMovementSound();
    }

    checkDamageSound() {
        if (this.isDead()) {
            AudioHub.stopLoop(AudioHub.CHAR_RUN);
            AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
            if (!this.dyingSoundPlayed) {
                AudioHub.playOne(AudioHub.CHAR_DYING);
                this.dyingSoundPlayed = true;
            }
        } else if (this.isHurt()) {
            AudioHub.stopLoop(AudioHub.CHAR_RUN);
            AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
            if (this.lastHitSound != this.lastHit) {
                AudioHub.playOne(AudioHub.CHAR_DAMAGE);
                this.lastHitSound = this.lastHit;
            }
        }
    }

    checkMovementSound() {
        if (this.isDead() || this.isHurt()) {
            AudioHub.stopLoop(AudioHub.CHAR_RUN);
            AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
        } else if (this.isAboveGround()) {
            AudioHub.stopLoop(AudioHub.CHAR_RUN);
            AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
            AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
            AudioHub.playLoop(AudioHub.CHAR_RUN);
        } else if (this.idle()) {
            AudioHub.stopLoop(AudioHub.CHAR_RUN);
            AudioHub.playLoop(AudioHub.CHAR_SLEEP);
        } else {
            AudioHub.stopLoop(AudioHub.CHAR_RUN);
            AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
        }
    }

    idle() {
        let timePassed = new Date().getTime() - this.idleTimer;
        timePassed = timePassed / 1000;
        return timePassed > 8;
    }

    resetIdleTimer() {
        this.idleTimer = new Date().getTime();
    }

    jump() {
        this.speedY = 27.5;
        AudioHub.playOne(AudioHub.CHAR_JUMP);
    }

    collectibleCounter(item) { // eventuell in eine andere class verschieben
        if (item.type == "coin") {
            this.coins += 1;
            if (this.coins > 10) {  // für den max. Wert der Coins
                this.coins = 10;
            }
        } else if (item.type == "bottle") {
            this.bottle += 1;
            if (this.bottle > 10) {  // für den max. Wert der Coins
                this.bottle = 10;
            }
        }
    }


}