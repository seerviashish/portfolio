import {
  AmbientLight,
  AxesHelper,
  Color,
  GridHelper,
  PerspectiveCamera,
  Renderer,
  Scene,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Pane } from 'tweakpane'
import Cube from './objects/Cube'
import { AssetLoader } from './utils/AssetLoader'
export interface IApp {
  init: () => Promise<void>
}

export default class App implements IApp {
  private static instance: App
  private camera: PerspectiveCamera
  private renderer: Renderer
  private scene: Scene
  private cube?: Cube
  private stats?: Stats
  private pane?: Pane
  private axesHelper?: AxesHelper
  private gridHelper?: GridHelper
  private orbitControls?: OrbitControls
  private ambientLight?: AmbientLight
  private fbxLoader: FBXLoader
  private cubeParams: { x: number; y: number; z: number; dx: number; dy: number; dz: number } = {
    x: 0,
    y: 0,
    z: 0,
    dx: 0.01,
    dy: 0.01,
    dz: 0,
  }

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
    this.camera.position.z = 10
    this.camera.position.y = 10
    this.camera.position.x = 10
    this.fbxLoader = new FBXLoader()
  }

  handleOnWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.render()
  }

  animate = (): void => {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
    this.updateStats()
    this.render()
  }

  isProduction = (): boolean => {
    return process.env.NODE_ENV === 'production'
  }

  addStats = (): void => {
    if (this.isProduction()) return
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  updateStats = () => {
    if (this.isProduction()) return
    if (!this.stats) return
    this.stats.update()
  }

  addPane = (): void => {
    if (this.isProduction()) return
    this.pane = new Pane()
  }

  addCubePane = (): void => {
    if (!this.pane) return
    const cubePane = this.pane.addFolder({
      title: 'Cube',
    })
    cubePane.addBinding(this.cubeParams, 'x')
    cubePane.addBinding(this.cubeParams, 'y')
    cubePane.addBinding(this.cubeParams, 'z')
    cubePane.addBinding(this.cubeParams, 'dx')
    cubePane.addBinding(this.cubeParams, 'dy')
    cubePane.addBinding(this.cubeParams, 'dz')
  }

  addAxesHelper = (): void => {
    if (this.isProduction()) return
    this.axesHelper = new AxesHelper(100)
    this.scene.add(this.axesHelper)
  }

  addGridHelper = (): void => {
    if (this.isProduction()) return
    this.gridHelper = new GridHelper(100, 100)
    this.scene.add(this.gridHelper)
  }

  addOrbitalControls = (): void => {
    if (this.isProduction()) return
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  addAmbientLight = (): void => {
    this.ambientLight = new AmbientLight(0xffffff, Math.PI * 2)
    this.scene.add(this.ambientLight)
  }

  addTree = (): void => {
    this.fbxLoader.load(
      '/models/Trees/OakTree1.fbx',
      (object) => {
        object.scale.set(0.01, 0.01, 0.01)
        this.scene.add(object)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log(error)
      },
    )
  }

  async loadAsset(): Promise<void> {
    const assetLoader = AssetLoader.getInstance()
    assetLoader.loadAssets()
  }

  async init() {
    this.scene.background = new Color(0x000000)
    document.body.appendChild(this.renderer.domElement)
    this.loadAsset()
    this.addAmbientLight()
    this.addAxesHelper()
    this.addGridHelper()
    this.addOrbitalControls()
    this.addStats()
    this.addPane()
    this.addTree()
    window.addEventListener('resize', this.handleOnWindowResize)
    this.animate()
    this.initCube()
  }

  private initCube() {
    this.cube = new Cube([1, 1, 1], { color: 0x00ff00, wireframe: true })
    this.scene.add(this.cube.getCube())
    const cubeMesh = this.cube.getCube()
    cubeMesh.position.z = -5
    this.addCubePane()
  }

  private renderCube() {
    if (!this.cube) {
      return
    }
    const cubeMesh = this.cube.getCube()
    cubeMesh.position.x = this.cubeParams.x
    cubeMesh.position.y = this.cubeParams.y
    cubeMesh.position.z = this.cubeParams.z
    cubeMesh.rotation.x += this.cubeParams.dx
    cubeMesh.rotation.y += this.cubeParams.dy
    cubeMesh.rotation.z += this.cubeParams.dz
  }

  render = () => {
    this.renderCube()
  }
}
