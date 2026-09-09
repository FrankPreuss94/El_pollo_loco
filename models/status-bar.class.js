import { DrawableObject } from "./drawable-objects.class.js";

export class StatusBar extends DrawableObject {

    x = 30;
    percentage = 100;
    ImageHubPath;

    constructor(_imageHubPath, x, y, currentValue, maxValue) {
        super();
        this.loadImages(_imageHubPath);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.imageHubPath = _imageHubPath;
        this.setPercentage(currentValue, maxValue);
    }

    setPercentage(currentValue, maxValue) {
        this.percentage = currentValue / maxValue * 100;
        let path = this.imageHubPath[this.resolveImageIndex(maxValue)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}