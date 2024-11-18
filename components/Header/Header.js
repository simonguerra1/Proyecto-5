import './Header.css'

const template = () => {
  return `
  <header>
  <a href="http://localhost:5173/" >
    <img src="https://res.cloudinary.com/dzviuc0zj/image/upload/v1729622947/El_texto_del_pa%CC%81rrafo_2_lswjun.png" alt="Gameshub" />
  </a>
  <h1>GAMESHUB!</h1>
  </header>
  `
}

export const header = () => {
  return template()
}
