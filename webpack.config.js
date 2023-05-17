const path = require('path');

module.exports = {
  entry: './src/game/game.js', // Ruta al archivo JavaScript principal
  mode: "development", // Modo de desarrollo
  output: {
    path: path.resolve(__dirname, 'build'), // Directorio de salida para el bundle
    filename: 'bundle.js' // Nombre del archivo bundle
  }
};
