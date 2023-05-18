  import * as THREE from 'three';
  import Stats from 'stats.js';
  import {Escenario} from "../utils/escenario";
  import {actualizarContador} from "../utils/htmlElements";
  import {Pacman} from "../utils/pacman";
  import {Fantasma} from "../utils/fantasma";


  // Declaracion de variables para mostrar los fps en la pantalla del juego
  //TODO quitar cuando el juego se haya terminado

  const stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)

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


  //TODO Estos tienen que ser parte de la futura clase escenario
  //TODO Crear una clase para el escenario

  let escenario = new Escenario(mazeObject, scene)
  let maze = escenario.maze
  let key: any

  pacman = escenario.dibujarLaberinto(escenario.maze, mazeObject, scene)
  let pacmanC = new Pacman(pacman, key, renderer)

  /*
  * Creación del escenerio
  */
  //TODO Hacer que el escenario agregue lamparas automaticamente en cada esquina y al centro
  escenario.agregarLampara(scene, 0, 20, 0)


  /*
   * Instancia de clase fantasma
   */
    let fantasmaC = new Fantasma(scene, 8, 0.5, 4)

  function animate() {
    requestAnimationFrame(animate)

    puntos = pacmanC.movimientoPacman(maze, mazeObject, puntos, scene)
    actualizarContador(puntos)


    renderer.render(scene, pacmanC.camera)

    //TODO retirar al finalizar la actividad
    stats.update()
  }

  animate()
  pacmanC.eventoTeclado(maze)

