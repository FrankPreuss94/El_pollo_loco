class Level {
    enemies;
    clouds;
    backgroundOnjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundOnjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundOnjects = backgroundOnjects;
    }
}