import * as THREE from "three"
import {createLogger, loadConfigFromFile} from "vite";


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
  public fantasmaInicial : any
  colorOriginal : any
  public timeInterval : any
  public hardMode : boolean = false

  constructor(scene : any, x : any, y : any, z : any, colorO : any) {
    this.fantasmaInicial = {x: x, y: y, z: z}
    this.fantasma = this.dibujarFantasma(scene, x, y, z, colorO)
    const color= this.fantasma.material.color
    this.colorOriginal = color.getHex()
  }

  dibujarFantasma(scene : any, x : number, y : number, z : number, color : any){
    const cubeGeometry = new THREE.SphereGeometry(0.5, 32, 32);

    //Dame el codigo hexadecimal de un color amarillo
    const material = new THREE.MeshStandardMaterial({color: color, roughness: 0.4, metalness: 0.8});
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

  movimientoFantasma(pacman : any, matrix : any, t_max : any, hardMode : any, reset : any){
    //console.log("Movimiento fantasma", posFinal.position.x, posFinal.position.z)

    this.matrizOriginal = matrix
    hardMode = this.hardMode

    this.modificarLaberinto()

    let x_pacman = Math.round(pacman.pacman.position.x)
    let z_pacman = Math.round(pacman.pacman.position.z)

    let x_fantasma = Math.round(this.fantasma.position.x)
    let z_fantasma = Math.round(this.fantasma.position.z)
    if (!reset){
      if (pacman.colisiones.powerUp === true){

        this.fantasma.material.color.setHex(0x0000ff)
        let camino = this.astarPrueba(x_fantasma, z_fantasma, this.fantasmaInicial.x, this.fantasmaInicial.z , matrix, hardMode)
        if (camino.length > 0) {
          let movimiento = camino.pop()
          let max = camino.length
          let intervalo = t_max / camino.length; // 1 segundo (1000 milisegundos)

          //TODO corregir que el fantasma deje igual la posicion a la que llego cuando se vaya de esa posicion

            this.fantasma.position.x += (movimiento.i - this.fantasma.position.x);
            this.fantasma.position.z += (movimiento.j - this.fantasma.position.z);

            movimiento = camino.pop();
            max = camino.length + 1;
        }
      }
      else {
        this.fantasma.material.color.setHex(this.colorOriginal)
        let camino = this.astarPrueba(x_fantasma, z_fantasma, x_pacman, z_pacman, matrix, hardMode)
        if (camino.length > -1) {
          let movimiento = camino.pop()
          let max = camino.length

          //TODO corregir que el fantasma deje igual la posicion a la que llego cuando se vaya de esa posicion

            if (max >= 0 && movimiento != undefined) {

              this.fantasma.position.x += -this.fantasma.position.x +movimiento.i
              this.fantasma.position.z += -this.fantasma.position.z +movimiento.j

              movimiento = camino.pop();
              max = camino.length + 1
            }

        }
      }

    }
    else{
      clearTimeout(this.timeInterval)
    }

  }

  astarPrueba(inicial_x : any, inicial_z : any,  final_x : any, final_y : any, matrix : any, hardMode : any) {
    let listaAbierta = []
    let listaCerrada = []

    //Al inico no tenemos ninguna valor en la lista abierta por lo que el k_valor pasa a la lista cerrada automaticamente
    let k_valor = this.laberintoModificado[inicial_x][inicial_z]
    k_valor.G = 0
    listaCerrada.push(k_valor)

    //Inicio del algoritmo

    let actual = k_valor
    // Coordenadas relativas de los vecinos
    let coordenadasRelativas

    if (hardMode) coordenadasRelativas = [[-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1], [1, 0], [0, -1], [0, 1]];
    else coordenadasRelativas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let pasos = 0
    while (!(actual.i === final_x && actual.j === final_y)) {

      //Deteccion de vecinos
      for (const [dx, dy] of coordenadasRelativas) {
        const newCol = actual.j + dx;
        const newRow = actual.i + dy;
        // Verificar si las coordenadas están dentro de los límites de la matriz
        if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length && matrix[newRow][newCol] !== 1) {
          let vecino = this.laberintoModificado[newRow][newCol]
          if (vecino.F === null && !(vecino.i === inicial_x && vecino.j === inicial_z)) {

            if (vecino.i == final_x && vecino.j == final_y) {
              //Necesitamos saber el camino que se va a seguir
              //console.log(vecino)

              //Con esto nos aseguramos que el fantasma llegue hasta la posicion del pacman y no una antes
              vecino.padre = actual.ID
              listaCerrada.push(vecino)

              let camino = []
              let elemento = listaCerrada.pop()

              while (elemento.padre !== "") {
                camino.push(elemento)
                elemento = listaCerrada.filter(element => element.ID === elemento.padre)[0]
              }
                return camino
            }
            if (Math.abs(dx + dy) === 2 || Math.abs(dx + dy) === 0) {
              this.laberintoModificado[newRow][newCol].G = 14 + actual.G
            } else {
              this.laberintoModificado[newRow][newCol].G = 10 + actual.G
            }

            this.laberintoModificado[newRow][newCol].padre = actual.ID
            let resultado = Math.abs(vecino.i -final_x) +  Math.abs(vecino.j - final_y)
            this.laberintoModificado[newRow][newCol].H = resultado * vecino.G
            this.laberintoModificado[newRow][newCol].F = vecino.G + vecino.H

            listaAbierta.push(this.laberintoModificado[newRow][newCol]);
          } else {
            if (vecino.G + actual.G < actual.G &&  vecino.i !== inicial_x && vecino.j !== inicial_z) {
              //Pendiente por si se tiene que agregar algo mas
              this.laberintoModificado[newRow][newCol].G = vecino.G + actual.G
              this.laberintoModificado[newRow][newCol].padre = actual.ID
            }
          }
        }
      }

      //Calculo de G Y H

      const objetoMenor = listaAbierta.reduce((menorObjeto, objeto) => {
        if (objeto.F < menorObjeto.F) {
          return objeto;
        } else {
          return menorObjeto;
        }
      });

      actual = objetoMenor

      const obejetoEncontrado = listaAbierta.filter(element => element.ID !== actual.ID)
      listaAbierta = obejetoEncontrado
      listaCerrada.push(actual)
    }


  }
}
