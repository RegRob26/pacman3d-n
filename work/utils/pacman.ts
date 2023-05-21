import {Colisiones} from "./colisiones";
import {Controlls} from "./controlls";
import {Camera} from "./camera";
import {actualizarContador} from "./htmlElements";
import * as THREE from "three";

export class Pacman{
  private colisiones: any
  private controlls : any
  public camaraC : any
  public camera: any
  public pacman : any
  public key : any
  private fantasma : any
  constructor(pacman : any, key : any, renderer : any) {
    // Clase colisiones
    this.colisiones = new Colisiones()
    //Clase Controles
    this.controlls = new Controlls(renderer)
    //Clase camara
    this.camaraC = new Camera()
    this.camera = this.camaraC.camera

    this.pacman = pacman
    this.key = key

  }

  movimientoPacman(maze : any, mazeObject : any, puntos : any, fantasmas : any, scene : any){
    // Actualiza la posición de la cámara en relación al objeto
    this.camaraC.actualizarDireccionCamara(this.pacman, this.camera)
    // Hace que la cámara mire al objeto a seguir
    this.camera.lookAt(this.pacman.position)
    this.controlls.onKeyDown(this.key, this.pacman, maze)
    puntos = this.colisiones.detectarColisionPunto(this.pacman, mazeObject, maze, scene, puntos)

    let posicionNueva = new THREE.Vector3(Math.round(this.pacman.position.x),
        this.pacman.position.y,
        Math.round(this.pacman.position.z))
    this.fantasma = this.colisiones.detectarColisionFantasma(posicionNueva, fantasmas)
    if(this.fantasma){
      return -3
    }
    return puntos
  }

  eventoTeclado(maze : any){
    window.addEventListener('keydown', (event: any) => {
      this.pacman.userData['direccionAnterior'] = this.key
      this.key = event.keyCode

      this.controlls.onKeyDown(this.key, this.pacman, maze)
    })
  }
}
