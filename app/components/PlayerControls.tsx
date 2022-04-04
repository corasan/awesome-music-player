import { Progress, Grid, Text } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import formatSeconds from '~/util/formatSeconds'

const PlayerControls = () => {
  const { player } = useStore()
  const duration = player.playbackDuration / 1000

  useEffect(() => {
    if (player.nowPlaying) {
      player.startProgress()
      player.startTime()
    }

    if (player.playbackTime >= player.playbackDuration) {
      player.reset()
    }

    return () => player.reset()
  }, [player.nowPlaying])

  return (
    <Grid.Container direction="row" justify="space-evenly" alignItems="center">
      <Grid xs={2} justify="center">
        {!player.nowPlaying ? <Text>-:--</Text> : <Text>{formatSeconds(player.playbackTime)}</Text>}
      </Grid>
      <Grid xs={8}>
        {!player.nowPlaying ? (
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
        <Text>{duration !== 0 ? formatSeconds(duration) : '-:--'}</Text>
      </Grid>
    </Grid.Container>
  )
}

export default observer(PlayerControls)
