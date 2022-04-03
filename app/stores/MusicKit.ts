import { makeAutoObservable } from 'mobx'

export default class MusicKit {
  developerToken: string | null = null
  instance: any
  authorizationToken: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async authorize(): Promise<string> {
    const res = await this.instance.authorize()
    this.authorizationToken = res
    return res
  }

  async playlists() {
    const playlists = await this.instance.api.library.playlists(null)
    console.log(playlists)
  }

  setInstance(value: any) {
    this.instance = value
  }
}
