import './Tresenraya.css'

let turno = 0
const tablero = Array(9).fill(null)
let playerRedScore = Number(localStorage.getItem('playerRedScore')) || 0
let playerBlueScore = Number(localStorage.getItem('playerBlueScore')) || 0

const template = () => {
  return `
  <div id="juego1">
    <section id="score-section">
      <p>Jugador Rojo: <span id="player-x-score">${playerRedScore}</span></p>
      <button type="reset" id="reset-button">Reset Score</button>
      <p>Jugador Azul: <span id="player-o-score">${playerBlueScore}</span></p>
    </section>
    <section id="juego1-container">
      <button class="botonJuego1"></button>
      <button class="botonJuego1"></button>
      <button class="botonJuego1"></button>
      <button class="botonJuego1"></button>
      <button class="botonJuego1"></button>
      <button class="botonJuego1"></button>
      <button class="botonJuego1"></button>
      <button class="botonJuego1"></button>
      <button class="botonJuego1"></button>
    </section>
  </div>
  `
}

const Tresenraya = () => {
  return template()
}

export default Tresenraya

const ganador = () => {
  const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  return combinacionesGanadoras.some(
    (combo) =>
      tablero[combo[0]] &&
      tablero[combo[0]] === tablero[combo[1]] &&
      tablero[combo[0]] === tablero[combo[2]]
  )
}

const actualizarPuntaje = (ganador) => {
  if (ganador === 'var(--third)') {
    playerRedScore++
    localStorage.setItem('playerRedScore', playerRedScore)
    document.getElementById('player-x-score').textContent = playerRedScore
  } else if (ganador === 'var(--fourth)') {
    playerBlueScore++
    localStorage.setItem('playerBlueScore', playerBlueScore)
    document.getElementById('player-o-score').textContent = playerBlueScore
  }
}

const reiniciarTablero = () => {
  turno = 0
  tablero.fill(null)
  document.querySelectorAll('.botonJuego1').forEach((button) => {
    button.style.backgroundColor = ''
  })
}

export const btnPulsado = () => {
  document.querySelectorAll('.botonJuego1').forEach((obj, i) =>
    obj.addEventListener('click', () => {
      if (!tablero[i]) {
        turno++
        const color = turno % 2 ? 'var(--third)' : 'var(--fourth)'
        obj.style.backgroundColor = color
        tablero[i] = color

        if (ganador()) {
          alert(
            `¡${
              color === 'var(--third)' ? 'Jugador Rojo' : 'Jugador Azul'
            } ganó!`
          )
          actualizarPuntaje(color)
          reiniciarTablero()
        } else if (turno === 9) {
          alert('¡Es un empate!')
          reiniciarTablero()
        }
      }
    })
  )
}

export const inicializarResetButton = () => {
  const resetButton = document.getElementById('reset-button')
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      playerRedScore = 0
      playerBlueScore = 0
      localStorage.setItem('playerRedScore', playerRedScore)
      localStorage.setItem('playerBlueScore', playerBlueScore)
      document.getElementById('player-x-score').textContent = playerRedScore
      document.getElementById('player-o-score').textContent = playerBlueScore
    })
  }
}
