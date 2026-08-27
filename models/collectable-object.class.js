import { DrawableObject } from "./drawable-objects.class.js";
import { ImageHub } from "./image-hub.class.js";

export class CollectableObject extends DrawableObject {
    type;
    path;
    showFrame = true; // nur für die Hitboxen > später entfernen


    constructor(x, y, type) {
        super()
        this.type = type;
        this.checkType(type);
        this.setSize(type);
        this.loadImage(this.path);
        this.x = x;
        this.y = y;
        this.getHitBox();
    }

    checkType(type) {
        if (type == "coin") {
            this.path = ImageHub.coin.small;
        } else if (type == "bottle") {
            this.path = ImageHub.bottle.ground[Math.floor(Math.random() * 2)];
        }
    }

    setSize(type) {
        if (type == "coin") {
            this.height = 150;
            this.width = 150;
            this.offset = {
                top: 55,
                right: 55,
                bottom: 55,
                left: 55
            };
        } else if (type == "bottle") {
            this.height = 80;
            this.width = 80;
            this.offset = {
                top: 15,
                right: 17,
                bottom: 10,
                left: 35
            };
        }
    }


}