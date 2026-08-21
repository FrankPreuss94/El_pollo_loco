import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    y = 140;
    height = 295;
    width = 150;
    speed = 10;
    world;
    showFrame = true; // nur für die Hitboxen später entfernen
    offset = {
        top: 120,
        right: 50,
        bottom: 16,
        left: 40
    };


    constructor() {
        super().loadImage(ImageHub.charakter.idle[1]);
        this.loadImages(ImageHub.charakter.walk);
        this.loadImages(ImageHub.charakter.jump);
        this.loadImages(ImageHub.charakter.dead);
        this.loadImages(ImageHub.charakter.hurt);
        this.applyGravity();
        this.animate();
        this.getHitBox();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.space && !this.isAboveGround() || this.world.keyboard.up && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(ImageHub.charakter.dead)
            } else if (this.isHurt()) {
                this.playAnimation(ImageHub.charakter.hurt)
            } else if (this.isAboveGround()) {
                this.playAnimation(ImageHub.charakter.jump)
            } else {
                if (this.world.keyboard.right || this.world.keyboard.left) {
                    // walk animation
                    this.playAnimation(ImageHub.charakter.walk)
                }
            }
        }, 50);
    }

    jump() {
        this.speedY = 27.5;
    }
}
