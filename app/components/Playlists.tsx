import { Grid, Link } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/stores'

const Playlists = () => {
  const { musicKit } = useStore()
  return (
    <Grid xs={2} css={{ height: '100%', p: 15, overflow: 'auto' }} direction="column">
      {musicKit.playlists?.map(p => (
        <PlaylistItem key={p.id} label={p.attributes.name} />
      ))}
    </Grid>
  )
}

const PlaylistItem = ({ label }: { label: string }) => (
  <Link block color="primary">
    {label}
  </Link>
)

export default observer(Playlists)
