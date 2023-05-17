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
exports.Camera = void 0;
const THREE = __importStar(require("three"));
class Camera {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth /
            window.innerHeight, 1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 0;
    }
    actualizarDireccionCamara(pacman, camera) {
        let distancia = 5;
        let direccion = pacman.userData['direccionActual'];
        switch (direccion) {
            case 87: // tecla 'w'
                camera.position.x = pacman.position.x - distancia;
                camera.position.y = pacman.position.y + distancia;
                camera.position.z = pacman.position.z;
                break;
            case 83:
                camera.position.x = pacman.position.x + distancia;
                camera.position.y = pacman.position.y + distancia;
                camera.position.z = pacman.position.z;
                break;
            case 65: // Tecla "a"
                camera.position.x = pacman.position.x;
                camera.position.y = pacman.position.y + distancia;
                camera.position.z = pacman.position.z + distancia;
                break;
            case 68: // Tecla "d"
                camera.position.x = pacman.position.x;
                camera.position.y = pacman.position.y + distancia;
                camera.position.z = pacman.position.z - distancia;
                break;
        }
    }
}
exports.Camera = Camera;
