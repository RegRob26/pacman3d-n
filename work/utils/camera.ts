import * as THREE from "three";

export let camera = new THREE.PerspectiveCamera(45, window.innerWidth /
  window.innerHeight, 1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

export function actualizarDireccionCamara(pacman: any, camera: any) {
  let distancia = 5
  let direccion = pacman.userData['direccionActual']
  switch (direccion) {
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

  }
}
