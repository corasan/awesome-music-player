import { Grid, Link } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'

const Playlists = ({ data }: { data: MusicKit.Playlist[] }) => {
  return (
    <Grid xs={2.2} css={{ height: '100%', p: 15 }} direction="column">
      {data.map(p => (
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
