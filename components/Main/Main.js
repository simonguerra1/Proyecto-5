import './Main.css'
import card from '../Card/Card'

const template = () => {
  return `
  <main>
      <section>
        ${card()}
      </section>
    </main>
  `
}

export const Main = () => {
  return template()
}
