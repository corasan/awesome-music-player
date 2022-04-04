import { Grid } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import PlayerControls from '~/components/PlayerControls'
import Playlists from '~/components/Playlists'
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
      <PlayerControls />
    </Grid.Container>
  )
}

export default observer(Player)
