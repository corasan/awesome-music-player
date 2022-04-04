import { Progress, Grid, Text } from '@nextui-org/react'
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
    <Grid.Container direction="row" justify="space-evenly" alignItems="center">
      <Grid xs={2} justify="center">
        <Text>{currentTime === 0 ? '-:--' : formatSeconds(currentTime)}</Text>
      </Grid>
      <Grid xs={8}>
        <Progress value={currentProgress * 100} color="gradient" size="xs" />
      </Grid>
      <Grid xs={2} justify="center">
        <Text>{duration ? formatSeconds(duration) : '-:--'}</Text>
      </Grid>
    </Grid.Container>
  )
}

export default observer(PlayerControls)
