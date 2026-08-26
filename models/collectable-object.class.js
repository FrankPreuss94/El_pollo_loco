import { DrawableObject } from "./drawable-objects.class.js";
import { ImageHub } from "./image-hub.class.js";

export class CollectableObject extends DrawableObject {
    showFrame = true; // nur für die Hitboxen > später entfernen
    offset = {
        top: 55,
        right: 55,
        bottom: 55,
        left: 55
    };


    constructor(x, y) {
        super().loadImage(ImageHub.coin.small);
        this.x = x;
        this.y = y;
        this.getHitBox();
    }


}