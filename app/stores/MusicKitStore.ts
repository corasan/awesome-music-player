import { makeAutoObservable } from 'mobx'
import RootStore from './RootStore'

export default class MusicKitStore {
  rootStore: RootStore
  developerToken: string | null = null
  instance: MusicKit.MusicKitInstance | null = null
  authorizationToken: string | null = null
  playlists: Resource[] = []
  authorizationLoading: boolean = false
  currentlyPlaying: string | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  async authorize() {
    this.setAuthorizationLoading(true)
    const res = await this.instance?.authorize()
    if (res) {
      this.setAuthorizationToken(res)
      this.setAuthorizationLoading(false)
    }
  }

  async loadPlaylists() {
    const res = (await this.instance?.api.library.playlists(null)) as Resource[]
    this.setPlaylists(res ?? [])
  }

  async playPlaylist(playlist: string) {
    await this.instance?.setQueue({
      playlist,
    })
    await this.instance?.play()
    const current = this.instance?.player.nowPlayingItem
    if (current) {
      this.rootStore.player.setNowPlaying(current)
    }
  }

  setInstance(value: any) {
    this.instance = value
  }

  setPlaylists(value: Resource[]) {
    this.playlists = value
  }

  setAuthorizationToken(value: string) {
    this.authorizationToken = value
  }

  setAuthorizationLoading(value: boolean) {
    this.authorizationLoading = value
  }
}

type Resource = MusicKit.Resource & { id: string }
