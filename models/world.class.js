import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";

export class World {

    character = new Character;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar(ImageHub.stausbars.health_blue, 0);
    coinBar = new StatusBar(ImageHub.stausbars.coins_blue, 50);
    bottleBar = new StatusBar(ImageHub.stausbars.bottle_blue, 100);

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.hp);

                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundOnjects);

        this.ctx.translate(-this.camera_x, 0); // back
        // ------ space for fixed objects ------
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0); // forwards

        this.addToMap(this.character);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        requestAnimationFrame(() => this.draw());
    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.drawHitBox) {
            mo.drawHitBox(this.ctx);
        }

        if (mo.otherDirection) {
            this.flickImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flickImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}


