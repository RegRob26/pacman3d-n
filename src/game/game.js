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
//TODO Ya se crearon los distintos archivos con las funciones que se necesitan para el juego, ahora hay que organizarlas en clases
//puesto que esto a lo que veo si es posible, como que escenario sea una clase y que tenga sus propios metodos con las funciones
//que ya hay en ese archivo, al igual con camara y colisiones, y en el archivo game.ts solo se llamen a los metodos de las clases
console.log("Ejecutando el juego");
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
scene.background = new THREE.Color(0x000000);
//TODO Estos tienen que ser parte de la futura clase escenario
(0, escenario_1.agregarLampara)(scene, -30, 30, -10);
(0, escenario_1.agregarLampara)(scene, 0, 30, 10);
(0, escenario_1.agregarLampara)(scene, 0, 30, 0);
(0, escenario_1.agregarLampara)(scene, 0, 0, 0);
(0, escenario_1.agregarLampara)(scene, 30, 30, 30);
// Crear una luz ambiental
var ambientLight = new THREE.AmbientLight(0xffffff); // Color blanco
// Agregar la luz ambiental a la escena
//scene.add(ambientLight);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//Zona de funciones que ayudan a orientarse en la creacion del escenario
//mostrarGuias(scene)
//marcarCentro(scene)
//agregarPared(scene)
pacman = (0, escenario_1.dibujarLaberinto)(escenario_1.maze, mazeObject, scene, pacman);
console.log("ESTE ES EL INCHE OBJETO DE PACMAN: ", pacman);
let orbitControls = (0, controlls_1.crearOrbitControls)(renderer);
let key;
function animate() {
    requestAnimationFrame(animate);
    // Actualiza la posición de la cámara en relación al objeto
    (0, camera_1.actualizarDireccionCamara)(pacman, camera_1.camera);
    // Hace que la cámara mire al objeto a seguir
    camera_1.camera.lookAt(pacman.position);
    (0, controlls_1.onKeyDown)(key, pacman, escenario_1.maze);
    puntos = (0, colisiones_1.detectarColisionPunto)(pacman, mazeObject, escenario_1.maze, scene, puntos);
    (0, htmlElements_1.actualizarContador)(puntos);
    renderer.render(scene, camera_1.camera);
    stats.update();
}
animate();
window.addEventListener('keydown', (event) => {
    pacman.userData['direccionAnterior'] = key;
    key = event.keyCode;
    (0, controlls_1.onKeyDown)(key, pacman, escenario_1.maze);
});
