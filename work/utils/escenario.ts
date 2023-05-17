import * as THREE from "three";

export class Escenario {
  maze: number[][]

  constructor( mazeObject : any, scene : any) {
    this.maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

  }

  dibujarLaberinto(matrix: any, mazeObject: any, scene: any) {
    let labyrinth = []
    let pacman
    // Recorrer la matriz y dibujar las paredes
    console.log("Dibujando escenario")
    for (let i = 0; i < matrix.length; i++) {
      mazeObject[i] = []
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1) {
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          geometry.computeBoundingBox();

          const material = new THREE.MeshStandardMaterial({color: 0x0000ff, roughness: 0.3, metalness: 1});
          const wall = new THREE.Mesh(geometry, material);

          wall.position.x = j;
          wall.position.z = i;
          wall.position.y = 0.5

          mazeObject[i][j] = {
            valor: matrix[i][j],
            objeto: wall
          };
          labyrinth.push(wall)
          scene.add(wall)
        }
        if (matrix[i][j] === 2) {
          pacman = this.dibujarPacman(scene, j, 0.5, i)
          mazeObject[i][j] = {
            valor: matrix[i][j],
            objeto: pacman
          };
        }
        if (matrix[i][j] === 0) {
          const punto = this.dibujarPuntos(scene, j, 0.5, i)
          mazeObject[i][j] = {
            valor: matrix[i][j],
            objeto: punto
          };

        }
      }
    }
    console.log(scene)
    return pacman
  }


  agregarLampara(scene: any, x: any, y: any, z: any) {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
  }

  private dibujarPacman(scene: any, x: any, y: any, z: any) {
    const cubeGeometry = new THREE.SphereGeometry(0.25, 32, 32);

    //Dame el codigo hexadecimal de un color amarillo

    const material = new THREE.MeshLambertMaterial({color: 0xffff00});
    let pacman = new THREE.Mesh(cubeGeometry, material);

    pacman.position.x = x
    pacman.position.z = z
    pacman.position.y = y

    pacman.userData['direccionActual'] = 87

    scene.add(pacman);
    return pacman
  }

  private dibujarPuntos(scene: any, x: any, y: any, z: any) {
    const esferaGeometria = new THREE.SphereGeometry(0.1, 64, 64)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.3, metalness: 1});
    let punto = new THREE.Mesh(esferaGeometria, material);

    punto.position.x = x
    punto.position.z = z
    punto.position.y = y

    scene.add(punto);
    return punto
  }

  agregarPared(scene: any) {
    // Cargar la textura de imagen del fondo
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../../assets/137910.jpg');
// Crear la geometría de la caja del fondo
    const geometry = new THREE.BoxGeometry(40, 40, 40);

// Crear el material del fondo
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide // Esto asegura que el fondo siempre se muestre detrás de los demás objetos
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)
  }

  marcarCentro(scene: any) {
    const centerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const centerMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
    const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
    centerMesh.position.set(0, 0, 0);
    scene.add(centerMesh);
  }

  mostrarGuias(scene: any) {
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(20, 100);
    gridHelper.position.set(0, 0, 0);
    //gridHelper.rotation.x = -Math.PI / 2;
    scene.add(gridHelper);
  }
}

