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
exports.Escenario = void 0;
const THREE = __importStar(require("three"));
class Escenario {
    constructor(mazeObject, scene) {
        this.maze = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }
    dibujarLaberinto(matrix, mazeObject, scene) {
        let labyrinth = [];
        let pacman;
        scene.background = new THREE.Color(0x000000);
        // Recorrer la matriz y dibujar las paredes
        console.log("Dibujando escenario");
        for (let i = 0; i < matrix.length; i++) {
            mazeObject[i] = [];
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1) {
                    const geometry = new THREE.BoxGeometry(1, 1, 1);
                    geometry.computeBoundingBox();
                    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff, roughness: 0.3, metalness: 1 });
                    const wall = new THREE.Mesh(geometry, material);
                    wall.position.x = j;
                    wall.position.z = i;
                    wall.position.y = 0.5;
                    mazeObject[i][j] = {
                        valor: matrix[i][j],
                        objeto: wall
                    };
                    labyrinth.push(wall);
                    scene.add(wall);
                }
                if (matrix[i][j] === 2) {
                    pacman = this.dibujarPacman(scene, j, 0.5, i);
                    mazeObject[i][j] = {
                        valor: matrix[i][j],
                        objeto: pacman
                    };
                }
                if (matrix[i][j] === 0) {
                    const punto = this.dibujarPuntos(scene, j, 0.5, i);
                    mazeObject[i][j] = {
                        valor: matrix[i][j],
                        objeto: punto
                    };
                }
            }
        }
        console.log(scene);
        return pacman;
    }
    agregarLampara(scene, x, y, z) {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);
        scene.add(light);
    }
    dibujarPacman(scene, x, y, z) {
        const cubeGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        //Dame el codigo hexadecimal de un color amarillo
        const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
        let pacman = new THREE.Mesh(cubeGeometry, material);
        pacman.position.x = x;
        pacman.position.z = z;
        pacman.position.y = y;
        pacman.userData['direccionActual'] = 87;
        scene.add(pacman);
        return pacman;
    }
    dibujarPuntos(scene, x, y, z) {
        const esferaGeometria = new THREE.SphereGeometry(0.1, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 1 });
        let punto = new THREE.Mesh(esferaGeometria, material);
        punto.position.x = x;
        punto.position.z = z;
        punto.position.y = y;
        scene.add(punto);
        return punto;
    }
    agregarPared(scene) {
        // Cargar la textura de imagen del fondo
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('../../assets/137910.jpg');
        // Crear la geometría de la caja del fondo
        const geometry = new THREE.BoxGeometry(40, 40, 40);
        // Crear el material del fondo
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide // Esto asegura que el fondo siempre se muestre detrás de los demás objetos
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }
    marcarCentro(scene) {
        const centerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
        const centerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
        centerMesh.position.set(0, 0, 0);
        scene.add(centerMesh);
    }
    mostrarGuias(scene) {
        const axesHelper = new THREE.AxesHelper(20);
        scene.add(axesHelper);
        const gridHelper = new THREE.GridHelper(20, 100);
        gridHelper.position.set(0, 0, 0);
        //gridHelper.rotation.x = -Math.PI / 2;
        scene.add(gridHelper);
    }
}
exports.Escenario = Escenario;
