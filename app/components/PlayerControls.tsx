import { Progress, Grid, Text } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useStore } from '~/stores'
import formatSeconds from '~/util/formatSeconds'

const PlayerControls = () => {
  const { player, musicKit } = useStore()
  const [currentProgress, setCurrentProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const duration = player.p?.currentPlaybackDuration ?? 0

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.p?.nowPlayingItem) {
        setCurrentTime(prev => prev + 1)
      }
    }, 1000)

    return () => clearTimeout(interval)
  }, [musicKit.instance])

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.p?.nowPlayingItem) {
        if (currentTime < duration) {
          setCurrentProgress(prev => prev + 0.105)
        } else {
          setCurrentProgress(0)
          setCurrentTime(0)
        }
      }
    }, 100)
    return () => clearInterval(interval)
  }, [player.p?.nowPlayingItem, currentProgress])

  return (
    <Grid.Container direction="row" justify="space-evenly" alignItems="center">
      <Grid xs={2} justify="center">
        <Text>{currentTime === 0 ? '-:--' : formatSeconds(currentTime)}</Text>
      </Grid>
      <Grid xs={8}>
        <Progress value={currentProgress} color="gradient" size="xs" min={0} max={duration} />
      </Grid>
      <Grid xs={2} justify="center">
        <Text>{duration ? formatSeconds(duration) : '-:--'}</Text>
      </Grid>
    </Grid.Container>
  )
}

export default observer(PlayerControls)
