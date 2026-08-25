import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor(imagepath) {
        super().loadImage(imagepath);

        this.x = Math.random() * 5000;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }



}