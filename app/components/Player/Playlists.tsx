import { Button } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/stores'

const Playlists = () => {
  const { musicKit } = useStore()
  return (
    <>
      {musicKit.playlists?.map(p => (
        <PlaylistItem key={p.id} item={p} />
      ))}
    </>
  )
}

const PlaylistItem = ({ item }: PlaylistItemProps) => {
  const { musicKit } = useStore()

  return (
    <Button light color="primary" onClick={() => musicKit.playPlaylist(item.id)}>
      {item.attributes.name}
    </Button>
  )
}

type PlaylistItemProps = {
  item: MusicKit.Resource & { id: string }
}

export default observer(Playlists)
