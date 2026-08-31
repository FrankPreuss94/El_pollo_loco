import { DrawableObject } from "./drawable-objects.class.js";

export class MovableObject extends DrawableObject {
    speed = 0.15; // muss hier nicht definiert werden, nur deklarieren
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    hp = 100;
    hpMax = 100;
    lastHit = 0;
    throwable = false;

    applyGravity() {
        setInterval(() => {
            if (!this.hasHit && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this.throwable) {
            return this.y < 350;  // höhe anpassen für die Flaschen
        } else {
            return this.y < 140;
        }
    }

    hit() {
        this.hp -= 5;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1; // länge der hurt-animation
    }

    isDead() {
        return this.hp == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 27.5; // erhöht die Sprunghöhe
    }

}