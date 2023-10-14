export function voltearUltimaCartaDeColumna(columnaInicial, columnas) {
  if (columnaInicial >= 0 && columnaInicial < columnas.length) {
    const columna = columnas[columnaInicial]

    if (columna.length > 0) {
      const ultimaCarta = columna[columna.length - 1]
      ultimaCarta.flipped = false
    } else {
      console.log('La columna está vacía, no hay cartas para voltear.')
    }
  } else {
    console.log('Número de columna no válido.')
  }
}

export function encontrarCartasEnColumna(arrayDeDatos, cartaSeleccionada) {
  const elementosEnColumna = []
  let found = false

  for (let i = 0; i < arrayDeDatos.length; i++) {
    const subArray = arrayDeDatos[i]

    for (let j = 0; j < subArray.length; j++) {
      if (subArray[j].id === cartaSeleccionada.id) {
        found = true
      }

      if (found) {
        elementosEnColumna.push(subArray[j])
      }
    }

    if (found) {
      break
    }
  }

  return elementosEnColumna
}
