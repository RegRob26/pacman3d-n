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
const htmlElements_1 = require("../utils/htmlElements");
const pacman_1 = require("../utils/pacman");
// Declaracion de variables para mostrar los fps en la pantalla del juego
//TODO quitar cuando el juego se haya terminado
const stats = new stats_js_1.default();
stats.showPanel(0);
document.body.appendChild(stats.dom);
var mazeObject = [];
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
let key;
pacman = escenario.dibujarLaberinto(escenario.maze, mazeObject, scene);
let pacmanC = new pacman_1.Pacman(pacman, key, renderer);
/*
* Creación del escenerio
*/
//TODO Hacer que el escenario agregue lamparas automaticamente en cada esquina y al centro
escenario.agregarLampara(scene, 0, 20, 0);
function animate() {
    requestAnimationFrame(animate);
    puntos = pacmanC.movimientoPacma.n(maze, mazeObject, puntos, scene);
    (0, htmlElements_1.actualizarContador)(puntos);
    renderer.render(scene, pacmanC.camera);
    //TODO retirar al finalizar la actividad
    stats.update();
}
animate();
pacmanC.eventoTeclado(maze);
