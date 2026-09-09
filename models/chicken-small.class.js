import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./image-hub.class.js";

/**
 * Represents a small chicken enemy.
 * @class
 */
export class SmallChicken extends Chicken {
    y = 380;
    height = 40;
    width = 45;

    /**
     * Creates a new small chicken enemy.
     */
    constructor() {
        super().loadImage(ImageHub.smallChicken.walk[0]);
        this.loadImages(ImageHub.smallChicken.walk);
        this.loadImages(ImageHub.smallChicken.dead);
        this.speed = 0.15 + Math.random() * 0.25;
        this.getHitBox();
    }

    /**
     * Handles the small chicken's movement and animation.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(ImageHub.smallChicken.dead)
                this.speed = 0;
                this.playDeathSound();
            } else {
                this.playAnimation(ImageHub.smallChicken.walk)
            }
        }, 150);
    }
}