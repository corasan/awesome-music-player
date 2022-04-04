import { makeAutoObservable } from 'mobx'
import MusicKitStore from './MusicKitStore'
import RootStore from './RootStore'

export default class PlayerStore {
  rootStore: RootStore
  musicKit: MusicKitStore
  nowPlaying: MusicKit.MediaItem | null = null
  playerInstance: MusicKit.Player | null = null
  playbackTime: number
  playbackProgress: number = 0
  progressInterval: ReturnType<typeof setInterval>

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.musicKit = rootStore.musicKit
  }

  setPlaybackTime = (value: number) => {
    this.playbackTime = value
  }

  setPlaybackProgress = (value: number) => {
    this.playbackProgress = value
  }

  startProgress = () => {
    this.progressInterval = setInterval(
      () => this.setPlaybackProgress(this.playbackProgress + 0.105),
      100,
    )
  }

  stopProgress = () => {
    this.setPlaybackProgress(0)
    clearInterval(this.progressInterval)
  }

  get p() {
    return this.musicKit.instance?.player
  }

  setNowPlaying(value: MusicKit.MediaItem) {
    this.nowPlaying = value
  }
}
