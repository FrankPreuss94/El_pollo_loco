/**
 * Represents the configuration and objects of a game level.
 * @class
 */
export class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObject;

    level_end_x = 5100;

    /**
     * Creates a new game level.
     * @param {MovableObject[]} enemies - Enemies contained in the level.
     * @param {DrawableObject[]} clouds - Clouds contained in the level.
     * @param {DrawableObject[]} backgroundObjects - Background objects of the level.
     * @param {CollectableObject[]} collectableObject - Collectible objects of the level.
     */
    constructor(enemies, clouds, backgroundObjects, collectableObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObject = collectableObject;
    }
}