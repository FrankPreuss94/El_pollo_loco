import { DrawableObject } from "./drawable-objects.class.js";

/**
 * Represents a status bar for displaying a game value.
 * @class
 */
export class StatusBar extends DrawableObject {

    x = 30;
    percentage = 100;
    ImageHubPath;

    /**
     * Creates a new status bar.
     * @param {string[]} _imageHubPath - Array of image paths for the status bar.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     * @param {number} currentValue - Current value of the status.
     * @param {number} maxValue - Maximum value of the status.
     */
    constructor(_imageHubPath, x, y, currentValue, maxValue) {
        super();
        this.loadImages(_imageHubPath);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.imageHubPath = _imageHubPath;
        this.setPercentage(currentValue, maxValue);
    }

    /**
     * Updates the status bar percentage and displayed image.
     * @param {number} currentValue - Current value of the status.
     * @param {number} maxValue - Maximum value of the status.
     */
    setPercentage(currentValue, maxValue) {
        this.percentage = currentValue / maxValue * 100;
        let path = this.imageHubPath[this.resolveImageIndex(maxValue)];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current percentage.
     * @returns {number} Index of the image representing the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}