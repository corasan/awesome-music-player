import { Grid, Container, Row } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import PlayerControls from '~/components/Player/PlayerControls'
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
      <Playlists />
      <Grid lg>
        <Container css={{ border: '2px solid blue', p: 0 }} direction="column">
          <Grid lg css={{ height: '92%', border: '2px solid red' }}></Grid>
          <Grid
            lg
            justify="center"
            alignItems="center"
            css={{ border: '2px solid purple', pt: 20, pb: 20, backgroundColor: '#afafaf' }}
          >
            <PlayerControls />
          </Grid>
        </Container>
      </Grid>
    </Grid.Container>
  )
}

export default observer(Player)
