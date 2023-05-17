"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controlls = void 0;
const THREE = __importStar(require("three"));
const colisiones_1 = require("./colisiones");
const camera_1 = require("./camera");
const OrbitControls_js_1 = require("three/examples/jsm/controls/OrbitControls.js");
class Controlls {
    constructor(renderer) {
        this.colisiones = new colisiones_1.Colisiones();
        this.cameraC = new camera_1.Camera();
        this.camera = this.cameraC.camera;
        this.crearOrbitControls(renderer);
    }
    crearOrbitControls(renderer) {
        let orbitControls = new OrbitControls_js_1.OrbitControls(this.camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.minDistance = 5;
        orbitControls.maxDistance = 100;
        orbitControls.enablePan = false;
        orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
        orbitControls.update();
        return orbitControls;
    }
    onKeyDown(event, pacman, laberinto) {
        //TODO arreglar los controles porque no detecta cuando no esta viendo hacia el lado en el que inicia, entonces
        // se desorientan los controles y gira para lados poco naturales
        let speed = 0.05;
        let posicionNueva;
        let pacmanRadio = 0.5;
        // Si no hay colisión, procesar la tecla presionada
        switch (event) {
            case 87: // Tecla "w"
                posicionNueva = new THREE.Vector3(Math.round(pacman.position.x + speed + pacmanRadio), pacman.position.y, Math.round(pacman.position.z));
                if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto))
                    return;
                pacman.position.x += speed;
                pacman.userData['direccionActual'] = 87;
                break;
            case 83: // Tecla "s"
                posicionNueva = new THREE.Vector3(Math.round(pacman.position.x - speed - pacmanRadio), pacman.position.y, Math.round(pacman.position.z));
                if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto))
                    return;
                pacman.position.x -= speed;
                pacman.userData['direccionActual'] = 83;
                break;
            case 65: // Tecla "a"
                posicionNueva = new THREE.Vector3(Math.round(pacman.position.x), pacman.position.y, Math.round(pacman.position.z + speed - pacmanRadio));
                if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto))
                    return;
                pacman.userData['direccionActual'] = 65;
                pacman.position.z -= speed;
                break;
            case 68: // Tecla "d"
                posicionNueva = new THREE.Vector3(Math.round(pacman.position.x), pacman.position.y, Math.round(pacman.position.z + speed + pacmanRadio));
                if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto))
                    return;
                pacman.userData['direccionActual'] = 68;
                pacman.position.z += speed;
                break;
        }
    }
}
exports.Controlls = Controlls;
