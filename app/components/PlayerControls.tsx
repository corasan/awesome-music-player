import { Container, Progress } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import formatSeconds from '~/util/formatSeconds'

const PlayerControls = (props: any) => {
  const { player, musicKit } = useStore()
  const [currentProgress, setCurrentProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const duration = player.p?.currentPlaybackDuration

  useEffect(() => {
    const timeout = setInterval(() => {
      if (player.p?.nowPlayingItem) {
        setCurrentTime(player.p.currentPlaybackTime)
        setCurrentProgress(() => player.playbackProgress)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [musicKit.instance])

  return (
    <>
      <Progress value={currentProgress * 100} color="gradient" />
      <p>Time: {currentTime === 0 ? '-:--' : formatSeconds(currentTime)}</p>
      <p> progress: {currentProgress}</p>
      <p>Duration: {duration ? formatSeconds(duration) : '-:--'}</p>
    </>
  )
}

export default observer(PlayerControls)
