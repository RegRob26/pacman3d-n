import * as THREE from "three";


export class Audio {
    audioComer: THREE.Audio;
    audioMuerte: THREE.Audio;
    audioInicio: THREE.Audio;
    audioPowerUp: THREE.Audio;
    audioMunch: THREE.Audio;
    audioMuerteFin : THREE.Audio
    audioComerFantasma : THREE.Audio
    audioInicioMusica : THREE.Audio

    constructor() {
        const listener = new THREE.AudioListener();

        this.audioComer = new THREE.Audio(listener);
        this.audioMuerte = new THREE.Audio(listener);
        this.audioInicio = new THREE.Audio(listener);
        this.audioPowerUp = new THREE.Audio(listener);
        this.audioMunch = new THREE.Audio(listener);
        this.audioMuerteFin = new THREE.Audio(listener);
        this.audioComerFantasma = new THREE.Audio(listener);
        this.audioInicioMusica = new THREE.Audio(listener);

        const audioLoader = new THREE.AudioLoader();

        audioLoader.load('work/assets/sound/credit.wav', (buffer) => {
            this.audioComer.setBuffer(buffer);
        });
        audioLoader.load('work/assets/sound/death_1.wav', (buffer) => {
            this.audioMuerte.setBuffer(buffer);
        });
        audioLoader.load('work/assets/sound/power_pellet.wav', (buffer) => {
            this.audioPowerUp.setBuffer(buffer);
        });
        audioLoader.load('work/assets/sound/munch_1.wav', (buffer) => {
            this.audioMunch.setBuffer(buffer);
        });
        audioLoader.load('work/assets/sound/death_2.wav', (buffer) => {
            this.audioMuerteFin.setBuffer(buffer);
        });
        audioLoader.load('work/assets/sound/eat_ghost.wav', (buffer) => {
            this.audioComerFantasma.setBuffer(buffer);
        });
        audioLoader.load('work/assets/sound/pacman_start.mp3', (buffer) => {
            this.audioInicioMusica.setBuffer(buffer);
            this.audioInicioMusica.play()
        });
    }
}
