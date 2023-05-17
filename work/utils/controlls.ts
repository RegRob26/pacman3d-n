import * as THREE from "three";
import {Colisiones} from "./colisiones";
import {camera} from "./camera";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export class Controlls{
  private colisiones : any
  constructor(renderer : any) {
    this.colisiones = new Colisiones()
    this.crearOrbitControls(renderer)
  }

  crearOrbitControls(renderer : any){
    let orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.enableDamping = true
    orbitControls.minDistance = 5
    orbitControls.maxDistance = 100
    orbitControls.enablePan = false
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05
    orbitControls.update()


    return orbitControls
  }


  onKeyDown(event: any, pacman: any, laberinto: any) {
    //TODO arreglar los controles porque no detecta cuando no esta viendo hacia el lado en el que inicia, entonces
    // se desorientan los controles y gira para lados poco naturales
    let speed = 0.05;
    let posicionNueva;
    let pacmanRadio = 0.5
    // Si no hay colisión, procesar la tecla presionada
    switch (event) {

      case 87: // Tecla "w"
        posicionNueva = new THREE.Vector3(Math.round(pacman.position.x + speed + pacmanRadio),
          pacman.position.y,
          Math.round(pacman.position.z))
        if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto)) return;
        pacman.position.x += speed;
        pacman.userData['direccionActual'] = 87
        break

      case 83: // Tecla "s"
        posicionNueva = new THREE.Vector3(Math.round(pacman.position.x - speed - pacmanRadio),
          pacman.position.y,
          Math.round(pacman.position.z))
        if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto)) return;

        pacman.position.x -= speed;
        pacman.userData['direccionActual'] = 83
        break;

      case 65: // Tecla "a"

        posicionNueva = new THREE.Vector3(Math.round(pacman.position.x),
          pacman.position.y,
          Math.round(pacman.position.z + speed - pacmanRadio))
        if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto)) return;

        pacman.userData['direccionActual'] = 65
        pacman.position.z -= speed;
        break;

      case 68: // Tecla "d"

        posicionNueva = new THREE.Vector3(Math.round(pacman.position.x),
          pacman.position.y,
          Math.round(pacman.position.z + speed + pacmanRadio))
        if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto)) return;

        pacman.userData['direccionActual'] = 68
        pacman.position.z += speed;
        break;

    }
  }
}
