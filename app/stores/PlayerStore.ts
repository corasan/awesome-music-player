import { makeAutoObservable } from 'mobx'
import RootStore from './RootStore'

export default class PlayerStore {
  rootStore: RootStore
  nowPlaying: NowPlaying | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setNowPlaying(value: NowPlaying) {
    this.nowPlaying = value
  }
}
