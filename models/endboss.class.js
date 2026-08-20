import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {

    height = 400; // 1:1.165
    width = 345;
    y = 55;

    constructor() {
        super().loadImage(ImageHub.endboss.alert[0]);
        this.loadImages(ImageHub.endboss.alert);
        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(ImageHub.endboss.alert)
        }, 200);
    }

}