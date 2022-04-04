import { makeAutoObservable } from 'mobx'
import RootStore from './RootStore'

export default class PlayerStore {
  rootStore: RootStore
  currentlyPlaying: string | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setCurrentlyPlaying(value: string) {
    this.currentlyPlaying = value
  }
}
