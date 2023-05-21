import * as THREE from "three";

export class Camera{
  camera : any
  constructor() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth /
      window.innerHeight, 1, 1000);
    this.camera.position.x = 25;
    this.camera.position.y = 20;
    this.camera.position.z = 5;

    this.camera.lookAt(0, 30, 0);
  }
  actualizarDireccionCamara(pacman: any, camera: any) {
    let distancia = 5
    let direccion = pacman.userData['direccionReal']
    /*switch (direccion) {
      case 87: // tecla 'w'
        camera.position.x = pacman.position.x - distancia
        camera.position.y = pacman.position.y + distancia
        camera.position.z = pacman.position.z;
        break
      case 83:
        camera.position.x = pacman.position.x + distancia
        camera.position.y = pacman.position.y + distancia
        camera.position.z = pacman.position.z;
        break
      case 65: // Tecla "a"
        camera.position.x = pacman.position.x
        camera.position.y = pacman.position.y + distancia
        camera.position.z = pacman.position.z + distancia
        break;
      case 68: // Tecla "d"
        camera.position.x = pacman.position.x;
        camera.position.y = pacman.position.y + distancia
        camera.position.z = pacman.position.z - distancia
        break;

    }*/
  }

}
