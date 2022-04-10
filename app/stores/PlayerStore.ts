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
  isPlaying: boolean = false

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

  pauseProgress = () => {
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

  resetAll = () => {
    this.resetValues()
    this.resetIntervals()
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
        this.setNowPlaying(this.musicKit.instance?.player.nowPlayingItem as MusicKit.MediaItem)
      }
    })
  }

  mediaWillChangeListener = () => {
    this.musicKit.instance?.addEventListener('mediaItemWillChange', () => {
      this.resetIntervals()
      this.resetValues()
    })
  }

  playbackStateDidChangeListener = () => {
    this.musicKit.instance?.addEventListener('playbackStateDidChange', ({ oldState, state }) => {
      //   0 - NONE,
      //   1 - LOADING,
      //   2 - PLAYING,
      //   3 - PAUSED,
      //   4 - STOPPED,
      //   5 - ENDED,
      //   6 - SEEKING,
      //   7 - waiting,
      //   8 = stalled,
      //   9 - completed,
      switch (state) {
        case 2:
          this.setIsPlaying(true)
          this.startProgress()
          break
        case 3:
          this.setIsPlaying(false)
          this.pauseProgress()
          break
        case 5:
          this.resetAll()
          break
      }
    })
  }

  removeListeners = () => {
    this.musicKit.instance?.removeEventListener('playbackTimeDidChange', this.timeDidChangeListener)
    this.musicKit.instance?.removeEventListener('mediaItemDidChange', this.mediaDidChangeListener)
    this.musicKit.instance?.removeEventListener('mediaItemWillChange', this.mediaWillChangeListener)
    this.musicKit.instance?.removeEventListener(
      'playbackStateDidChange',
      this.playbackStateDidChangeListener,
    )
  }

  get playbackDuration() {
    if (this.nowPlaying) {
      return Number(this.nowPlaying?.playbackDuration.toFixed()) / 1000
    }
    return 0
  }

  setNowPlaying = (value: MusicKit.MediaItem | null) => {
    this.nowPlaying = value
  }

  setIsPlaying = (value: boolean) => {
    this.isPlaying = value
  }
}
