import { DrawableObject } from "./drawable-objects.class.js";

/**
 * Base class for movable game objects.
 * @class
 */
export class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    hp = 100;
    hpMax = 100;
    lastHit = 0;
    throwable = false;
    isCharacter = false;

    /**
   * Applies gravity to the object.
   */
    applyGravity() {
        setInterval(() => {
            if (!this.hasHit && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (!this.isAboveGround() && this.isCharacter) {
                this.y = 140;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
    * Checks if the object is above the ground.
    * @returns {boolean} True if the object is above the ground.
    */
    isAboveGround() {
        if (this.throwable) {
            return this.y < 350;
        } else if (this.boss) {
            return this.y < 55;
        } else {
            return this.y < 140;
        }
    }

    /**
     * Reduces the object's health by the given damage.
     * @param {number} damage - Amount of damage.
     */
    hit(damage) {
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt.
     * @returns {boolean} True if the object is hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.3;
    }

    /**
     * Checks if the object's health has reached zero.
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.hp == 0;
    }

    /**
     * Changes the current animation frame.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Makes the object jump.
    */
    jump() {
        this.speedY = 27.5;
    }
}