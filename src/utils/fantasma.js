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
exports.Fantasma = void 0;
const THREE = __importStar(require("three"));
class Fantasma {
    constructor(scene, x, y, z) {
        this.fantasma = this.dibujarFantasma(scene, x, y, z);
    }
    dibujarFantasma(scene, x, y, z) {
        const cubeGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        //Dame el codigo hexadecimal de un color amarillo
        const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        let fantasma = new THREE.Mesh(cubeGeometry, material);
        fantasma.position.x = x;
        fantasma.position.z = z;
        fantasma.position.y = y;
        fantasma.userData['direccionActual'] = 87;
        scene.add(fantasma);
        return fantasma;
    }
}
exports.Fantasma = Fantasma;
