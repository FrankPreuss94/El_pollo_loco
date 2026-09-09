/**
 * Base class for drawable game objects.
 * @class
 */
export class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 150;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    rX;
    rY;
    rW;
    rH;

    /**
     * Loads an image for the game object.
     * @param {string} path - Path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Checks if this object is colliding with another object.
     * @param {DrawableObject} mo - Object to check for collision.
     * @returns {boolean} True if the objects are colliding.
     */
    isColliding(mo) {
        return this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH;
    }

    /**
     * Updates the collision hitbox of the object.
     */
    getHitBox() {
        setInterval(() => {
            this.rX = this.x + this.offset.left;
            this.rY = this.y + this.offset.top;
            this.rW = this.width - this.offset.left - this.offset.right;
            this.rH = this.height - this.offset.top - this.offset.bottom;
        }, 1000 / 60);
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}