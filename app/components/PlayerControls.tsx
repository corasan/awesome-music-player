import { observer } from 'mobx-react-lite'
import { useStore } from '~/stores'

const PlayerControls = (props: any) => {
  const { player } = useStore()
  console.log(player.nowPlaying)
  return <div />
}

export default observer(PlayerControls)
