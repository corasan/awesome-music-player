import { Grid } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '~/stores'

function Player() {
  const { musicKit } = useStore()

  const loadPlaylists = async () => {
    await musicKit.loadPlaylists()
  }

  useEffect(() => {
    loadPlaylists()
  }, [musicKit.instance])

  return <Grid.Container></Grid.Container>
}

export default observer(Player)
