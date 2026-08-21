import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {

    height = 400; // 1:1.165
    width = 345;
    x = 300;
    y = 55;
    showFrame = true; // nur für die Hitboxen später entfernen
    offset = {
        top: 100,
        right: 50,
        bottom: 20,
        left: 25
    };


    constructor() {
        super().loadImage(ImageHub.endboss.alert[0]);
        this.loadImages(ImageHub.endboss.alert);
        this.animate();
        this.getHitBox();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(ImageHub.endboss.alert)
        }, 200);
    }

}