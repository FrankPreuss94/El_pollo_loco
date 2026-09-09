import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { AudioHub } from "./audiohub.class.js";

/**
 * Represents the end boss enemy.
 * @class
 */
export class Endboss extends MovableObject {

    height = 400;
    width = 345;
    speed = 5;
    x = 5300;
    y = 55;
    offset = {
        top: 100,
        right: 50,
        bottom: 20,
        left: 25
    };
    boss = true;
    isMoving = false;
    isAttacking = false;
    bossSoundPlayed = false;
    bossDeathSoundPlayed = false;

    /**
     * Creates a new end boss.
     */
    constructor() {
        super().loadImage(ImageHub.endboss.alert[0]);
        this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.walk);
        this.loadImages(ImageHub.endboss.attack);
        this.loadImages(ImageHub.endboss.hurt);
        this.loadImages(ImageHub.endboss.dead);
        this.applyGravity();
        this.animate();
        this.move();
        this.getHitBox();
    }

    /**
     * Handles the end boss animation based on its current state.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(ImageHub.endboss.dead);
                this.playDeathSound();
            } else if (this.isHurt()) {
                this.playAnimation(ImageHub.endboss.hurt);
            } else if (this.isAttacking) {
                this.playAnimation(ImageHub.endboss.attack);
            } else if (this.isMoving) {
                this.playAnimation(ImageHub.endboss.walk);
            } else {
                this.playAnimation(ImageHub.endboss.alert);
            }
        }, 200);
    }

    /**
     * Plays the end boss death sound once.
     */
    playDeathSound() {
        if (!this.bossDeathSoundPlayed) {
            AudioHub.stopOne(AudioHub.ENDBOSS_ANGRY);
            AudioHub.playOne(AudioHub.ENDBOSS_DEAD);
            this.bossDeathSoundPlayed = true;
        }
    }

    /**
     * Moves the end boss while it is active and alive.
     */
    move() {
        setInterval(() => {
            if (this.isMoving && !this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Controls the end boss movement and attack behavior.
     */
    bossBehavior() {
        if (!this.bossSoundPlayed) {
            AudioHub.playOne(AudioHub.ENDBOSS_ANGRY);
            this.bossSoundPlayed = true;
        }
        this.isMoving = false;
        setTimeout(() => {
            this.isMoving = true;
            setTimeout(() => {
                this.isMoving = false;
                this.attack();
            }, 1000);
        }, 2000);
    }

    /**
     * Starts the end boss attack.
     */
    attack() {
        if (!this.isDead()) {
            this.isAttacking = true;
            this.speedY = 30;
            const attackInterval = setInterval(() => {
                this.moveLeft();
                if (!this.isAboveGround() && this.speedY < 0) {
                    this.isAttacking = false;
                    clearInterval(attackInterval);
                    this.bossBehavior();
                }
            }, 1000 / 60);
        }
    }
}