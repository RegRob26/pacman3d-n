  import * as THREE from 'three';
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
  import Stats from 'stats.js';

  import {Escenario} from "../utils/escenario";
  import {camera, actualizarDireccionCamara} from "../utils/camera";
  import {Colisiones} from "../utils/colisiones";
  import {Controlls} from "../utils/controlls";
  import {actualizarContador} from "../utils/htmlElements";


  //TODO Ya se crearon los distintos archivos con las funciones que se necesitan para el juego, ahora hay que organizarlas en clases
  //puesto que esto a lo que veo si es posible, como que escenario sea una clase y que tenga sus propios metodos con las funciones
  //que ya hay en ese archivo, al igual con camara y colisiones, y en el archivo game.ts solo se llamen a los metodos de las clases

  type MazeElement = {
    valor: number;
    objeto: any; // Replace 'any' with the appropriate type for the objects in the maze
  };

  var mazeObject: MazeElement[][] = []; // Define the type for 'maze' as an array of 'MazeElement'


  // Declaracion de variables para mostrar los fps en la pantalla del juego
  //TODO quitar cuando el juego se haya terminado
  const stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)


  var pacman: any
  var puntos: number = 0;
  //const canvas = <HTMLCanvasElement>document.getElementById('miCanvas');
  var scene = new THREE.Scene();

  let renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement)


  //TODO Estos tienen que ser parte de la futura clase escenario
  //TODO Crear una clase para el escenario

  let escenario = new Escenario(mazeObject, scene)
  let maze = escenario.maze

  // Clase colisiones
  let colisiones = new Colisiones()

  //Clase Controles
  let controlls = new Controlls(renderer)


  pacman = escenario.dibujarLaberinto(escenario.maze, mazeObject, scene)

  //TODO Hacer que el escenario agregue lamparas automaticamente en cada esquina y al centro
  escenario.agregarLampara(scene, 0, 20, 0)


  let key: any


  function animate() {

    requestAnimationFrame(animate)
    // Actualiza la posición de la cámara en relación al objeto
    actualizarDireccionCamara(pacman, camera)
    // Hace que la cámara mire al objeto a seguir
    camera.lookAt(pacman.position)
    controlls.onKeyDown(key, pacman, maze)
    puntos = colisiones.detectarColisionPunto(pacman, mazeObject, maze, scene, puntos);
    actualizarContador(puntos)
    renderer.render(scene, camera)

    stats.update()
  }

  animate()
  window.addEventListener('keydown', (event: any) => {
    pacman.userData['direccionAnterior'] = key
    key = event.keyCode
    controlls.onKeyDown(key, pacman, maze)

  })

