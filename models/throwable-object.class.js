import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
    throwable = true;
    hasHit = false;

    constructor(x, y) {
        super().loadImage(ImageHub.bottle.normal);
        this.loadImages(ImageHub.bottle.rotation);
        this.loadImages(ImageHub.bottle.splash);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (!this.hasHit) {
                this.x += 10;
                this.playAnimation(ImageHub.bottle.rotation);
            } else {
                this.playAnimation(ImageHub.bottle.splash);
            }
        }, 25)
    }

    bottleHit() {
        this.hasHit = true;
        console.log("hit");
    }
}