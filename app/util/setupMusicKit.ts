export default function setupMusicKit(developerToken: string) {
  return new Promise<any>(resolve => {
    const musicKitInstance = window.MusicKit.configure({
      developerToken,
      app: {
        name: 'Awesome Music Player',
        build: '1.0.0',
      },
    })
    delete window.MusicKit // clear global scope
    resolve(musicKitInstance)
  })
}
