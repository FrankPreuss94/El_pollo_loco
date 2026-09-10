/**
 * Provides centralized paths for all game images and animations.
 * @class
 */
export class ImageHub {
    /**
     * Images and animations for the player character.
     */
    static charakter = {
        idle: [
            "assets/img/2_character_pepe/1_idle/idle/I-1.png",
            "assets/img/2_character_pepe/1_idle/idle/I-2.png",
            "assets/img/2_character_pepe/1_idle/idle/I-3.png",
            "assets/img/2_character_pepe/1_idle/idle/I-4.png",
            "assets/img/2_character_pepe/1_idle/idle/I-5.png",
            "assets/img/2_character_pepe/1_idle/idle/I-6.png",
            "assets/img/2_character_pepe/1_idle/idle/I-7.png",
            "assets/img/2_character_pepe/1_idle/idle/I-8.png",
            "assets/img/2_character_pepe/1_idle/idle/I-9.png",
            "assets/img/2_character_pepe/1_idle/idle/I-10.png"
        ],
        long_idle: [
            "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
            "assets/img/2_character_pepe/1_idle/long_idle/I-20.png"
        ],
        walk: [
            "assets/img/2_character_pepe/2_walk/W-21.png",
            "assets/img/2_character_pepe/2_walk/W-22.png",
            "assets/img/2_character_pepe/2_walk/W-23.png",
            "assets/img/2_character_pepe/2_walk/W-24.png",
            "assets/img/2_character_pepe/2_walk/W-25.png",
            "assets/img/2_character_pepe/2_walk/W-26.png"
        ],
        jump: [
            "assets/img/2_character_pepe/3_jump/J-31.png",
            "assets/img/2_character_pepe/3_jump/J-32.png",
            "assets/img/2_character_pepe/3_jump/J-33.png",
            "assets/img/2_character_pepe/3_jump/J-34.png",
            "assets/img/2_character_pepe/3_jump/J-35.png",
            "assets/img/2_character_pepe/3_jump/J-36.png",
            "assets/img/2_character_pepe/3_jump/J-37.png",
            "assets/img/2_character_pepe/3_jump/J-38.png",
            "assets/img/2_character_pepe/3_jump/J-39.png"
        ],
        hurt: [
            "assets/img/2_character_pepe/4_hurt/H-41.png",
            "assets/img/2_character_pepe/4_hurt/H-42.png",
            "assets/img/2_character_pepe/4_hurt/H-43.png"
        ],
        dead: [
            "assets/img/2_character_pepe/5_dead/D-51.png",
            "assets/img/2_character_pepe/5_dead/D-52.png",
            "assets/img/2_character_pepe/5_dead/D-53.png",
            "assets/img/2_character_pepe/5_dead/D-54.png",
            "assets/img/2_character_pepe/5_dead/D-55.png",
            "assets/img/2_character_pepe/5_dead/D-56.png",
            "assets/img/2_character_pepe/5_dead/D-57.png"
        ]
    }

    /**
     * Images for the normal chicken enemy.
     */
    static chicken = {
        walk: [
            "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
            "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
            "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
        ],
        dead: [
            "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
        ]
    }

    /**
     * Images for the small chicken enemy.
     */
    static smallChicken = {
        walk: [
            "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
            "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
            "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
        ],
        dead: [
            "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"
        ]
    }

    /**
     * Images and animations for the end boss.
     */
    static endboss = {
        walk: [
            "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
            "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
            "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
            "assets/img/4_enemie_boss_chicken/1_walk/G4.png"
        ],
        alert: [
            "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
            "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
            "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
            "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
            "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
            "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
            "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
            "assets/img/4_enemie_boss_chicken/2_alert/G12.png"
        ],
        attack: [
            "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
            "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
            "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
            "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
            "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
            "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
            "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
            "assets/img/4_enemie_boss_chicken/3_attack/G20.png"
        ],
        hurt: [
            "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
            "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
            "assets/img/4_enemie_boss_chicken/4_hurt/G23.png"
        ],
        dead: [
            "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
            "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
            "assets/img/4_enemie_boss_chicken/5_dead/G26.png"
        ]
    }

    /**
     * Images for the game's status bars.
     */
    static stausbars = {
        health_bar: [
            "assets/img/7_statusbars/health_bar/0.png",
            "assets/img/7_statusbars/health_bar/10.png",
            "assets/img/7_statusbars/health_bar/20.png",
            "assets/img/7_statusbars/health_bar/30.png",
            "assets/img/7_statusbars/health_bar/40.png",
            "assets/img/7_statusbars/health_bar/50.png",
            "assets/img/7_statusbars/health_bar/60.png",
            "assets/img/7_statusbars/health_bar/70.png",
            "assets/img/7_statusbars/health_bar/80.png",
            "assets/img/7_statusbars/health_bar/90.png",
            "assets/img/7_statusbars/health_bar/100.png"
        ],
        coins_bar: [
            "assets/img/7_statusbars/coin_bars/0.png",
            "assets/img/7_statusbars/coin_bars/10.png",
            "assets/img/7_statusbars/coin_bars/20.png",
            "assets/img/7_statusbars/coin_bars/30.png",
            "assets/img/7_statusbars/coin_bars/40.png",
            "assets/img/7_statusbars/coin_bars/50.png",
            "assets/img/7_statusbars/coin_bars/60.png",
            "assets/img/7_statusbars/coin_bars/70.png",
            "assets/img/7_statusbars/coin_bars/80.png",
            "assets/img/7_statusbars/coin_bars/90.png",
            "assets/img/7_statusbars/coin_bars/100.png"
        ],
        bottle_bar: [
            "assets/img/7_statusbars/bottle_bars/0.png",
            "assets/img/7_statusbars/bottle_bars/10.png",
            "assets/img/7_statusbars/bottle_bars/20.png",
            "assets/img/7_statusbars/bottle_bars/30.png",
            "assets/img/7_statusbars/bottle_bars/40.png",
            "assets/img/7_statusbars/bottle_bars/50.png",
            "assets/img/7_statusbars/bottle_bars/60.png",
            "assets/img/7_statusbars/bottle_bars/70.png",
            "assets/img/7_statusbars/bottle_bars/80.png",
            "assets/img/7_statusbars/bottle_bars/90.png",
            "assets/img/7_statusbars/bottle_bars/100.png"
        ],
        boss_bar: [
            "assets/img/7_statusbars/boss_bars/0.png",
            "assets/img/7_statusbars/boss_bars/10.png",
            "assets/img/7_statusbars/boss_bars/20.png",
            "assets/img/7_statusbars/boss_bars/30.png",
            "assets/img/7_statusbars/boss_bars/40.png",
            "assets/img/7_statusbars/boss_bars/50.png",
            "assets/img/7_statusbars/boss_bars/60.png",
            "assets/img/7_statusbars/boss_bars/70.png",
            "assets/img/7_statusbars/boss_bars/80.png",
            "assets/img/7_statusbars/boss_bars/90.png",
            "assets/img/7_statusbars/boss_bars/100.png"
        ]
    }

    /**
     * Images and animations for throwable bottles.
     */
    static bottle = {
        normal: [
            "assets/img/6_salsa_bottle/salsa_bottle.png"
        ],
        ground: [
            "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
            "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
        ],
        rotation: [
            "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
            "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
            "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
            "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
        ],
        splash: [
            "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
            "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
            "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
            "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
            "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
            "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
        ]
    }

    /**
     * Images for collectible coins.
     */
    static coin = {
        small: "assets/img/8_coin/coin_1.png",
        big: "assets/img/8_coin/coin_2.png"
    }
}