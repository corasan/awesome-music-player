import { makeAutoObservable } from 'mobx'
import RootStore from './RootStore'

export default class MusicKitStore {
  rootStore: RootStore
  developerToken: string | null = null
  instance: any = null
  authorizationToken: string | null = null
  playlists: MusicKit.Playlist[] = []
  authorizationLoading: boolean = false
  currentlyPlaying: string | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async authorize() {
    this.setAuthorizationLoading(true)
    const res = await this.instance.authorize()
    this.setAuthorizationToken(res)
    this.setAuthorizationLoading(false)
    return res
  }

  async loadPlaylists() {
    console.log(this.instance)
    const res = await this.instance?.api.library.playlists(null)
    this.setPlaylists(res)
  }

  async playPlaylist(playlist: string) {
    await this.instance.setQueue({
      playlist,
    })
    await this.instance.play()
    const current = await this.instance.player.nowPlayingItem
    this.rootStore.player.setCurrentlyPlaying(current)
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
