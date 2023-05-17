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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(require("three"));
const stats_js_1 = __importDefault(require("stats.js"));
const escenario_1 = require("../utils/escenario");
const camera_1 = require("../utils/camera");
const colisiones_1 = require("../utils/colisiones");
const controlls_1 = require("../utils/controlls");
const htmlElements_1 = require("../utils/htmlElements");
var mazeObject = []; // Define the type for 'maze' as an array of 'MazeElement'
// Declaracion de variables para mostrar los fps en la pantalla del juego
//TODO quitar cuando el juego se haya terminado
const stats = new stats_js_1.default();
stats.showPanel(0);
document.body.appendChild(stats.dom);
var pacman;
var puntos = 0;
//const canvas = <HTMLCanvasElement>document.getElementById('miCanvas');
var scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//TODO Estos tienen que ser parte de la futura clase escenario
//TODO Crear una clase para el escenario
let escenario = new escenario_1.Escenario(mazeObject, scene);
let maze = escenario.maze;
// Clase colisiones
let colisiones = new colisiones_1.Colisiones();
//Clase Controles
let controlls = new controlls_1.Controlls(renderer);
pacman = escenario.dibujarLaberinto(escenario.maze, mazeObject, scene);
//TODO Hacer que el escenario agregue lamparas automaticamente en cada esquina y al centro
escenario.agregarLampara(scene, 0, 20, 0);
let key;
function animate() {
    requestAnimationFrame(animate);
    // Actualiza la posición de la cámara en relación al objeto
    (0, camera_1.actualizarDireccionCamara)(pacman, camera_1.camera);
    // Hace que la cámara mire al objeto a seguir
    camera_1.camera.lookAt(pacman.position);
    controlls.onKeyDown(key, pacman, maze);
    puntos = colisiones.detectarColisionPunto(pacman, mazeObject, maze, scene, puntos);
    (0, htmlElements_1.actualizarContador)(puntos);
    renderer.render(scene, camera_1.camera);
    stats.update();
}
animate();
window.addEventListener('keydown', (event) => {
    pacman.userData['direccionAnterior'] = key;
    key = event.keyCode;
    controlls.onKeyDown(key, pacman, maze);
});
