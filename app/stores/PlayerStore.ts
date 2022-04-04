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

  get p() {
    return this.musicKit.instance?.player
  }

  get playbackProgress() {
    return this.p?.currentPlaybackProgress ?? 0
  }

  get playbackDuration() {
    return this.p?.currentPlaybackDuration
  }

  setNowPlaying(value: MusicKit.MediaItem) {
    this.nowPlaying = value
  }
}
