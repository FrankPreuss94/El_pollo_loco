/**
 * Represents an audio file with its playback settings and state.
 * @class
 */
class MyAudio {
    file;
    isLoaded = false;
    isPlaying = false;

    /**
     * Creates a new audio object.
     * @param {string} _file - Path to the audio file.
     * @param {number} _volume - Default volume of the audio.
     */
    constructor(_file, _volume) {
        this.file = new Audio(_file);
        this.volume = _volume;
        this.file.volume = _volume;
        this.file.preload = "auto";
        this.file.addEventListener("canplaythrough", () => {
            this.isLoaded = true;
        });
    }
}

/**
 * Manages all game sounds and the mute state.
 * @class
 */
export class AudioHub {
    static CHAR_DAMAGE = new MyAudio("assets/audio/character/characterDamage.mp3", 0.4);
    static CHAR_DYING = new MyAudio("assets/audio/character/characterDying.mp3", 0.4);
    static CHAR_RUN = new MyAudio("assets/audio/character/characterRun.mp3", 0.3);
    static CHAR_SLEEP = new MyAudio("assets/audio/character/characterSleep.mp3", 0.4);
    static CHAR_JUMP = new MyAudio("assets/audio/character/characterJump.mp3", 0.4);

    static CHICKEN_DEAD = new MyAudio("assets/audio/chicken/chickenDead.mp3", 0.4);
    static CHICKEN_DEAD2 = new MyAudio("assets/audio/chicken/chickenDead2.mp3", 0.4);

    static COLLECT_BOTTLE = new MyAudio("assets/audio/collectibles/bottleCollectSound.wav", 0.3);
    static COLLECT_COIN = new MyAudio("assets/audio/collectibles/collectSound.wav", 0.2);

    static ENDBOSS_ANGRY = new MyAudio("assets/audio/endboss/chicken-angry.mp3", 0.4);
    static ENDBOSS_DEAD = new MyAudio("assets/audio/endboss/boss_dead.mp3", 0.4);

    static GAME_WON = new MyAudio("assets/audio/game/won.mp3", 0.4);
    static GAME_LOST = new MyAudio("assets/audio/game/lost.mp3", 0.4);
    static GAME_BACKGROUND = new MyAudio("assets/audio/game/background.mp3", 0.17);

    static BOTTLE_THROW = new MyAudio("assets/audio/throwable/throw.mp3", 0.4);
    static BOTTLE_BREAK = new MyAudio("assets/audio/throwable/bottleBreak.mp3", 0.3);

    static muted = false;

    static allSounds = [
        AudioHub.CHAR_DAMAGE,
        AudioHub.CHAR_DYING,
        AudioHub.CHAR_RUN,
        AudioHub.CHAR_SLEEP,
        AudioHub.CHAR_JUMP,

        AudioHub.CHICKEN_DEAD,
        AudioHub.CHICKEN_DEAD2,

        AudioHub.COLLECT_BOTTLE,
        AudioHub.COLLECT_COIN,

        AudioHub.ENDBOSS_ANGRY,
        AudioHub.ENDBOSS_DEAD,

        AudioHub.GAME_WON,
        AudioHub.GAME_LOST,
        AudioHub.GAME_BACKGROUND,

        AudioHub.BOTTLE_THROW,
        AudioHub.BOTTLE_BREAK,
    ];

    /**
     * Plays a sound once.
     * @param {MyAudio} sound - Sound to play.
     */
    static playOne(sound) {
        sound.file.currentTime = 0;
        if (sound.file.readyState > 0 || sound.isLoaded) {
            sound.isLoaded = true;
            sound.file.play();
        }
    }

    /**
     * Stops all game sounds.
     */
    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause();
            sound.isPlaying = false;
        });
    }

    /**
     * Stops a sound.
     * @param {MyAudio} sound - Sound to stop.
     */
    static stopOne(sound) {
        sound.file.pause();
        sound.isPlaying = false;
    }

    /**
     * Starts a sound in a loop.
     * @param {MyAudio} sound - Sound to play in a loop.
     */
    static playLoop(sound) {
        if (!sound.isPlaying) {
            sound.file.loop = true;
            sound.file.play();
            sound.isPlaying = true;
        }
    }

    /**
     * Stops a looping sound and resets its playback position.
     * @param {MyAudio} sound - Sound to stop.
     */
    static stopLoop(sound) {
        if (sound.isPlaying) {
            sound.file.pause();
            sound.file.currentTime = 0;
            sound.isPlaying = false;
        }
    }

    /**
     * Toggles the mute state and saves it to local storage.
     */
    static toggleMute() {
        AudioHub.muted = !AudioHub.muted;
        AudioHub.allSounds.forEach((sound) => {
            sound.file.volume = AudioHub.muted ? 0 : sound.volume;
        });
        localStorage.setItem("muted", AudioHub.muted);
    }

    /**
     * Loads the saved mute state from local storage.
     */
    static loadMuteState() {
        const savedMute = localStorage.getItem("muted");
        if (savedMute === "true") {
            AudioHub.muted = true;
            AudioHub.allSounds.forEach((sound) => {
                sound.file.volume = 0;
            });
        }
    }
}