import { AssetLoadingEvents } from './AssetLoader'

export type EventType = `${AssetLoadingEvents}`

export type EventData<D> = {
  eventType: EventType
  data: D
}

export interface IEventEmitter {
  subscribe: (
    eventType: EventType,
    callback: <D>(eventData: EventData<D>) => void | Promise<void>,
  ) => void
}

export type EventListener = {
  [key: string]: {
    callback: <D>(eventData: EventData<D>) => void | Promise<void>
  }[]
}

export class EventEmitter implements IEventEmitter {
  private static instance?: EventEmitter
  private eventListener: EventListener

  private constructor() {
    this.eventListener = {}
  }

  public static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter()
    }
    return EventEmitter.instance
  }

  public subscribe<D>(
    eventType: EventType,
    callback: (status: EventData<D>) => void | Promise<void>,
  ): void {
    if (!this.eventListener[eventType]) {
      this.eventListener[eventType] = []
    }
    this.eventListener[eventType].push({
      callback: callback as <D>(status: EventData<D>) => void | Promise<void>,
    })
  }

  public unsubscribe<D>(
    eventType: EventType,
    callback: (eventData: EventData<D>) => void | Promise<void>,
  ): void {
    if (!this.eventListener[eventType]?.length) return
    const functionIndex = this.eventListener[eventType].findIndex(
      (listener) => callback == listener.callback,
    )
    this.eventListener[eventType].splice(functionIndex, 1)
  }

  public dispatch<D>(eventType: EventType, eventData: EventData<D>): void {
    if (!this.eventListener[eventType]?.length) return
    this.eventListener[eventType].forEach((listener) => {
      listener.callback(eventData)
    })
  }
}
