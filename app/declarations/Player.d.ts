declare namespace Player {
  interface Playback {
    currentPlaybackTime: number
    currentPlaybackProgress: number
    currentBufferedProgress: number
    currentPlaybackTimeRemaining: number
    nowPlaying: NowPlaying
  }
}

interface NowPlaying {
  artistName: string
  albumName: string
  artworkURL: string
  title: string
}
