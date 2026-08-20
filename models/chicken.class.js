import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    y = 360;
    height = 57;
    width = 65;
    imagesWalking = [
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    constructor() {
        super().loadImage(ImageHub.chicken.walk[0]);
        this.loadImages(ImageHub.chicken.walk);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % ImageHub.chicken.walk.length;
            let path = ImageHub.chicken.walk[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }


}
