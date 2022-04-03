import { makeAutoObservable } from 'mobx'

export default class MusicKitStore {
  developerToken: string | null = null
  instance: any = null
  authorizationToken: string | null = null
  playlists: MusicKit.Playlist[] = []
  authorizationLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  async authorize(): Promise<string> {
    this.setAuthorizationLoading(true)
    const res = await this.instance.authorize()
    this.setAuthorizationToken(res)
    this.setAuthorizationLoading(false)
    return res
  }

  async loadPlaylists() {
    const res = await this.instance?.api.library.playlists(null)
    this.setPlaylists(res)
  }

  setInstance(value: any) {
    this.instance = value
  }

  setPlaylists(value: MusicKit.Playlist[]) {
    this.playlists = value
  }

  setAuthorizationToken(value: string) {
    this.authorizationToken = value
  }

  setAuthorizationLoading(value: boolean) {
    this.authorizationLoading = value
  }
}
