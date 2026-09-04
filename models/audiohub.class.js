class MyAudio {
    file;
    isLoaded = false;
    isPlaying = false;

    constructor(_file, _volume) {
        this.file = new Audio(_file);
        this.file.volume = _volume;
        this.file.preload = "auto";

        this.file.addEventListener("canplaythrough", () => {
            this.isLoaded = true;
        });
    }
}

export class AudioHub {
    static CHAR_DAMAGE = new MyAudio("assets/audio/character/characterDamage.mp3", 0.5);
    static CHAR_DYING = new MyAudio("assets/audio/character/characterDying.mp3", 0.5);
    static CHAR_RUN = new MyAudio("assets/audio/character/characterRun.mp3", 0.3);
    static CHAR_SLEEP = new MyAudio("assets/audio/character/characterSleep.mp3", 0.5);

    static CHICKEN_DEAD = new MyAudio("assets/audio/chicken/chickenDead.mp3", 0.5);
    static CHICKEN_DEAD2 = new MyAudio("assets/audio/chicken/chickenDead2.mp3", 0.5);

    static COLLECT_BOTTLE = new MyAudio("assets/audio/collectibles/bottleCollectSound.wav", 0.5);
    static COLLECT_COIN = new MyAudio("assets/audio/collectibles/collectSound.wav", 0.5);

    static ENDBOSS_ANGRY = new MyAudio("assets/audio/endboss/chicken-angry.mp3", 0.5);
    static ENDBOSS_DEAD = new MyAudio("assets/audio/endboss/boss_dead.mp3", 0.5);

    static GAME_START = new MyAudio("assets/audio/game/gameStart.mp3", 0.5);
    static GAME_WON = new MyAudio("assets/audio/game/won.mp3", 0.5);
    static GAME_LOST = new MyAudio("assets/audio/game/lost.mp3", 0.5);
    static GAME_BACKGROUND = new MyAudio("assets/audio/game/background.mp3", 0.5);

    static BOTTLE_THROW = new MyAudio("assets/audio/throwable/throw.mp3", 0.5);
    static BOTTLE_BREAK = new MyAudio("assets/audio/throwable/bottleBreak.mp3", 0.5);


    static allSounds = [
        AudioHub.CHAR_DAMAGE,
        AudioHub.CHAR_DYING,
        AudioHub.CHAR_RUN,
        AudioHub.CHAR_SLEEP,

        AudioHub.CHICKEN_DEAD,
        AudioHub.CHICKEN_DEAD2,

        AudioHub.COLLECT_BOTTLE,
        AudioHub.COLLECT_COIN,

        AudioHub.ENDBOSS_ANGRY,
        AudioHub.ENDBOSS_DEAD,

        AudioHub.GAME_START,
        AudioHub.GAME_WON,
        AudioHub.GAME_LOST,
        AudioHub.GAME_BACKGROUND,

        AudioHub.BOTTLE_THROW,
        AudioHub.BOTTLE_BREAK,
    ];

    static playOne(sound) {
        sound.file.currentTime = 0;
        console.log(sound.file.readyState);

        if (sound.file.readyState === 4 || sound.isLoaded) {
            sound.isLoaded = true;
            sound.file.play();
            console.log("test2");
        }
    }

    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause();
        });
    }

    static stopOne(sound) {
        sound.file.pause();
    }

    static playLoop(sound) {
        if (!sound.isPlaying) {
            sound.file.loop = true;
            sound.file.play();
            sound.isPlaying = true;
        }
    }

    static stopLoop(sound) {
        if (sound.isPlaying) {
            sound.file.pause();
            sound.file.currentTime = 0;
            sound.isPlaying = false;
        }
    }


}