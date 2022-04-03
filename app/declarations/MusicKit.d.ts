declare namespace MusicKit {
  export interface Playlist {
    attributes: {
      name: string
      artwork: {
        height: null
        url: string
        width: null
      }
      canEdit: boolean
      hasCatalog: boolean
      dateAdded: Date
      isPublic: boolean
      description: { standard: string }
      playParams: {
        globalId: string
        id: string
        isLibrary: boolean
        kind: string
        versionHash: string
      }
    }
    href: string
    id: string
    type: string
  }
}
