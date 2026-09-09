import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
    throwable = true;
    hasHit = false;
    hitTime = 0;
    offset = {
        top: 7,
        right: 7,
        bottom: 7,
        left: 7
    };

    constructor(x, y, otherDirection) {
        super().loadImage(ImageHub.bottle.normal);
        this.loadImages(ImageHub.bottle.rotation);
        this.loadImages(ImageHub.bottle.splash);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.getHitBox();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (!this.hasHit) {
                if (this.otherDirection) {
                    this.x -= 7;
                } else {
                    this.x += 7;
                }
                this.playAnimation(ImageHub.bottle.rotation);
            } else {
                this.playAnimation(ImageHub.bottle.splash);
            }
        }, 25)
    }

    bottleHit() {
        if (!this.hasHit) {
            this.hasHit = true;
            this.hitTime = new Date().getTime();
            this.speedY = 0;
        }
    }

    splashFinished() {
        let timePassed = new Date().getTime() - this.hitTime;
        timePassed = timePassed / 1000;
        return timePassed > 0.25;
    }
}