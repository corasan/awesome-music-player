import { Progress, Grid, Text } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import formatSeconds from '~/util/formatSeconds'

const PlayerControls = () => {
  const { player, musicKit } = useStore()
  const opacity = player.nowPlaying ? 1 : 0.1

  useEffect(() => {
    if (musicKit.instance) {
      player.mediaDidChangeListener()
      player.timeDidChangeListener()
      player.playbackStateDidChangeListener()
    }

    return () => player.removeListeners()
  }, [musicKit.instance])

  return (
    <Grid.Container direction="row" justify="space-evenly" alignItems="center" css={{ opacity }}>
      <Grid xs={2} justify="center">
        <Text>{!player.nowPlaying ? '--:--' : formatSeconds(player.playbackTime)}</Text>
      </Grid>
      <Grid lg>
        {!player.nowPlaying ? (
          <Progress value={0} color="gradient" size="xs" min={0} max={100} />
        ) : (
          <Progress
            value={player.playbackProgress}
            color="gradient"
            size="xs"
            min={0}
            max={player.playbackDuration}
            shadow
          />
        )}
      </Grid>
      <Grid xs={2} justify="center">
        <Text>
          {player.playbackDuration !== 0 ? formatSeconds(player.playbackDuration) : '--:--'}
        </Text>
      </Grid>
    </Grid.Container>
  )
}

export default observer(PlayerControls)