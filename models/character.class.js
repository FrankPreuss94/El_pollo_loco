import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
    y = 155;
    height = 280;
    width = 150;
    speed = 10;
    world;


    constructor() {
        super().loadImage(ImageHub.charakter.idle[1]);
        this.loadImages(ImageHub.charakter.walk);
        this.loadImages(ImageHub.charakter.jump);
        this.applyGravity();
        this.animate();
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
            if (this.isAboveGround()) {
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
