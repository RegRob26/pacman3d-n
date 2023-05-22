import * as THREE from "three";

export class Camera{
  camera : any
  constructor() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth /
      window.innerHeight, 1, 1000);
    this.camera.position.x = 50;
    this.camera.position.y = 35;
    this.camera.position.z = 10;


    //this.camera.lookAt(0, 30, 0);
  }
  actualizarDireccionCamara(pacman: any, camera: any) {
    let distancia = 5
    let direccion = pacman.userData['direccionReal']

  }

}
