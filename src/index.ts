import App, { IApp } from './App'
import './style.css'

declare global {
  interface Window {
    App: IApp
  }
}

window.onload = () => {
  window.App = new App()
  window.App.init()
}
