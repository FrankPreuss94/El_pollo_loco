export class Level {
    enemies;
    clouds;
    backgroundOnjects;
    level_end_x = 5100;

    constructor(enemies, clouds, backgroundOnjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundOnjects = backgroundOnjects;
    }
}