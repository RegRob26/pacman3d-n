  import * as THREE from 'three';
  import Stats from 'three/examples/jsm/libs/stats.module.js'
  import {Escenario} from "../utils/escenario";
  import {actualizarContador, dibujaVida, finNivelMensaje, gameOver, mensajeVidaPerdida} from "../utils/htmlElements";
  import {Pacman} from "../utils/pacman";
  import {Fantasma} from "../utils/fantasma";
  import {Audio} from "../utils/audio";


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
    let fantasmaR = new Fantasma(scene, 13, 0.5, 12)
    let fantasmaP = new Fantasma(scene, 13, 0.5, 13)

  let fantasmas = [fantasmaR.fantasma, fantasmaP.fantasma]
  let int1
  let int2
  let puntos_pacman = 0
  let contador_niveles = 0
  function animate() {

    let reconfigurar;
    if (puntos < total_puntos) {
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
          fantasmaR = new Fantasma(scene, 13, 0.5, 12)
          fantasmaP = new Fantasma(scene, 13, 0.5, 13)
          fantasmas = [fantasmaR.fantasma, fantasmaP.fantasma]
          //escenario.dibujarLaberinto(escenario.maze, mazeObject, true, scene)
          pacman.position.set(27, 0.5, 13)
          puntos = puntosTotal + puntos
        }
      }

      puntos = pacmanC.movimientoPacman(maze, mazeObject, puntos, fantasmas, scene)
      actualizarContador(puntosTotal + puntos)
    } else {
      console.log("fin del juego")
      if (contador_niveles < 2) {
        fantasmaR.hardMode = true
        fantasmaP.hardMode = true
        finNivelMensaje(false)
        setTimeout(finNivelMensaje, 1000, true)
        contador_niveles++

        reconfigurar = () => {
          clearInterval(fantasmaP.timeInterval)
          clearInterval(fantasmaR.timeInterval)
          scene.remove(fantasmaP.fantasma)
          scene.remove(fantasmaR.fantasma)
          fantasmaR = new Fantasma(scene, 13, 0.5, 12)
          fantasmaP = new Fantasma(scene, 13, 0.5, 13)
          fantasmas = [fantasmaR.fantasma, fantasmaP.fantasma]
          escenario.dibujarLaberinto(escenario.maze, mazeObject, true, scene)
          pacman.position.set(27, 0.5, 13)
          puntosTotal = puntosTotal + puntos
          puntos = 0
        }
        reconfigurar()
      } else {
        finNivelMensaje(false)
        return;
      }
    }
    requestAnimationFrame(animate)
    renderer.render(scene, pacmanC.camera)

    //TODO retirar al finalizar la actividad
    stats.update()
  }

  function configurarJuego(time1 : any, time2 : any, time3 : any, reinicio : any, hardMode : any){
      int1 = setInterval(moveGhostEvery10Seconds, time1, time1, hardMode, reinicio);
      int2 = setInterval(moverFantasma,  time2, time2, hardMode, reinicio);
  }

  configurarJuego(250, 300, 100, false, false)


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
  pacmanC.eventoTeclado(maze)

