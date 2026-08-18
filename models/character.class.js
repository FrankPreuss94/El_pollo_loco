class Character extends MovableObject {
    y = 155;
    height = 280;
    width = 150;
    imagesWalking = [
        "assets/img/2_character_pepe/2_walk/W-21.png",
        "assets/img/2_character_pepe/2_walk/W-22.png",
        "assets/img/2_character_pepe/2_walk/W-23.png",
        "assets/img/2_character_pepe/2_walk/W-24.png",
        "assets/img/2_character_pepe/2_walk/W-25.png",
        "assets/img/2_character_pepe/2_walk/W-26.png"
    ];
    world;


    constructor() {
        super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(this.imagesWalking);

        this.animate();
    }

    animate() {
        setInterval(() => {

            if (this.world.keyboard.right) {
                let i = this.currentImage % this.imagesWalking.length;
                let path = this.imagesWalking[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 100);
    }

    jump() {

    }
}
