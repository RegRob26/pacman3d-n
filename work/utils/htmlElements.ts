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
