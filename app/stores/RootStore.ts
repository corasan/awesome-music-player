import { makeAutoObservable } from 'mobx'
import MusicKitStore from './MusicKitStore'

export default class RootStore {
  developerToken: string | null = null
  musicKit: MusicKitStore

  constructor() {
    makeAutoObservable(this)
    this.musicKit = new MusicKitStore()
  }

  setDeveloperToken = (value: string) => {
    this.developerToken = value
  }
}
