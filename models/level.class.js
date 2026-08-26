export class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObject;

    level_end_x = 5100;

    constructor(enemies, clouds, backgroundObjects, collectableObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObject = collectableObject;
    }
}