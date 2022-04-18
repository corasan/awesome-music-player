import { Grid } from '@nextui-org/react'
import { Outlet } from '@remix-run/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import PlayerControls from '~/components/Player/PlayerControls'
import PlayerMedia from '~/components/Player/PlayerMedia'
import Playlists from '~/components/Player/Playlists'
import { useStore } from '~/stores'
import PlaylistId from './player/__playlist/$playlistId'

function Player() {
  const { musicKit, player } = useStore()

  const loadPlaylists = async () => {
    await musicKit.loadPlaylists()
  }

  useEffect(() => {
    loadPlaylists()
  }, [musicKit.instance])

  return (
    <Grid.Container css={{ height: '100vh' }}>
      <Grid
        xs={2}
        css={{
          borderRight: '1px solid #cfcfcf3f',
          overflow: 'auto',
        }}
        direction="column"
      >
        <Playlists />
      </Grid>
      <Grid lg direction="column">
        <Grid lg>
          <Outlet />
        </Grid>
        <Grid css={{ pt: 30, pb: 50 }}>
          <PlayerControls />
        </Grid>
      </Grid>
    </Grid.Container>
  )
}

export default observer(Player)
