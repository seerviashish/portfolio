export interface IApp {
  init: () => Promise<void>
}

export default class App implements IApp {
  async init() {
    console.log('Hello World!')
  }
}
