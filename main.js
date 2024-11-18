import { header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import './style.css'
import Tresenraya, { btnPulsado } from './components/Tresenraya/Tresenraya'
import memory from './components/Memory/Memory'
import piedraPapelTijera from './components/PiedraPapelTijera/PiedraPapelTijera'
import { inicializarResetButton } from './components/Tresenraya/Tresenraya'

const render = () => {
  document.querySelector('#app').innerHTML = `
    ${header()}
    ${Main()}
  `
  addListeners()
}

const addListeners = () => {
  document.querySelector('#tresenraya-link')?.addEventListener('click', (e) => {
    e.preventDefault()
    navigate('tresenraya')
  })

  document.querySelector('#memory-link')?.addEventListener('click', (e) => {
    e.preventDefault()
    navigate('memory')
  })

  document
    .querySelector('#piedraPapelTijera-link')
    ?.addEventListener('click', (e) => {
      e.preventDefault()
      navigate('piedraPapelTijera')
    })
}

const navigate = (page) => {
  const app = document.querySelector('#app')
  app.innerHTML = ''
  if (page === 'tresenraya') {
    app.innerHTML = `${header()} ${Tresenraya()}`
    btnPulsado()
    inicializarResetButton()
  } else if (page === 'memory') {
    app.innerHTML = `${header()}`
    app.appendChild(memory())
  } else if (page === 'piedraPapelTijera') {
    app.innerHTML = `${header()}`
    app.appendChild(piedraPapelTijera())
  } else {
    render()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render()
})
