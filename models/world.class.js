import { createLevel1 } from "../levels/level1.js";
import { AudioHub } from "./audiohub.class.js";
import { Character } from "./character.class.js";
import { ImageHub } from "./image-hub.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

/**
 * Manages the game world, objects, collisions, sounds and game state.
 * @class
 */
export class World {

    character = new Character;
    level;
    endboss;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar(ImageHub.stausbars.health_blue, 30, 0, 100, this.character.hpMax);
    coinsBar = new StatusBar(ImageHub.stausbars.coins_blue, 30, 50, 0, this.character.coinsMax);
    bottleBar = new StatusBar(ImageHub.stausbars.bottle_blue, 30, 100, 0, this.character.bottleMax);
    bossBar;
    throwableObjects = [];
    bossSpawned = false;
    gameRunning = true;
    gameOverTriggered = false;

    /**
     * Creates a new game world.
     * @param {HTMLCanvasElement} canvas - Canvas element used for the game.
     * @param {Keyboard} keyboard - Keyboard input state.
     * @param {Function} showEndScreen - Function used to display the end screen.
     */
    constructor(canvas, keyboard, showEndScreen) {
        this.level = createLevel1();
        this.endboss = this.level.enemies[0];
        this.bossBar = new StatusBar(ImageHub.stausbars.boss_blue, 420, -50, 100, this.endboss.hpMax);
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.showEndScreen = showEndScreen;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Assigns the current world to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
    * Starts the game loop and checks the game state regularly.
    */
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

    /**
     * Spawns the end boss when the character reaches the boss area.
     */
    bossSpawn() {
        if (this.character.x > 4600 && !this.bossSpawned && this.bossBar.y < 8) {
            this.bossSpawned = true;
            this.bossBar.y = 8;
            this.endboss.bossBehavior();
        }
    }

    /**
     * Creates and throws a bottle when the throw conditions are met.
     */
    checkThrownObjects() {
        if (this.keyboard.d && this.character.bottle > 0 && this.throwCooldown()) {
            const bottle = new ThrowableObject(this.character.otherDirection ? this.character.x : this.character.x + 100,
                this.character.y + 100, this.character.otherDirection)
            this.throwableObjects.push(bottle);
            this.character.bottle -= 1;
            this.bottleBar.setPercentage(this.character.bottle, this.character.bottleMax);
            this.character.lastThrow = new Date().getTime();
            AudioHub.playOne(AudioHub.BOTTLE_THROW);
        }
    }

    /**
     * Checks whether thrown bottles have hit the ground or an enemy.
     */
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

    /**
     * Checks collisions between thrown bottles and enemies.
     */
    checkBottleCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.hasHit) {
                    bottle.bottleHit();
                    enemy.hit(20);
                    AudioHub.playOne(AudioHub.BOTTLE_BREAK);
                    this.bossBar.setPercentage(this.endboss.hp, this.endboss.hpMax);
                }
            });
        });
    }

    /**
     * Checks whether the bottle throwing cooldown has expired.
     * @returns {boolean} True if another bottle can be thrown.
     */
    throwCooldown() {
        let timePassed = new Date().getTime() - this.character.lastThrow;
        timePassed = timePassed / 1000
        return timePassed > 0.4;
    }

    /**
     * Checks collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead() && !this.character.isHurt()) {
                this.character.hit(5);
                this.healthBar.setPercentage(this.character.hp, this.character.hpMax);
            }
        });
    }

    /**
     * Checks for collected items and updates the corresponding status bar.
     */
    collectItems() {
        this.level.collectableObject.forEach((item) => {
            if (this.character.isColliding(item)) {
                if (item.type == "bottle" && this.character.bottle >= this.character.bottleMax) {
                    return;
                }
                this.character.collectibleCounter(item);
                this.updateCollectBar(item);
                this.playCollectSound(item);
                this.level.collectableObject.splice(this.level.collectableObject.indexOf(item), 1);
            }
        })
    }

    /**
     * Plays the sound matching the collected item.
     * @param {CollectableObject} item - Collected item.
     */
    playCollectSound(item) {
        if (item.type == "coin") {
            AudioHub.playOne(AudioHub.COLLECT_COIN);
        } else if (item.type == "bottle") {
            AudioHub.playOne(AudioHub.COLLECT_BOTTLE);
        }
    }

    /**
     * Updates the status bar matching the collected item.
     * @param {CollectableObject} item - Collected item.
     */
    updateCollectBar(item) {
        if (item.type == "coin") {
            this.coinsBar.setPercentage(this.character.coins, this.character.coinsMax);
        } else if (item.type == "bottle") {
            this.bottleBar.setPercentage(this.character.bottle, this.character.bottleMax);
        }
    }

    /**
     * Checks whether the character has defeated an enemy by jumping on it.
     */
    beatChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.speedY < 0 &&
                this.character.rY + this.character.rH < enemy.rY + enemy.rH / 2 + 20 &&
                !enemy.isDead() && !enemy.boss) {
                enemy.hit(5);
                this.character.speedY = 15;
            }
        });
    }

    /**
     * Draws the game world and all visible objects.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusbars();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.collectableObject);
        this.addObjectToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws all status bars on the canvas.
     */
    drawStatusbars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.bossBar);
    }

    /**
     * Adds multiple game objects to the map.
     * @param {DrawableObject[]} objects - Objects to draw.
     */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single game object to the map.
     * @param {DrawableObject} mo - Object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.drawHitBox) {
            mo.drawHitBox(this.ctx);
        }
        if (mo.otherDirection) {
            this.flickImageBack(mo);
        }
    }

    /**
     * Flips an object's image horizontally.
     * @param {DrawableObject} mo - Object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores an object's original horizontal position and canvas state.
     * @param {DrawableObject} mo - Object to restore.
     */
    flickImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks whether the character or end boss has ended the game.
     */
    checkGameOver() {
        if (this.gameOverTriggered) return;
        if (this.character.isDead()) {
            this.gameOverTriggered = true;
            setTimeout(() => {
                this.showEndScreen("endscreen_lost");
            }, 1500);
        }
        if (this.endboss.isDead()) {
            this.gameOverTriggered = true;
            setTimeout(() => {
                this.showEndScreen("endscreen_won");
            }, 1500);
        }
    }

    /**
     * Stops the game loop.
     */
    stopGame() {
        this.gameRunning = false;
    }
}


