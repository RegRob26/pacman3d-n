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
    console.log(x_pacman, z_pacman)
    this.astarPrueba(x_fantasma, z_fantasma, x_pacman, z_pacman, matrix)
  }

  astarPrueba(inicial_x : any, inicial_z : any,  final_x : any, final_y : any, matrix : any) {
    let listaAbierta = []
    let listaCerrada = []

    //Al inico no tenemos ninguna valor en la lista abierta por lo que el k_valor pasa a la lista cerrada automaticamente
    let k_valor = this.laberintoModificado[inicial_x][inicial_z]
    k_valor.G = 0
    //console.log(k_valor)
    listaCerrada.push(k_valor)

    //Inicio del algoritmo

    let actual = k_valor
    // Coordenadas relativas de los vecinos
    const coordenadasRelativas = [[-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1], [1, 0], [0, -1], [0, 1]];
    let pasos = 0
    while (!(actual.i === final_x && actual.j === final_y)) {

      //Deteccion de vecinos
      for (const [dx, dy] of coordenadasRelativas) {
        const newCol = actual.j + dx;
        const newRow = actual.i + dy;

        // Verificar si las coordenadas están dentro de los límites de la matriz
        if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length && matrix[newRow][newCol] !== 1) {
          let vecino = this.laberintoModificado[newRow][newCol]

          //console.log("VECINO", newRow, newCol)
          if (vecino.F === null && vecino.i !== inicial_x && vecino.j !== inicial_z) {

            if (vecino.i == final_x && vecino.j == final_y) {
                console.log("LLEGUE")
                return
            }
            if (Math.abs(dx + dy) === 2 || Math.abs(dx + dy) === 0) {
              this.laberintoModificado[newRow][newCol].G = 14 + actual.G
            } else {
              console.log(actual.G)
              this.laberintoModificado[newRow][newCol].G = 10 + actual.G
            }


            this.laberintoModificado[newRow][newCol].padre = actual.ID
            let resultado = Math.abs(final_x - vecino.i + final_y - vecino.j)
            this.laberintoModificado[newRow][newCol].H = resultado * vecino.G
            this.laberintoModificado[newRow][newCol].F = vecino.G + vecino.H

            listaAbierta.push(this.laberintoModificado[newRow][newCol]);
          } else {
            if (vecino.G + actual.G < actual.G &&  vecino.i !== inicial_x && vecino.j !== inicial_z) {
              //Pendiente por si se tiene que agregar algo mas
              this.laberintoModificado[newRow][newCol].G = vecino.G + actual.G
              this.laberintoModificado[newRow][newCol].padre = actual.ID

            } else {

              if ( vecino.i !== inicial_x && vecino.j !== inicial_z) {
                console.log("Padre", vecino.ID)
              }

            }
          }
        }
      }

      //Calculo de G Y H

      //Codigo para encontrar el menor valor de la lista abierta
      for (let vecino of listaAbierta) {
        if (vecino.F < k_valor.F) {
          k_valor = vecino
        }
      }


      const objetoMenor = listaAbierta.reduce((menorObjeto, objeto) => {
        if (objeto.F < menorObjeto.F) {
          return objeto;
        } else {
          return menorObjeto;
        }
      });

     actual = objetoMenor


      console.log("ACTUAL", actual.i, actual.j, final_x, final_y)
      //console.log(listaAbierta)

      const index = listaAbierta.indexOf(actual)
      console.log("INDEX", index)

      const obejetoEncontrado = listaAbierta.filter(element => element.ID !== actual.ID)
      listaAbierta = obejetoEncontrado
      listaCerrada.push(actual)


      console.log(listaAbierta, listaCerrada)
      pasos++
    }
  }
}
