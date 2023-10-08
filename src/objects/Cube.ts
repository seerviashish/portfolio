import { BoxGeometry, ColorRepresentation, Mesh, MeshBasicMaterial } from 'three'

export interface ICube {
  getCube: () => Mesh
}

export default class Cube implements ICube {
  private geometry: BoxGeometry
  private material: MeshBasicMaterial
  private mesh: Mesh
  constructor(
    geometry: [number, number, number],
    meshParams?: { color: ColorRepresentation; wireframe?: boolean },
  ) {
    this.geometry = new BoxGeometry(...geometry)
    this.material = new MeshBasicMaterial({ ...meshParams })
    this.mesh = new Mesh(this.geometry, this.material)
  }

  getCube = (): Mesh => {
    return this.mesh
  }
}
