export {}

type musicKitConfig = {
  developerToken: string
  app: {
    name: string
    build: string
  }
}

declare global {
  interface Window {
    musicInstance: any
    MusicKit: any
    ENV: {
      TEAM_ID: string
      KEY_ID: string
    }
  }
}
