import { makeAutoObservable } from 'mobx'

export default class MusicKitStore {
  developerToken: string | null = null
  instance: any = null
  authorizationToken: string | null = null
  playlists: MusicKit.Playlist[] = []

  constructor() {
    makeAutoObservable(this)
  }

  async authorize(): Promise<string> {
    const res = await this.instance.authorize()
    this.authorizationToken = res
    return res
  }

  async loadPlaylists() {
    const res = await this.instance?.api.library.playlists(null)
    this.setPlaylists(res)
  }

  setInstance(value: any) {
    console.log('setInstance', value)
    this.instance = value
  }

  setPlaylists(value: MusicKit.Playlist[]) {
    this.playlists = value
  }
}
