import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { AudioHub } from "./audiohub.class.js";

/**
 * Represents a chicken enemy.
 * @class
 */
export class Chicken extends MovableObject {
    y = 360;
    height = 57;
    width = 65;
    hp = 5;
    offset = {
        top: 6,
        right: 5,
        bottom: 5,
        left: 5
    };
    deathSoundPlayed = false;

    /**
    * Creates a new chicken enemy.
    */
    constructor() {
        super().loadImage(ImageHub.chicken.walk[0]);
        this.loadImages(ImageHub.chicken.walk);
        this.loadImages(ImageHub.chicken.dead);
        this.x = 700 + Math.random() * 4500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.getHitBox();
    }

    /**
         * Handles the chicken's movement and animation.
         */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(ImageHub.chicken.dead);
                this.speed = 0;
                this.playDeathSound();
            } else {
                this.playAnimation(ImageHub.chicken.walk);
            }
        }, 150);
    }

    /**
     * Plays a random death sound for the chicken.
     */
    playDeathSound() {
        if (!this.deathSoundPlayed) {
            const sounds = [
                AudioHub.CHICKEN_DEAD,
                AudioHub.CHICKEN_DEAD2
            ];
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            AudioHub.playOne(randomSound);
            this.deathSoundPlayed = true;
        }
    }
}
