import * as THREE from "three";

export class Fantasma{
  public fantasma : any
  constructor(scene : any, x : any, y : any, z : any) {
    this.fantasma = this.dibujarFantasma(scene, x, y, z)
  }

  dibujarFantasma(scene : any, x : number, y : number, z : number){
    const cubeGeometry = new THREE.SphereGeometry(0.25, 32, 32);

    //Dame el codigo hexadecimal de un color amarillo

    const material = new THREE.MeshLambertMaterial({color: 0xff0000});
    let fantasma = new THREE.Mesh(cubeGeometry, material);

    fantasma.position.x = x
    fantasma.position.z = z
    fantasma.position.y = y

    fantasma.userData['direccionActual'] = 87

    scene.add(fantasma);
    return fantasma
  }
}
