import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a cloud in the game world.
 * @class
 */
export class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * Creates a new cloud.
     * @param {string} imagePath - Path to the cloud image.
     */
    constructor(imagepath) {
        super().loadImage(imagepath);
        this.x = Math.random() * 5000;
        this.animate();
    }

    /**
     * Moves the cloud to the left.
     */
    animate() {
        this.moveLeft();
    }
}