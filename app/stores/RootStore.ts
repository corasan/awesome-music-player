import { makeAutoObservable } from 'mobx'
import MusicKitStore from './MusicKitStore'
import PlayerStore from './PlayerStore'

export default class RootStore {
  developerToken: string | null = null
  musicKit: MusicKitStore
  player: PlayerStore

  constructor() {
    makeAutoObservable(this)
    this.musicKit = new MusicKitStore(this)
    this.player = new PlayerStore(this)
  }

  setDeveloperToken = (value: string) => {
    this.developerToken = value
  }
}
