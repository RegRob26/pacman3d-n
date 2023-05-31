import * as THREE from "three";

export class Camera{
  camera : any
  constructor() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth /
      window.innerHeight, 0.1, 1000);
    this.camera.position.x = 35;
    this.camera.position.y = 30;
    this.camera.position.z = 10;
  }
  actualizarDireccionCamara(pacman: any, camera: any) {
    let distancia = 5
    let direccion = pacman.userData['direccionReal']

  }

}
