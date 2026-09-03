import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {

    height = 400; // 1:1.165
    width = 345;
    speed = 5;
    x = 5300;  // Startpos bei 5300
    y = 55;
    // hp = 50;
    // hpMax = 50;
    showFrame = true; // nur für die Hitboxen später entfernen
    offset = {
        top: 100,
        right: 50,
        bottom: 20,
        left: 25
    };
    boss = true;
    isMoving = false;
    isAttacking = false;


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

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(ImageHub.endboss.dead);
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

    move() {
        setInterval(() => {
            if (this.isMoving && !this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    bossBehavior() {
        this.isMoving = false;
        setTimeout(() => {
            this.isMoving = true;
            setTimeout(() => {
                this.isMoving = false;
                this.attack();
            }, 1000);
        }, 2000);
    }


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