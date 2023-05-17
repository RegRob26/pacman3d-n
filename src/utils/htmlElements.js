"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarContador = void 0;
function actualizarContador(puntos) {
    let contador = document.getElementById("contador");
    if (contador !== null) {
        contador.innerHTML = "Score: " + puntos;
        // Aplica un tamaño de fuente mayor al elemento
        contador.style.fontSize = "30px";
    }
    return puntos;
}
exports.actualizarContador = actualizarContador;
