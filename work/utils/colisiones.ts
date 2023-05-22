import * as THREE from "three";

export class Colisiones{
  public powerUp : boolean = false
  private sonido : any
  constructor(sonido : any = null) {
    this.sonido = sonido
  }

  detectarColisionBarrera(pacman: any, maze: any) {
    // Obtener la posición actual del pacman
    const posX = pacman.x;
    const posZ = pacman.z;
    return maze[posX][posZ] === 1
  }

  detectarColisionFantasma(pacman: any, fantasmas: any) {
    // Obtener la posición actual del pacman
    for (let fantasma of fantasmas) {
      console.log(Math.round(fantasma.position.x), Math.round(pacman.x), Math.round(fantasma.position.z), Math.round(pacman.z))
      if (Math.round(fantasma.position.x) === Math.round(pacman.x) &&
          Math.round(fantasma.position.z) === Math.round(pacman.z) &&
          this.powerUp === false) {
        this.sonido.audioMuerte.play()
        this.sonido.audioMuerteFin.loop = true
        //this.sonido.audioMuerteFin.play()
        setInterval(() => {
          this.sonido.audioMuerteFin.stop()
        }, 2000)
        setTimeout(() => {
          this.sonido.audioMuerteFin.play()
        }, 2500)

        return 3
      }
      if (Math.round(fantasma.position.x) === Math.round(pacman.x) &&
          Math.round(fantasma.position.z) === Math.round(pacman.z) &&
          this.powerUp === true) {
        return 0
      }
    }
  }


  detectarColisionPunto(pacman: any, mazeObject: any, maze: any, scene: any, puntos: any){
    // Obtener la posición actual del pacman


    const pacmanPosicion = new THREE.Vector3(
      Math.round(pacman.position.x),
      pacman.position.y,
      Math.round(pacman.position.z)
    );
    let arreglo = mazeObject[pacmanPosicion.x][pacmanPosicion.z].objeto




    if (maze[pacmanPosicion.x][pacmanPosicion.z] === 0) {
      this.sonido.audioComer.play()
      maze[pacmanPosicion.x][pacmanPosicion.z] = -2

      scene.remove(mazeObject[pacmanPosicion.x][pacmanPosicion.z].objeto)

      mazeObject[pacmanPosicion.x][pacmanPosicion.z].valor = -2

      puntos++

    }
    if (maze[pacmanPosicion.x][pacmanPosicion.z] === 3) {
      this.sonido.audioPowerUp.loop = true
      this.sonido.audioPowerUp.play()
        maze[pacmanPosicion.x][pacmanPosicion.z] = -3
        scene.remove(mazeObject[pacmanPosicion.x][pacmanPosicion.z].objeto)
        mazeObject[pacmanPosicion.x][pacmanPosicion.z].valor = -3
        //mazeObject[pacmanPosicion.x][pacmanPosicion.z].objeto = undefined
        puntos += 3
      this.powerUp = true

      //Despues de x segundos se desactiva el powerUp
      setTimeout(() => {
        this.sonido.audioPowerUp.stop()
        this.powerUp = false
      }, 7000);
    }
    return puntos
  }

}
