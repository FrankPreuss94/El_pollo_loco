import { AudioHub } from "./audiohub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents the player character.
 * @class
 */
export class Character extends MovableObject {
    y = 140;
    height = 295;
    width = 150;
    speed = 10;
    world;
    coins = 0;
    coinsMax = 10;
    bottle = 0;
    bottleMax = 10;
    lastThrow = 0;
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
    isCharacter = true;

    /**
    * Creates a new player character.
    */
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

    /**
    * Handles character movement, animation and camera position.
    */

    /**
 * Handles character movement, animation and camera position.
 */
    animate() {
        this.startMovementInterval();
        this.startAnimationInterval();
    }

    /**
     * Starts the character movement interval.
     */
    startMovementInterval() {
        this.movementInterval = setInterval(() => {
            this.handleMovement();
            this.world.camera_x = -this.x + 100;
            this.idle();
        }, 1000 / 60);
    }

    /**
     * Handles keyboard-based character movement.
     */
    handleMovement() {
        this.handleHorizontalMovement();
        this.handleJump();
    }

    /**
     * Handles left and right character movement.
     */
    handleHorizontalMovement() {
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
    }

    /**
     * Handles the character jump input.
     */
    handleJump() {
        if ((this.world.keyboard.space && !this.isAboveGround() ||
            this.world.keyboard.up && !this.isAboveGround()) && !this.isDead()) {
            this.jump();
            this.resetIdleTimer();
        }
    }

    /**
     * Starts the character animation interval.
     */
    startAnimationInterval() {
        this.animationInterval = setInterval(() => {
            this.checkCharacterSound();
            this.updateAnimation();
        }, 100);
    }

    /**
    * Updates the character animation based on its current state.
    */
    updateAnimation() {
        if (this.isDead()) {
            this.playAnimation(ImageHub.charakter.dead);
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.charakter.hurt);
        } else if (this.isAboveGround()) {
            this.playAnimation(ImageHub.charakter.jump);
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playAnimation(ImageHub.charakter.walk);
        } else if (this.idle()) {
            this.playAnimation(ImageHub.charakter.long_idle);
        } else {
            this.playAnimation(ImageHub.charakter.idle);
        }
    }

    /**
     * Stops the character's movement and animation intervals.
     */
    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }

    /**
     * Checks and plays sounds based on the character's current state.
     */
    checkCharacterSound() {
        this.checkDamageSound();
        this.checkMovementSound();
    }

    /**
     * Checks whether the character is dead or hurt and handles the corresponding sound.
     */
    checkDamageSound() {
        if (this.isDead()) {
            this.handleDeathSound();
        } else if (this.isHurt()) {
            this.handleDamageSound();
        }
    }

    /**
     * Handles the character's death sound.
     */
    handleDeathSound() {
        AudioHub.stopLoop(AudioHub.CHAR_RUN);
        AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
        if (!this.dyingSoundPlayed) {
            AudioHub.playOne(AudioHub.CHAR_DYING);
            this.dyingSoundPlayed = true;
        }
    }

    /**
     * Handles the character's damage sound.
     */
    handleDamageSound() {
        AudioHub.stopLoop(AudioHub.CHAR_RUN);
        AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
        if (this.lastHitSound != this.lastHit) {
            AudioHub.playOne(AudioHub.CHAR_DAMAGE);
            this.lastHitSound = this.lastHit;
        }
    }

    /**
     * Checks and plays movement-related sounds.
     */
    checkMovementSound() {
        if (this.isDead() || this.isHurt()) {
            this.stopCharacterSounds();
        } else if (this.isAboveGround()) {
            this.stopCharacterSounds();
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playRunSound();
        } else if (this.idle()) {
            this.playSleepSound();
        } else {
            this.stopCharacterSounds();
        }
    }

    /**
     * Plays the character's running sound.
     */
    playRunSound() {
        AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
        AudioHub.playLoop(AudioHub.CHAR_RUN);
    }

    /**
     * Plays the character's sleeping sound.
     */
    playSleepSound() {
        AudioHub.stopLoop(AudioHub.CHAR_RUN);
        AudioHub.playLoop(AudioHub.CHAR_SLEEP);
    }

    /**
     * Stops the character's movement sounds.
     */
    stopCharacterSounds() {
        AudioHub.stopLoop(AudioHub.CHAR_RUN);
        AudioHub.stopLoop(AudioHub.CHAR_SLEEP);
    }

    /**
     * Checks if the character has been idle for more than eight seconds.
     * @returns {boolean} True if the character is idle.
     */
    idle() {
        let timePassed = new Date().getTime() - this.idleTimer;
        timePassed = timePassed / 1000;
        return timePassed > 8;
    }

    /**
     * Resets the character's idle timer.
     */
    resetIdleTimer() {
        this.idleTimer = new Date().getTime();
    }

    /**
     * Makes the character jump and plays the jump sound.
     */
    jump() {
        this.speedY = 27.5;
        AudioHub.playOne(AudioHub.CHAR_JUMP);
    }

    /**
     * Increases the character's coin or bottle count.
     * @param {CollectableObject} item - Collectible item to add.
     */
    collectibleCounter(item) {
        if (item.type == "coin") {
            this.coins += 1;
            if (this.coins > 10) {
                this.coins = 10;
            }
        } else if (item.type == "bottle") {
            this.bottle += 1;
            if (this.bottle > 10) {
                this.bottle = 10;
            }
        }
    }
}