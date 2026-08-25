import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";
import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

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
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.beatChicken();
            this.checkCollisions();
            this.checkThrownObjects();
        }, 100);
    }

    checkThrownObjects() {
        if (this.keyboard.d) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead()) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.hp);
            }
        });
    }

    beatChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.hit();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundOnjects);
        this.addObjectToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // back
        // ------ space for fixed objects ------
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0); // forwards

        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.throwableObjects);

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


