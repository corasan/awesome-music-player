import { makeAutoObservable } from 'mobx'
import MusicKitStore from './MusicKitStore'
import RootStore from './RootStore'

export default class PlayerStore {
  rootStore: RootStore
  musicKit: MusicKitStore
  nowPlaying: MusicKit.MediaItem | null = null
  playerInstance: MusicKit.Player | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.musicKit = rootStore.musicKit
  }

  async getPlayerInstance() {
    const res = this.musicKit.instance?.player ?? null
    this.setPlayerInstance(res)
  }

  setNowPlaying(value: MusicKit.MediaItem) {
    this.nowPlaying = value
  }

  setPlayerInstance(value: MusicKit.Player | null) {
    this.playerInstance = value
  }
}
