import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a background object in the game world.
 * @class
 */
export class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new background object.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // ändern = 0;
    }
}