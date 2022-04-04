import { Button, Grid } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/stores'

const Playlists = () => {
  const { musicKit } = useStore()
  return (
    <Grid xs={2} css={{ height: '100%', p: 15, overflow: 'auto' }} direction="column">
      {musicKit.playlists?.map(p => (
        <PlaylistItem key={p.id} item={p} />
      ))}
    </Grid>
  )
}

const PlaylistItem = ({ item }: { item: MusicKit.Playlist }) => {
  const { musicKit } = useStore()

  return (
    <Button light color="primary" onClick={() => musicKit.playPlaylist(item.id)}>
      {item.attributes.name}
    </Button>
  )
}

export default observer(Playlists)
