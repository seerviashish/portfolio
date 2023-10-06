import './style.css'

interface IApp {
  init: () => Promise<void>
}

class App implements IApp {
  async init() {
    console.log('Hello World!')
  }
}

declare global {
  interface Window {
    App: IApp
  }
}

window.onload = () => {
  window.App = new App()
  window.App.init()
}
