export function actualizarContador(puntos : any) {
  let contador = document.getElementById("contador")
  if (contador !== null) {
    contador.innerHTML = "Score: " + puntos
    // Aplica un tamaño de fuente mayor al elemento
    contador.style.fontSize = "25px";
    contador.style.fontFamily = "pacman";

  }
}

export function finNivelMensaje(borrar : any) {
  let contador = document.getElementById("cambioNivel")
if (borrar == true){
  if (contador !== null) {
    contador.innerHTML = "";
  }
}
else{
  if (contador !== null) {
    contador.innerHTML = 'NIVEL COMPLETADO.'
    // Aplica un tamaño de fuente mayor al elemento
    contador.style.fontSize = "50px";
    contador.style.fontFamily = "pacman";

  }
}

}

export function gameOver() {
  let contador = document.getElementById("gameOver")


  contador.innerHTML = ''
  if (contador !== null) {
    contador.innerHTML = 'Game Over!'

    // Aplica un tamaño de fuente mayor al elemento
    contador.style.fontSize = "50px";
    contador.style.fontFamily = "pacman";
    contador.style.color = "red";
  }
}
export function mensajeVidaPerdida(borrar : any) {
  let contador = document.getElementById("gameOver")

  if (borrar == true){
    contador.innerHTML = "";
  }
  else{
    if (contador !== null) {
      contador.innerHTML = 'Una vida menos!'
      contador.style.fontFamily = "pacman";

      // Aplica un tamaño de fuente mayor al elemento
      contador.style.fontSize = "40px";
      contador.style.color = "red";
    }

  }
}
export function dibujaVida(totalVidas: number): void {
  const contenedor = document.getElementById("vida");

  // Limpia el contenedor antes de agregar las nuevas imágenes
  contenedor.innerHTML = "";

  for (let i = 0; i < totalVidas; i++) {
    const vida = document.createElement("img");
    vida.src = "work/assets/pacman_vida.png";
    vida.style.width = "30px"; // Asigna el ancho deseado
    vida.style.height = "30px"; // Asigna el alto deseado
    contenedor.appendChild(vida);
  }
}
