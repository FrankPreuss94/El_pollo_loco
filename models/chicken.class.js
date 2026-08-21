import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    y = 360;
    height = 57;
    width = 65;
    showFrame = true; // nur für die Hitboxen später entfernen
    offset = {
        top: 6,
        right: 5,
        bottom: 5,
        left: 5
    };

    constructor() {
        super().loadImage(ImageHub.chicken.walk[0]);
        this.loadImages(ImageHub.chicken.walk);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
        this.getHitBox();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(ImageHub.chicken.walk)
        }, 150);
    }


}
