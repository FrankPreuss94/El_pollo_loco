import { BackgroundObject } from "../models/background-object.class.js";
import { SmallChicken } from "../models/chicken-small.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { CollectableObject } from "../models/collectable-object.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Level } from "../models/level.class.js";

export const level1 = new Level(
    [
        new Chicken,
        new Chicken,
        new Chicken,
        new Chicken,
        new Chicken,
        new Chicken,
        new Chicken,
        new Chicken,
        new SmallChicken,
        new SmallChicken,
        new SmallChicken,
        new SmallChicken,
        new SmallChicken,
        new SmallChicken,
        new SmallChicken,
        new Endboss

    ],
    [
        new Cloud("assets/img/5_background/layers/4_clouds/1.png"),
        new Cloud("assets/img/5_background/layers/4_clouds/2.png"),
        new Cloud("assets/img/5_background/layers/4_clouds/1.png"),
        new Cloud("assets/img/5_background/layers/4_clouds/2.png"),
        new Cloud("assets/img/5_background/layers/4_clouds/1.png"),
        new Cloud("assets/img/5_background/layers/4_clouds/2.png"),
        new Cloud("assets/img/5_background/layers/4_clouds/1.png"),
        new Cloud("assets/img/5_background/layers/4_clouds/2.png"),
        new Cloud("assets/img/5_background/layers/4_clouds/1.png")
    ],
    [
        new BackgroundObject("assets/img/5_background/layers/air.png", -720, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", -720, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", -720, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", -720, 80),

        new BackgroundObject("assets/img/5_background/layers/air.png", 0, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 0, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 0, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 0, 80),
        new BackgroundObject("assets/img/5_background/layers/air.png", 720, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 720, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 720, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 720, 80),

        new BackgroundObject("assets/img/5_background/layers/air.png", 720 * 2, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 720 * 2, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 720 * 2, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 720 * 2, 80),
        new BackgroundObject("assets/img/5_background/layers/air.png", 720 * 3, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 720 * 3, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 720 * 3, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 720 * 3, 80),

        new BackgroundObject("assets/img/5_background/layers/air.png", 720 * 4, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 720 * 4, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 720 * 4, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 720 * 4, 80),
        new BackgroundObject("assets/img/5_background/layers/air.png", 720 * 5, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 720 * 5, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 720 * 5, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 720 * 5, 80),

        new BackgroundObject("assets/img/5_background/layers/air.png", 720 * 6, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 720 * 6, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 720 * 6, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 720 * 6, 80),
        new BackgroundObject("assets/img/5_background/layers/air.png", 720 * 7, 80),
        new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 720 * 7, 80),
        new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 720 * 7, 80),
        new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 720 * 7, 80)
    ],
    [
        new CollectableObject(400, 150),
        new CollectableObject(500, 150),
        new CollectableObject(800, 50),
        new CollectableObject(1000, 250),
        new CollectableObject(1200, 150),
    ]
);