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
      () => this.setPlaybackProgress(this.playbackProgress + 0.1),
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
    this.setPlaybackTime(0)
    clearInterval(this.timeInterval)
  }

  resetValues = () => {
    this.setPlaybackProgress(0)
    this.setPlaybackTime(0)
  }

  resetIntervals = () => {
    this.stopTime()
    this.stopProgress()
  }

  timeDidChangeListener = () => {
    this.musicKit.instance?.addEventListener('playbackTimeDidChange', () => {
      this.setPlaybackTime(this.playbackTime + 0.25)
    })
  }

  mediaDidChangeListener = () => {
    this.musicKit.instance?.addEventListener('mediaItemDidChange', () => {
      const media = this.musicKit.instance?.player.nowPlayingItem
      if (media) {
        setTimeout(() => {
          this.setNowPlaying(this.musicKit.instance?.player.nowPlayingItem as MusicKit.MediaItem)
        }, 100)
      }
    })
  }

  mediaWillChangeListener = () => {
    this.musicKit.instance?.addEventListener('mediaItemWillChange', () => {
      this.resetIntervals()
      this.resetValues()
    })
  }

  get playbackDuration() {
    if (this.nowPlaying) {
      return Number(this.nowPlaying?.playbackDuration.toFixed()) / 1000
    }
    return 0
  }

  get p() {
    return this.musicKit.instance?.player
  }

  setNowPlaying = (value: MusicKit.MediaItem) => {
    console.log(value)
    this.nowPlaying = value
  }
}
