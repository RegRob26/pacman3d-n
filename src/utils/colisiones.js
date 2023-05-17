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
exports.Colisiones = void 0;
const THREE = __importStar(require("three"));
class Colisiones {
    constructor() {
    }
    detectarColisionBarrera(pacman, maze) {
        // Obtener la posición actual del pacman
        const posX = pacman.x;
        const posZ = pacman.z;
        return maze[posZ][posX] === 1;
    }
    detectarColisionPunto(pacman, mazeObject, maze, scene, puntos) {
        // Obtener la posición actual del pacman
        const pacmanPosicion = new THREE.Vector3(Math.round(pacman.position.x), pacman.position.y, Math.round(pacman.position.z));
        let arreglo = mazeObject[pacmanPosicion.z][pacmanPosicion.x].objeto;
        if (maze[pacmanPosicion.z][pacmanPosicion.x] === 0) {
            console.log("Se logro algo", arreglo);
            maze[pacmanPosicion.z][pacmanPosicion.x] = -1;
            scene.remove(mazeObject[pacmanPosicion.z][pacmanPosicion.x].objeto);
            mazeObject[pacmanPosicion.z][pacmanPosicion.x].objeto = -1;
            mazeObject[pacmanPosicion.z][pacmanPosicion.x].valor = -1;
            puntos++;
        }
        return puntos;
    }
}
exports.Colisiones = Colisiones;
