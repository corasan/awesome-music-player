import { makeAutoObservable } from 'mobx'
import MusicKit from './MusicKit'

export default class RootStore {
  developerToken: string | null = null
  musicKit: MusicKit

  constructor() {
    makeAutoObservable(this)
    this.musicKit = new MusicKit()
  }

  setDeveloperToken = (value: string) => {
    this.developerToken = value
  }

  setMusicKitInstance = (value: any) => {
    this.musicKit = value
  }
}
