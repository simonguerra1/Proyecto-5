import './PiedraPapelTijera.css'

let playerScore = 0
let computerScore = 0

const template = () => {
  const gameContainer = document.createElement('div')
  gameContainer.id = 'piedraPapelTijera-container'

  const explicacion = document.createElement('p')
  explicacion.id = 'expl'
  explicacion.textContent =
    'Instrucciones: Da click en el numero para iniciar la cuenta atras, luego de eso, cuando la cuenta llegue a cero tendras 1 segundo para elegir que elemento jugar. Suerte!'

  const countdownContainer = document.createElement('div')
  countdownContainer.id = 'countdown'
  countdownContainer.textContent = '3'
  countdownContainer.style.cursor = 'pointer'
  countdownContainer.addEventListener('click', () => startCountdown())

  const options = ['Piedra', 'Papel', 'Tijera']

  options.forEach((option) => {
    const button = document.createElement('button')
    button.id = option.toLowerCase()
    button.textContent = option
    button.disabled = true

    button.addEventListener('click', () => {
      const playerChoice = option
      const computerChoice = options[Math.floor(Math.random() * options.length)]
      playRound(playerChoice, computerChoice)
    })

    gameContainer.appendChild(button)
  })

  const scoreContainer = document.createElement('div')
  scoreContainer.id = 'score'
  scoreContainer.textContent = `Jugador: ${playerScore} - Computadora: ${computerScore}`

  const resultContainer = document.createElement('div')
  resultContainer.id = 'result'

  const resetButton = document.createElement('button')
  resetButton.id = 'resetButton'
  resetButton.textContent = 'Reiniciar Juego'
  resetButton.addEventListener('click', () => resetGame())

  const container = document.createElement('div')
  container.id = 'main-container'
  container.appendChild(explicacion)
  container.appendChild(countdownContainer)
  container.appendChild(gameContainer)
  container.appendChild(scoreContainer)
  container.appendChild(resultContainer)
  container.appendChild(resetButton)

  return container
}

const startCountdown = () => {
  let count = 3
  const countdownContainer = document.getElementById('countdown')
  countdownContainer.textContent = count
  countdownContainer.removeEventListener('click', startCountdown)

  const interval = setInterval(() => {
    count--
    countdownContainer.textContent = count

    if (count === 0) {
      clearInterval(interval)

      const buttons = document.querySelectorAll(
        '#piedraPapelTijera-container button'
      )
      buttons.forEach((button) => (button.disabled = false))

      setTimeout(() => {
        buttons.forEach((button) => (button.disabled = true))
        countdownContainer.textContent = '3'
        countdownContainer.addEventListener('click', () => startCountdown())
      }, 1000)
    }
  }, 1000)
}

const piedraPapelTijera = () => {
  return template()
}

const playRound = (playerChoice, computerChoice) => {
  const resultContainer = document.getElementById('result')
  const scoreContainer = document.getElementById('score')

  let result
  if (playerChoice === computerChoice) {
    result = 'Es un empate!'
  } else if (
    (playerChoice === 'Piedra' && computerChoice === 'Tijera') ||
    (playerChoice === 'Papel' && computerChoice === 'Piedra') ||
    (playerChoice === 'Tijera' && computerChoice === 'Papel')
  ) {
    result = '¡Ganaste esta ronda!'
    playerScore++
  } else {
    result = 'La computadora ganó esta ronda.'
    computerScore++
  }

  if (playerScore === 3 || computerScore === 3) {
    result =
      playerScore === 3 ? '¡Ganaste el juego!' : 'La computadora ganó el juego.'
    playerScore = 0
    computerScore = 0
  }

  resultContainer.textContent = `Jugador: ${playerChoice} - Computadora: ${computerChoice} | ${result}`
  scoreContainer.textContent = `Jugador: ${playerScore} - Computadora: ${computerScore}`
}

const resetGame = () => {
  playerScore = 0
  computerScore = 0
  document.getElementById(
    'score'
  ).textContent = `Jugador: ${playerScore} - Computadora: ${computerScore}`
  document.getElementById('result').textContent = ''
}

export default piedraPapelTijera
