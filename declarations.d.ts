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
    MusicKit: any
    ENV: {
      TEAM_ID: string
      KEY_ID: string
    }
  }
}
