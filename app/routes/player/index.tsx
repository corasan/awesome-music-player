import { Grid } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import PlayerControls from '~/components/Player/PlayerControls'
import PlayerMedia from '~/components/Player/PlayerMedia'
import Playlists from '~/components/Player/Playlists'
import { useStore } from '~/stores'

function Player() {
  const { musicKit } = useStore()

  const loadPlaylists = async () => {
    await musicKit.loadPlaylists()
  }

  useEffect(() => {
    loadPlaylists()
  }, [musicKit.instance])

  return (
    <Grid.Container>
      <Grid
        xs={2}
        css={{ borderRight: '1px solid #cfcfcf3f', overflow: 'auto' }}
        direction="column"
      >
        <Playlists />
      </Grid>
      <Grid lg direction="column">
        <Grid lg>
          <PlayerMedia />
        </Grid>
        <Grid css={{ pt: 30, pb: 50 }}>
          <PlayerControls />
        </Grid>
      </Grid>
    </Grid.Container>
  )
}

export default observer(Player)
