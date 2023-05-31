import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {Escenario} from "../utils/escenario";
import {actualizarContador, dibujaVida, finNivelMensaje, gameOver, mensajeVidaPerdida} from "../utils/htmlElements";
import {Pacman} from "../utils/pacman";
import {Fantasma} from "../utils/fantasma";
import {Audio} from "../utils/audio";
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js';

// Declaracion de variables para mostrar los fps en la pantalla del juego
//TODO quitar cuando el juego se haya terminado

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)
let puntosTotal : number = 0





/*
Zona de declaración de variables e instanciación de clases
 */
type MazeElement = {
  valor: number;
  objeto: any;
};
var mazeObject: MazeElement[][] = [];

var pacman: any
var puntos: number = 0;
var scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)



// Crear una escena de realidad virtual





//TODO Estos tienen que ser parte de la futura clase escenario
//TODO Crear una clase para el escenario

let escenario = new Escenario(mazeObject, scene)
let maze = escenario.maze
let total_puntos = escenario.total_puntos

let key: any

pacman = escenario.dibujarLaberinto(escenario.maze, mazeObject, false, scene)
let pacmanC = new Pacman(pacman, key, renderer)

let audio = new Audio()

/*
* Creación del escenerio
*/
//TODO Hacer que el escenario agregue lamparas automaticamente en cada esquina y al centro
escenario.agregarLampara(scene, 0, 20, 0)


/*
 * Instancia de clase fantasma
 */
let fantasmaR = new Fantasma(scene, 13, 0.5, 12, 0xff0000)
let fantasmaP = new Fantasma(scene, 13, 0.5, 13, 0xff00ff)

let fantasmas = [fantasmaR.fantasma, fantasmaP.fantasma]
let int1
let int2
let puntos_pacman = 0
let contador_niveles = 0


/**
 * Más pruebas de VR
 */


/**
 * Zona de prueba para vr
 */
scene.add( new THREE.HemisphereLight( 0xbcbcbc, 0xa5a5a5 ) );

renderer.xr.enabled = true;
renderer.shadowMap.enabled = true

let flag_realidad_virtual = false
const vrButton = VRButton.createButton( renderer );
document.body.appendChild( vrButton );
vrButton.addEventListener( 'click', function () {
  console.log("Boton de vr presionado")
  flag_realidad_virtual = true
})


let controller1 = renderer.xr.getController( 0 );
scene.add( controller1 );

let controller2 = renderer.xr.getController( 1 );
scene.add( controller2 );

const controllerModelFactory = new XRControllerModelFactory();
const handModelFactory = new XRHandModelFactory();

// Hand 1
let controllerGrip1 = renderer.xr.getControllerGrip( 0 );
controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
scene.add( controllerGrip1 );

let hand1 = renderer.xr.getHand( 0 );
hand1.add( handModelFactory.createHandModel( hand1 ) );
console.log("Mostrar mano 1", hand1)
scene.add( hand1 );

// Hand 2
let controllerGrip2 = renderer.xr.getControllerGrip( 1 );
controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
scene.add( controllerGrip2 );

let hand2 = renderer.xr.getHand( 1 );
hand2.add( handModelFactory.createHandModel( hand2 ) );
scene.add( hand2 );
//
const geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

const line = new THREE.Line( geometry );
line.name = 'line';
line.scale.z = 5;

controller1.add( line.clone() );
controller2.add( line.clone() );

function animate() {

  let reconfigurar;
  if (puntos < total_puntos) {
    //console.log(total_puntos)
    if (pacmanC.fantasma == 3) {
      dibujaVida(pacmanC.vidas)
      if (pacmanC.vidas == 0) {
        gameOver()

        let setInt = setInterval(() => {
          window.history.back()
        }, 5000)

        return
      } else {
        mensajeVidaPerdida(false)
        setInterval(mensajeVidaPerdida, 3000, true)


        clearInterval(fantasmaP.timeInterval)
        clearInterval(fantasmaR.timeInterval)
        scene.remove(fantasmaP.fantasma)
        scene.remove(fantasmaR.fantasma)
        fantasmaR = new Fantasma(scene, 13, 0.5, 12, 0xff0000)
        fantasmaP = new Fantasma(scene, 13, 0.5, 13, 0xff00ff)
        fantasmas = [fantasmaR.fantasma, fantasmaP.fantasma]
        //escenario.dibujarLaberinto(escenario.maze, mazeObject, true, scene)
        pacman.position.set(27, 0.5, 13)
        puntos = puntos
      }
    }

    puntos = pacmanC.movimientoPacman(maze, mazeObject, puntos, fantasmas, scene)
    actualizarContador(puntosTotal + puntos)

    if (pacmanC.poderUsado == true && pacmanC.sumarPuntos == true) {
      total_puntos += 20
      pacmanC.sumarPuntos = false
    }

  } else {
    if (contador_niveles < 2) {

      finNivelMensaje(false)
      setTimeout(finNivelMensaje, 1000, true)
      contador_niveles++

      reconfigurar = () => {
        clearInterval(fantasmaP.timeInterval)
        clearInterval(fantasmaR.timeInterval)
        scene.remove(fantasmaP.fantasma)
        scene.remove(fantasmaR.fantasma)
        fantasmaR = new Fantasma(scene, 13, 0.5, 12, 0xff0000)
        fantasmaP = new Fantasma(scene, 13, 0.5, 13, 0xff00ff)
        fantasmaR.hardMode = true
        fantasmaP.hardMode = true
        fantasmas = [fantasmaR.fantasma, fantasmaP.fantasma]
        escenario.dibujarLaberinto(escenario.maze, mazeObject, true, scene)
        pacman.position.set(27, 0.5, 13)
        pacmanC.controlls.speed = 0.085
        puntosTotal = puntosTotal + puntos
        puntos = 0
      }
      reconfigurar()
    } else {
      finNivelMensaje(false)

      let setInt = setInterval(() => {
        window.history.back()
      }, 5000)
      return;
    }
  }
  if (flag_realidad_virtual) {
    console.log(controllerGrip1.gamepad.buttons)
    pacmanC.controlls.onBottonPressed(controllerGrip1.gamepad.buttons, pacman, maze, true)
    console.log(controllerGrip2.gamepad.buttons)
    pacmanC.controlls.onBottonPressed(controllerGrip2.gamepad.buttons, pacman, maze, false)
  }



  renderer.setAnimationLoop(animate); // where "animate" is your render/animate function

  renderer.render(scene, pacmanC.camera)

  //TODO retirar al finalizar la actividad
  stats.update()
}





function configurarJuego(time1 : any, time2 : any, time3 : any, reinicio : any, hardMode : any){
  int1 = setInterval(moveGhostEvery10Seconds, time1, time1, hardMode, reinicio);
  int2 = setInterval(moverFantasma,  time2, time2, hardMode, reinicio);
}

configurarJuego(300, 350, 100, false, false)


function moveGhostEvery10Seconds(t : any, reset : any, hardMode : any) {
  fantasmaR.movimientoFantasma(pacmanC, maze, t, hardMode, reset);
}
function moverFantasma(t : any, reset : any, hardMode : any){
  fantasmaP.movimientoFantasma(pacmanC, maze, t, hardMode, reset )
}

// Función para mover el fantasma cada 10 segundos


// Ejecutar la función de movimiento del fantasma cada 10 segundos
dibujaVida(pacmanC.vidas)



animate()
pacmanC.eventoTeclado(maze, renderer)

