import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '~/stores'

const PlayerControls = (props: any) => {
  const { player, musicKit } = useStore()

  useEffect(() => {
    // player.setPlayerInstance()
  }, [musicKit.instance])

  console.log(player.nowPlaying)
  return <div />
}

export default observer(PlayerControls)
