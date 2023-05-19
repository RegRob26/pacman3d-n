export function actualizarContador(puntos : any) {
  let contador = document.getElementById("contador")
  if (contador !== null) {
    contador.innerHTML = "Score: " + puntos
    // Aplica un tamaño de fuente mayor al elemento
    contador.style.fontSize = "30px";
  }
}

export function finNivelMensaje() {
  let contador = document.getElementById("cambioNivel")
  if (contador !== null) {
    contador.innerHTML = 'NIVEL COMPLETADO.'
    // Aplica un tamaño de fuente mayor al elemento
    contador.style.fontSize = "50px";
  }
}

export function gameOver() {
  let contador = document.getElementById("gameOver")
  if (contador !== null) {
    contador.innerHTML = 'Has perdido!'
    // Aplica un tamaño de fuente mayor al elemento
    contador.style.fontSize = "50px";
    contador.style.color = "red";
  }
}