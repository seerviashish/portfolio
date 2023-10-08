import App, { IApp } from './App'
import './style.css'

declare global {
  interface Window {
    App: IApp
  }
}

window.onload = () => {
  window.App = App.getInstance()
  window.App.init()
}
