"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pacman = void 0;
const colisiones_1 = require("./colisiones");
const controlls_1 = require("./controlls");
const camera_1 = require("./camera");
class Pacman {
    constructor(pacman, key, renderer) {
        // Clase colisiones
        this.colisiones = new colisiones_1.Colisiones();
        //Clase Controles
        this.controlls = new controlls_1.Controlls(renderer);
        //Clase camara
        this.camaraC = new camera_1.Camera();
        this.camera = this.camaraC.camera;
        this.pacman = pacman;
        this.key = key;
    }
    movimientoPacman(maze, mazeObject, puntos, scene) {
        // Actualiza la posición de la cámara en relación al objeto
        console.log(this.pacman, this.camera);
        this.camaraC.actualizarDireccionCamara(this.pacman, this.camera);
        // Hace que la cámara mire al objeto a seguir
        this.camera.lookAt(this.pacman.position);
        this.controlls.onKeyDown(this.key, this.pacman, maze);
        puntos = this.colisiones.detectarColisionPunto(this.pacman, mazeObject, maze, scene, puntos);
        return puntos;
    }
    eventoTeclado(maze) {
        window.addEventListener('keydown', (event) => {
            this.pacman.userData['direccionAnterior'] = this.key;
            this.key = event.keyCode;
            this.controlls.onKeyDown(this.key, this.pacman, maze);
        });
    }
}
exports.Pacman = Pacman;
