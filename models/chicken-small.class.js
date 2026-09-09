import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./image-hub.class.js";

export class SmallChicken extends Chicken {
    y = 380;
    height = 40;
    width = 45;

    constructor() {
        super().loadImage(ImageHub.smallChicken.walk[0]);
        this.loadImages(ImageHub.smallChicken.walk);
        this.loadImages(ImageHub.smallChicken.dead);
        this.speed = 0.15 + Math.random() * 0.25; // speed anpassen?? 
        this.getHitBox();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(ImageHub.smallChicken.dead)
                this.speed = 0;
                this.playDeathSound();
            } else {
                this.playAnimation(ImageHub.smallChicken.walk)
            }
        }, 150);
    }
}