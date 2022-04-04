import { Progress, Grid, Text } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useStore } from '~/stores'
import formatSeconds from '~/util/formatSeconds'

const PlayerControls = () => {
  const { player, musicKit } = useStore()
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
    if (player.p?.nowPlayingItem) {
      player.startProgress()
    } else {
      player.stopProgress()
    }
    return () => player.stopProgress()
  }, [player.p?.nowPlayingItem])

  return (
    <Grid.Container direction="row" justify="space-evenly" alignItems="center">
      <Grid xs={2} justify="center">
        {!player.p?.nowPlayingItem ? (
          <Text>-:--</Text>
        ) : (
          <Text>{formatSeconds(player.playbackTime)}</Text>
        )}
      </Grid>
      <Grid xs={8}>
        {!player.p?.nowPlayingItem ? (
          <Progress value={0} color="gradient" size="xs" min={0} max={100} />
        ) : (
          <Progress
            value={player.playbackProgress}
            color="gradient"
            size="xs"
            min={0}
            max={duration}
          />
        )}
      </Grid>
      <Grid xs={2} justify="center">
        <Text>{duration ? formatSeconds(duration) : '-:--'}</Text>
      </Grid>
    </Grid.Container>
  )
}

export default observer(PlayerControls)
