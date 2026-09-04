import { level1 } from "../levels/level1.js";
import { AudioHub } from "./audiohub.class.js";
import { Character } from "./character.class.js";
import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {

    character = new Character;
    level = level1;
    endboss = this.level.enemies[0];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar(ImageHub.stausbars.health_blue, 30, 0, 100, this.character.hpMax);
    coinsBar = new StatusBar(ImageHub.stausbars.coins_blue, 30, 50, 0, this.character.coinsMax);
    bottleBar = new StatusBar(ImageHub.stausbars.bottle_blue, 30, 100, 0); //hier max bottles anpassen
    bossBar = new StatusBar(ImageHub.stausbars.boss_blue, 480, -50, 100, this.level.enemies[0].hpMax);;
    throwableObjects = [];
    bossSpawned = false;
    gameRunning = true;

    constructor(canvas, keyboard, showEndScreen) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.showEndScreen = showEndScreen;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            if (!this.gameRunning) return;
            this.beatChicken();
            this.checkCollisions();
            this.checkThrownObjects();
            this.collectItems();
            this.checkBottleCollision();
            this.checkBottleHit();
            this.bossSpawn();
            this.checkGameOver();
        }, 30);
    }

    bossSpawn() {
        if (this.character.x > 4600 && !this.bossSpawned && this.bossBar.y < 8) {
            this.bossSpawned = true;
            console.log("hello there");
            this.bossBar.y = 8;
            this.endboss.bossBehavior();
        }
    }

    checkThrownObjects() {
        if (this.keyboard.d && this.character.bottle > 0 && this.throwCooldown()) {
            const bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle);
            this.character.bottle -= 1;
            this.bottleBar.setPercentage(this.character.bottle, this.character.bottleMax);
            this.character.lastThrow = new Date().getTime();
            AudioHub.playOne(AudioHub.BOTTLE_THROW);
        }
    }

    checkBottleHit() {
        this.throwableObjects.forEach((bottle) => {
            if (!bottle.isAboveGround() && !bottle.hasHit) {
                bottle.bottleHit();
                AudioHub.playOne(AudioHub.BOTTLE_BREAK);
            }
            if (bottle.hasHit && bottle.splashFinished()) {
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
            }
        });
    }

    checkBottleCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.hasHit) {
                    bottle.bottleHit();
                    enemy.hit(20);
                    console.log(this.endboss.hp);
                    this.bossBar.setPercentage(this.endboss.hp, this.endboss.hpMax);

                }
            });
        });
    }

    throwCooldown() {
        let timePassed = new Date().getTime() - this.character.lastThrow;
        timePassed = timePassed / 1000
        return timePassed > 0.25;
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead()) {
                this.character.hit(5);
                this.healthBar.setPercentage(this.character.hp, this.character.hpMax);
            }
        });
    }

    collectItems() {
        this.level.collectableObject.forEach((item) => {
            if (this.character.isColliding(item)) {
                this.character.collectibleCounter(item);
                this.updateCollectBar(item)
                this.level.collectableObject.splice(this.level.collectableObject.indexOf(item), 1)
            }
        })
    }

    updateCollectBar(item) {
        if (item.type == "coin") {
            this.coinsBar.setPercentage(this.character.coins, this.character.coinsMax);
        } else if (item.type == "bottle") {
            this.bottleBar.setPercentage(this.character.bottle, this.character.bottleMax);
        }
    }

    beatChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.hit(5);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // back
        // ------ space for fixed objects ------
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0); // forwards

        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.collectableObject);
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
        // mo.drawFrame(this.ctx); // zur Visualisierung > später entfernen
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

    checkGameOver() {
        if (this.character.isDead()) {
            setTimeout(() => {
                this.showEndScreen("endscreen_lost");
            }, 1500);
        }

        if (this.endboss.isDead()) {
            setTimeout(() => {
                this.showEndScreen("endscreen_won");
            }, 1500);
        }
    }

    stopGame() {
        this.gameRunning = false;
    }

}


