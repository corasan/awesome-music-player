import { Progress, Grid, Text } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import formatSeconds from '~/util/formatSeconds'

const PlayerControls = () => {
  const { player } = useStore()

  useEffect(() => {
    if (player.nowPlaying) {
      player.startProgress()
      player.startTime()
    }

    return () => player.stopIntervals()
  }, [player.nowPlaying])

  useEffect(() => {
    if (player.playbackProgress >= player.playbackDuration) {
      player.reset()
    }
  }, [player.playbackProgress])

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
            max={player.playbackDuration}
          />
        )}
      </Grid>
      <Grid xs={2} justify="center">
        <Text>
          {player.playbackDuration !== 0 ? formatSeconds(player.playbackDuration) : '-:--'}
        </Text>
      </Grid>
    </Grid.Container>
  )
}

export default observer(PlayerControls)
