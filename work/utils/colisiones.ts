import * as THREE from "three";

export class Colisiones{
  constructor() {
  }

  detectarColisionBarrera(pacman: any, maze: any) {
    // Obtener la posición actual del pacman
    const posX = pacman.x;
    const posZ = pacman.z;
    return maze[posZ][posX] === 1
  }

  detectarColisionPunto(pacman: any, mazeObject: any, maze: any, scene: any, puntos: any){
    // Obtener la posición actual del pacman

    const pacmanPosicion = new THREE.Vector3(
      Math.round(pacman.position.x),
      pacman.position.y,
      Math.round(pacman.position.z)
    );


    let arreglo = mazeObject[pacmanPosicion.z][pacmanPosicion.x].objeto
    if (maze[pacmanPosicion.z][pacmanPosicion.x] === 0) {
      console.log("Se logro algo", arreglo)
      maze[pacmanPosicion.z][pacmanPosicion.x] = -1

      scene.remove(mazeObject[pacmanPosicion.z][pacmanPosicion.x].objeto)

      mazeObject[pacmanPosicion.z][pacmanPosicion.x].objeto = -1
      mazeObject[pacmanPosicion.z][pacmanPosicion.x].valor = -1

      puntos++
    }
    return puntos
  }

}
