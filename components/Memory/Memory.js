import './Memory.css'
import { emojis } from '../Data/Data'

const shuffledEmojis = () => {
  const emojiPairs = [...emojis, ...emojis]
  return emojiPairs.sort(() => Math.random() - 0.5)
}

let selectedCards = []
let matchedPairs = 0
const totalPairs = emojis.length

const template = () => {
  const memoryContainer = document.createElement('div')
  memoryContainer.id = 'memory-container'

  const juegoContainer = document.createElement('div')
  juegoContainer.className = 'juego2-container'

  const emojiList = document.createElement('ul')
  emojiList.className = 'emoji-list'

  shuffledEmojis().forEach((emoji, index) => {
    const li = document.createElement('li')
    li.className = 'emoji-item'
    li.dataset.index = index
    li.dataset.emoji = emoji.alt

    const img = document.createElement('img')
    img.src = emoji.imgSrc
    img.alt = emoji.alt
    img.className = 'emoji-img'

    li.appendChild(img)
    emojiList.appendChild(li)

    li.addEventListener('click', () => {
      if (li.classList.contains('flipped') || selectedCards.length === 2) return

      li.classList.add('flipped')
      selectedCards.push(li)

      if (selectedCards.length === 2) {
        if (selectedCards[0].dataset.emoji === selectedCards[1].dataset.emoji) {
          matchedPairs++
          selectedCards = []

          if (matchedPairs === totalPairs) {
            setTimeout(() => {
              alert('Has ganado!')
            }, 500)
          }
        } else {
          setTimeout(() => {
            selectedCards.forEach((card) => card.classList.remove('flipped'))
            selectedCards = []
          }, 1000)
        }
      }
    })
  })

  juegoContainer.appendChild(emojiList)

  const resetButton = document.createElement('button')
  resetButton.className = 'reset-game'
  resetButton.textContent = 'Reset Game'

  resetButton.addEventListener('click', () => {
    selectedCards = []
    while (emojiList.firstChild) {
      emojiList.removeChild(emojiList.firstChild)
    }
    shuffledEmojis().forEach((emoji, index) => {
      const li = document.createElement('li')
      li.className = 'emoji-item'
      li.dataset.index = index
      li.dataset.emoji = emoji.alt

      const img = document.createElement('img')
      img.src = emoji.imgSrc
      img.alt = emoji.alt
      img.className = 'emoji-img'

      li.appendChild(img)
      emojiList.appendChild(li)

      li.addEventListener('click', () => {
        if (li.classList.contains('flipped') || selectedCards.length === 2)
          return

        li.classList.add('flipped')
        selectedCards.push(li)

        if (selectedCards.length === 2) {
          if (
            selectedCards[0].dataset.emoji === selectedCards[1].dataset.emoji
          ) {
            selectedCards = []
          } else {
            setTimeout(() => {
              selectedCards.forEach((card) => card.classList.remove('flipped'))
              selectedCards = []
            }, 1000)
          }
        }
      })
    })
  })

  memoryContainer.appendChild(juegoContainer)
  memoryContainer.appendChild(resetButton)

  return memoryContainer
}

const memory = () => {
  return template()
}

export default memory
