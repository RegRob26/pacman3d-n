import * as THREE from "three"
import {loadConfigFromFile} from "vite";


type celda = {
  padre: string,
  F : number,
  G : number,
  H : number,
  ID : string,
  i : number,
  j : number
};
export class Fantasma{
  public fantasma : any;
  private laberintoModificado : any
  private matrizOriginal : any
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

  modificarLaberinto(){
    let modificado: celda[][] = [];
    // Recorrer la matriz y dibujar las paredes
    for (let i = 0; i < this.matrizOriginal.length; i++) {
      modificado[i] = []
      for (let j = 0; j < this.matrizOriginal[i].length; j++) {
        modificado[i][j] ={
          i: i, j: j,
          F: null, G: null, H: null, ID: i + '_' + j, padre: ""
        }
      }
    }
    this.laberintoModificado = modificado
  }

  movimientoFantasma(posFinal : any, matrix : any){
    this.matrizOriginal = matrix
    this.modificarLaberinto()

    let x_pacman = posFinal.position.x
    let z_pacman = posFinal.position.z
    let x_fantasma = Math.round(this.fantasma.position.x)
    let z_fantasma = Math.round(this.fantasma.position.z)

    this.astarPrueba(x_fantasma, z_fantasma, x_pacman, z_pacman, matrix)
  }

  astarPrueba(inicial_x : any, inicial_z : any,  final_x : any, final_y : any, matrix : any){
    let listaAbierta = []
    let listaCerrada = []

    //Al inico no tenemos ninguna valor en la lista abierta por lo que el k_valor pasa a la lista cerrada automaticamente
    let k_valor = this.laberintoModificado[inicial_x][inicial_z]
    //console.log(k_valor)
    listaCerrada.push(k_valor)

    //Inicio del algoritmo

    let actual = k_valor
    // Coordenadas relativas de los vecinos
    const coordenadasRelativas = [[-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1], [1, 0], [0, -1], [0, 1]];


    //Deteccion de vecinos
    for (const [dx, dy] of coordenadasRelativas) {
      const newCol = actual.j + dx;
      const newRow = actual.i + dy;

      // Verificar si las coordenadas están dentro de los límites de la matriz
      //console.log(newRow, newCol)
      if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length && matrix[newRow][newCol] !== 1 && matrix[newRow][newCol] !==2) {
        listaAbierta.push(this.laberintoModificado[newRow][newCol]);
      }
    }

    //Calculo de G Y H
    for (let vecino of listaAbierta){
      if (vecino.F === null){
        let resultado = Math.abs(actual.i - vecino.i  +  actual.j - vecino.j)
        vecino.F = resultado
      }
    }
  }
}
