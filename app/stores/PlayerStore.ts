import { makeAutoObservable } from 'mobx'
import MusicKitStore from './MusicKitStore'
import RootStore from './RootStore'

export default class PlayerStore {
  rootStore: RootStore
  musicKit: MusicKitStore
  nowPlaying: MusicKit.MediaItem | null = null
  playerInstance: MusicKit.Player | null = null
  playbackTime: number = 0
  playbackProgress: number = 0
  progressInterval: ReturnType<typeof setInterval>
  timeInterval: ReturnType<typeof setInterval>

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
      () => this.setPlaybackProgress(this.playbackProgress + 0.102),
      100,
    )
  }

  stopProgress = () => {
    this.setPlaybackProgress(0)
    clearInterval(this.progressInterval)
  }

  startTime = () => {
    this.timeInterval = setInterval(() => {
      this.setPlaybackTime(this.playbackTime + 1)
    }, 1000)
  }

  stopTime = () => {
    this.setPlaybackProgress(0)
    clearInterval(this.progressInterval)
  }

  reset = () => {
    console.log('here')
    this.stopTime()
    this.stopProgress()
    this.setPlaybackProgress(0)
    this.setPlaybackTime(0)
  }

  get playbackDuration() {
    return this.nowPlaying?.playbackDuration ?? 0
  }

  get p() {
    return this.musicKit.instance?.player
  }

  setNowPlaying = (value: MusicKit.MediaItem) => {
    console.log(value)
    this.nowPlaying = value
  }
}
