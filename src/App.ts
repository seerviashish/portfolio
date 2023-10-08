import { Color, PerspectiveCamera, Renderer, Scene, WebGLRenderer } from 'three'
import Cube from './objects/Cube'
export interface IApp {
  init: () => Promise<void>
}

export default class App implements IApp {
  private static instance: App
  private camera: PerspectiveCamera
  private renderer: Renderer
  private scene: Scene
  private cube?: Cube

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App()
    }
    return App.instance
  }

  constructor() {
    this.renderer = new WebGLRenderer()
    this.scene = new Scene()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  }

  handleOnWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.render()
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
    this.render()
  }

  async init() {
    this.scene.background = new Color(0x000000)
    document.body.appendChild(this.renderer.domElement)
    window.addEventListener('resize', this.handleOnWindowResize)
    this.animate()
    this.initCube()
  }

  private initCube() {
    this.cube = new Cube([1, 1, 1], { color: 0x00ff00 })
    this.scene.add(this.cube.getCube())
    const cubeMesh = this.cube.getCube()
    cubeMesh.position.z = -5
  }

  private renderCube() {
    if (!this.cube) {
      return
    }
    const cubeMesh = this.cube.getCube()
    cubeMesh.rotation.x += 0.01
    cubeMesh.rotation.y += 0.01
  }

  render = () => {
    this.renderCube()
  }
}
