import { makeAutoObservable } from 'mobx'

export default class RootStore {
  developerToken: string | null = null
  musicKit: any

  constructor() {
    // all stores here
    makeAutoObservable(this)
  }

  setDeveloperToken = (value: string) => {
    this.developerToken = value
  }

  setMusicKitInstance = (value: any) => {
    this.musicKit = value
  }
}
