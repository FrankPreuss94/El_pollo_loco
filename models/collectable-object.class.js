import { DrawableObject } from "./drawable-objects.class.js";
import { ImageHub } from "./image-hub.class.js";

export class CollectableObject extends DrawableObject {

    constructor(x, y) {
        super().loadImage(ImageHub.coin.small);
        this.x = x;
        this.y = y;
    }
}