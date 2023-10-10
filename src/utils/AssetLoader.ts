/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventData, EventEmitter } from './EventEmitter'
import http from './fetch-utils'

export type AssetLoadingDataType = {
  status: 'loading' | 'success' | 'error'
  progress: number
}

export interface IAssetLoader {
  loadAssets: () => Promise<void>
  subscribe: (callback: <D>(eventData: EventData<D>) => void) => void
}

export enum AssetLoadingEvents {
  AssetLoading = 'asset-loading',
}

export enum AssetType {
  Image = 'image',
  Model = 'model',
}

export enum AssetStatus {
  Success = 'success',
  Failed = 'failed',
  Loading = 'loading',
}

export type Asset = {
  type: `${AssetType}`
  url: string
  progress: number
  status?: `${AssetStatus}`
}

const ImagesUrlPaths: string[] = [
  'static/images/RockTexture/rockTexture1.png',
  'static/images/RockTexture/rockTexture2.png',
  'static/images/TreesTexture/DeadOakTreeTrunk.png',
  'static/images/TreesTexture/DeadSpruceTreeTrunk.png',
  'static/images/TreesTexture/OakTreeLeaf.png',
  'static/images/TreesTexture/OakTreeTrunk.png',
  'static/images/TreesTexture/SpruceTreeLeaf.png',
  'static/images/TreesTexture/SpruceTreeTrunk.png',
]

const ModelsUrlPath: string[] = [
  'static/models/Trees/SpruceTree3.fbx',
  'static/models/Trees/SpruceTree2.fbx',
  'static/models/Trees/SpruceTree1.fbx',
  'static/models/Trees/OakTree3.fbx',
  'static/models/Trees/OakTree2.fbx',
  'static/models/Trees/OakTree1.fbx',
  'static/models/Trees/DeadSpruce3.fbx',
  'static/models/Trees/DeadSpruce2.fbx',
  'static/models/Trees/DeadSpruce1.fbx',
  'static/models/Trees/DeadOak3.fbx',
  'static/models/Trees/DeadOak2.fbx',
  'static/models/Trees/DeadOak1.fbx',
  'static/models/Rocks/Rock9.fbx',
  'static/models/Rocks/Rock8.fbx',
  'static/models/Rocks/Rock7.fbx',
  'static/models/Rocks/Rock6.fbx',
  'static/models/Rocks/Rock5.fbx',
  'static/models/Rocks/Rock4.fbx',
  'static/models/Rocks/Rock3.fbx',
  'static/models/Rocks/Rock2.fbx',
  'static/models/Rocks/Rock1.fbx',
  'static/models/Rocks/Rock_25.fbx',
  'static/models/Rocks/Rock_24.fbx',
  'static/models/Rocks/Rock_23.fbx',
  'static/models/Rocks/Rock_22.fbx',
  'static/models/Rocks/Rock_21.fbx',
  'static/models/Rocks/Rock_20.fbx',
  'static/models/Rocks/Rock_19.fbx',
  'static/models/Rocks/Rock_18.fbx',
  'static/models/Rocks/Rock_17.fbx',
  'static/models/Rocks/Rock_16.fbx',
  'static/models/Rocks/Rock_15.fbx',
  'static/models/Rocks/Rock_14.fbx',
  'static/models/Rocks/Rock_13.fbx',
  'static/models/Rocks/Rock_12.fbx',
  'static/models/Rocks/Rock_11.fbx',
  'static/models/Rocks/Rock_10.fbx',
  'static/models/Rocks/BigRock5.fbx',
  'static/models/Rocks/BigRock4.fbx',
  'static/models/Rocks/BigRock3.fbx',
  'static/models/Rocks/BigRock2.fbx',
  'static/models/Rocks/BigRock1.fbx',
]

export class AssetLoader implements IAssetLoader {
  private static instance: AssetLoader
  private eventEmitter: EventEmitter
  private assets: Asset[]
  private totalAssets: {
    [key: string]: number
  }

  private constructor() {
    this.eventEmitter = EventEmitter.getInstance()
    this.totalAssets = {
      [AssetType.Image]: ImagesUrlPaths.length,
      [AssetType.Model]: ModelsUrlPath.length,
    }
    this.assets = [
      ...ImagesUrlPaths.map((imageUrl) => ({
        type: AssetType.Image,
        url: imageUrl.replace('static', ''),
      })),
      ...ModelsUrlPath.map((modelUrl) => ({
        type: AssetType.Model,
        url: modelUrl.replace('static', ''),
      })),
    ].map((object) => ({ ...object, progress: 0 }))

    window.addEventListener('fetch-progress', (e: any) => {
      console.log(e.detail)
    })

    window.addEventListener('fetch-finished', (e: any) => {
      console.log(e.detail)
    })
  }

  public static getInstance(): AssetLoader {
    if (!AssetLoader.instance) {
      AssetLoader.instance = new AssetLoader()
    }
    return AssetLoader.instance
  }

  async loadAssets(): Promise<void> {
    this.assets.forEach(async (asset) => {
      const { json } = http('')
      const response = json(asset.url)
      console.log(asset.type, ' == ', asset.url, ' == response', response)
    })
  }

  public subscribe(callback: (eventData: EventData<AssetLoadingDataType>) => void): void {
    this.eventEmitter.subscribe<AssetLoadingDataType>(AssetLoadingEvents.AssetLoading, callback)
  }

  public unsubscribe(callback: (eventData: EventData<AssetLoadingDataType>) => void): void {
    this.eventEmitter.unsubscribe<AssetLoadingDataType>(AssetLoadingEvents.AssetLoading, callback)
  }
}
