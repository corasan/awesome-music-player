import { makeAutoObservable } from 'mobx'

export default class RootStore {
  developerToken: string | null = null

  constructor() {
    // all stores here
    makeAutoObservable(this)
  }

  setDeveloperToken = (value: string) => {
    this.developerToken = value
  }
}
