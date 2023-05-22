import * as THREE from "three";
import {Colisiones} from "./colisiones";
import {Camera} from "./camera";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {finNivelMensaje} from "./htmlElements";

export class Controlls{
  private colisiones : any
  private cameraC : any
  private camera : any
  private combinaciones : any
  private combinacionActual : any
  private eventoTecla : boolean = false
  public teclaPresionada : any
  public contadorTecla : any = 0
  constructor(renderer : any) {
    this.colisiones = new Colisiones()
    this.cameraC = new Camera()
    this.camera = this.cameraC.camera
    this.crearOrbitControls(renderer)

    this.combinaciones = [
        {87: 87, 83: 83, 65: 65, 68: 68},
        {87: 68, 83: 65, 65: 87, 68: 83},
        {87: 83, 83: 87, 65: 68, 68: 65},
        {87: 65, 83: 68, 65: 83, 68: 87}
    ]
  }

  crearOrbitControls(renderer : any){
    let orbitControls = new OrbitControls(this.camera, renderer.domElement)
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
    let speed = 0.075;
    let posicionNueva;
    let pacmanRadio = 0.5
      switch (event) {
      case 87: // Tecla "w"
        posicionNueva = new THREE.Vector3(Math.round(pacman.position.x - speed - pacmanRadio),
          pacman.position.y,
          Math.round(pacman.position.z))

        if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto)) return;

        pacman.position.x -= speed;
        pacman.userData['direccionReal'] = 87
        pacman.userData['direccionActual'] = event
        break

      case 83: // Tecla "s"
        posicionNueva = new THREE.Vector3(Math.round(pacman.position.x + speed + pacmanRadio),
          pacman.position.y,
          Math.round(pacman.position.z))

        if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto)) return;

        pacman.position.x += speed;
        pacman.userData['direccionReal'] = 83
        pacman.userData['direccionActual'] = event
        break;

      case 65: // Tecla "a"

        posicionNueva = new THREE.Vector3(Math.round(pacman.position.x),
          pacman.position.y,
          Math.round(pacman.position.z + speed + pacmanRadio))

        if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto)) return;

        pacman.userData['direccionReal'] = 65
        pacman.userData['direccionActual'] = event
        pacman.position.z += speed;
        break;

      case 68: // Tecla "d"

        posicionNueva = new THREE.Vector3(Math.round(pacman.position.x),
          pacman.position.y,
          Math.round(pacman.position.z + speed - pacmanRadio))

        if (this.colisiones.detectarColisionBarrera(posicionNueva, laberinto)) return;

        pacman.userData['direccionReal'] = 68
        pacman.userData['direccionActual'] = event
        pacman.position.z -= speed;
        break;

    }
  }
}
