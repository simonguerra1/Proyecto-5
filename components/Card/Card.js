import './Card.css'
import { cardsData } from '../Data/Data'

const template = () => {
  return `
  <ul class="card-list">
  ${cardsData
    .map(
      (item) => `<li class="card">
      <a href="${item.link}" id='${item.id}'>
        <img src="${item.imgSrc}" alt="${item.imgAlt}">
        <h2>${item.title}</h2>
      </a>
    </li>`
    )
    .join('')}
  </ul>
  `
}

const card = () => {
  return template()
}

export default card
