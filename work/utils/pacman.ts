import {Colisiones} from "./colisiones";
import {Controlls} from "./controlls";
import {Camera} from "./camera";
import {actualizarContador} from "./htmlElements";
import * as THREE from "three";
import {Audio} from "./audio";

export class Pacman{
  private colisiones: any
  controlls : any
  public camaraC : any
  public camera: any
  public pacman : any
  public key : any
  public fantasma : any
  public vidas : number = 3
  public poderUsado : boolean = false
  private sonido : any
  public sumarPuntos : boolean = false
  constructor(pacman : any, key : any, renderer : any) {
    // Clase colisiones
    this.sonido = new Audio()
    this.colisiones = new Colisiones(this.sonido)
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
    //this.camaraC.actualizarDireccionCamara(this.pacman, this.camera)
    // Hace que la cámara mire al objeto a seguir
    let posicion = new THREE.Vector3(15, 0, 10)
    this.camera.lookAt(posicion)
    this.controlls.onKeyDown(this.key, this.pacman, maze)
    puntos = this.colisiones.detectarColisionPunto(this.pacman, mazeObject, maze, scene, puntos)

    let posicionNueva = new THREE.Vector3(Math.round(this.pacman.position.x),
        this.pacman.position.y,
        Math.round(this.pacman.position.z))

    this.fantasma = this.colisiones.detectarColisionFantasma(posicionNueva, fantasmas)
    if(this.fantasma == 3){
      this.vidas--
      return puntos
    }
    else{
      if (this.fantasma == 0 && this.poderUsado == false){
        puntos += 20
        this.poderUsado = true
        this.sumarPuntos = true
        this.sonido.audioComerFantasma.play()
      }
    }
    if (this.colisiones.powerUp == false){
      this.poderUsado = false
    }
    return puntos
  }

  eventoTeclado(maze : any, renderer : any){
    window.addEventListener('keydown', (event: any) => {
      this.pacman.userData['direccionAnterior'] = this.key
      this.key = event.keyCode

      this.controlls.onKeyDown(this.key, this.pacman, maze)
    })


    const controllerGrip0 = renderer.xr.getControllerGrip(0)
    let flag_vr = false
    let controller1;
    controllerGrip0.addEventListener("connected", (e) => {
      //ESta función se ejecuta cuando se conecta un control del vr, en especifico cuando se da click al boton de enter vr
      flag_vr = true
      controllerGrip0.gamepad = e.data.gamepad
      console.log(controllerGrip0.gamepad.buttons)
      this.controlls.onBottonPressed(controllerGrip0.gamepad.buttons, this.pacman, maze);
    })
  }
}
