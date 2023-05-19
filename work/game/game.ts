  import * as THREE from 'three';
  import Stats from 'three/examples/jsm/libs/stats.module.js'
  import {Escenario} from "../utils/escenario";
  import {actualizarContador, finNivelMensaje, gameOver} from "../utils/htmlElements";
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
  let total_puntos = escenario.total_puntos

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
    let fantasmaC = new Fantasma(scene, 2, 0.5, 1)


  //Prueba de hilos

  let worker = new Worker('/work/utils/fantasma.ts')
  function animate() {

    if (puntos < total_puntos && puntos != -3) {
      requestAnimationFrame(animate)

      puntos = pacmanC.movimientoPacman(maze, mazeObject, puntos, scene)
      actualizarContador(puntos)
      console.log(maze)
        //TODO hacer que el fantasma se mueva en un hilo aparte

      //fantasmaC.movimientoFantasma(pacman, maze, 10000)

      renderer.render(scene, pacmanC.camera)
    }
    else{
      if (puntos == -3){
        gameOver()
        return
      }else {
        finNivelMensaje()

      }
    }


    //TODO retirar al finalizar la actividad
    stats.update()
  }
  setInterval(moveGhostEvery10Seconds, 1000);

  function moveGhostEvery10Seconds() {
    fantasmaC.movimientoFantasma(pacman, maze, 1000);
  }
  // Función para mover el fantasma cada 10 segundos


  // Ejecutar la función de movimiento del fantasma cada 10 segundos

  animate()
  pacmanC.eventoTeclado(maze)

