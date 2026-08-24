import { DrawableObject } from "./drawable-objects.class.js";
import { ImageHub } from "./image-hub.class.js";

export class StatusBar extends DrawableObject {

    IMAGES = [
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ]

    percentage = 100;
    ImageHubPath;


    constructor(_imageHubPath, _y) {
        super();
        this.loadImages(_imageHubPath);
        this.x = 30;
        this.y = _y;
        this.width = 200;
        this.height = 60;
        this.imageHubPath = _imageHubPath;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.imageHubPath[this.resolveImageIndex()]; //TODO an ImageHub anpassen
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