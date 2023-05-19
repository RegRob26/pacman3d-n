import * as THREE from "three";

export class Colisiones{
  constructor() {
  }

  detectarColisionBarrera(pacman: any, maze: any) {
    // Obtener la posición actual del pacman
    const posX = pacman.x;
    const posZ = pacman.z;
    return maze[posX][posZ] === 1
  }

  detectarColisionFantasma(pacman: any, maze: any) {
    // Obtener la posición actual del pacman
    const posX = pacman.x;
    const posZ = pacman.z;
    return maze[posX][posZ] === 3
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
      maze[pacmanPosicion.x][pacmanPosicion.z] = -1

      scene.remove(mazeObject[pacmanPosicion.x][pacmanPosicion.z].objeto)

      mazeObject[pacmanPosicion.x][pacmanPosicion.z].objeto = -1
      mazeObject[pacmanPosicion.x][pacmanPosicion.z].valor = -1

      puntos++
    }
    return puntos
  }

}
