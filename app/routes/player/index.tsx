import { Grid } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect, useCallback } from 'react'
import { useStore } from '~/stores'

function Player() {
  const { musicKit } = useStore()

  const loadPlaylists = useCallback(async () => {
    await musicKit.loadPlaylists()
  }, [])

  console.log(musicKit.playlists)

  useEffect(() => {
    loadPlaylists()
  }, [])

  return <Grid.Container></Grid.Container>
}

export default observer(Player)
