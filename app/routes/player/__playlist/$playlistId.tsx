import { Button } from '@nextui-org/react'
import { useParams } from '@remix-run/react'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from '~/stores'

export function loader({ params }: { params: Params }) {
  console.log(params)
  const id = params.playlistId
  return id
}

const PlaylistId = () => {
  const { playlistId } = useParams()
  const { musicKit, player } = useStore()
  const [songs, setSongs] = useState<MusicKit.MediaItem[]>([])

  const loadPlaylist = useCallback(async () => {
    try {
      const res = await musicKit.instance?.api.library.playlist(playlistId as string)
      if (res) {
        player.setCurrentPlaylist(res)
        // @ts-ignore
        setSongs(res?.relationships.tracks.data as MusicKit.MediaItem[])
      }
    } catch (error) {
      console.log(error)
    }
  }, [playlistId])

  const play = async (id: string) => {
    await musicKit.instance?.setQueue({ song: id })
    await musicKit.instance?.play()
  }

  useEffect(() => {
    loadPlaylist()
  }, [playlistId])

  return (
    <div>
      <h1>{player.currentPlaylist?.attributes.name}</h1>
      {songs.map(song => (
        <Button light color="primary" onClick={() => play(song.id)} key={song.id}>
          {song.attributes.name}
        </Button>
      ))}
    </div>
  )
}

type Params = {
  playlistId: string
}

export default observer(PlaylistId)
