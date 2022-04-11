import { Progress, Row, Col, Text, Container } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import formatSeconds from '~/util/formatSeconds'
import Pause from '../Svg/Pause'
import Play from '../Svg/Play'
import Step from '../Svg/Step'

const PlayerControls = () => {
  const { player, musicKit } = useStore()
  const opacity = player.nowPlaying ? 1 : 0.2

  useEffect(() => {
    if (musicKit.instance) {
      player.mediaDidChangeListener()
      player.timeDidChangeListener()
      player.playbackStateDidChangeListener()
    }

    return () => player.removeListeners()
  }, [musicKit.instance])

  const play = async () => {
    if (player.isPlaying) {
      musicKit.instance?.pause()
    } else {
      const res = await musicKit.instance?.play()
      console.log(res)
    }
  }

  const next = async () => {
    await musicKit.instance?.skipToNextItem()
  }

  const previous = async () => {
    await musicKit.instance?.skipToPreviousItem()
  }

  const cursor = player.nowPlaying ? 'pointer' : 'default'

  return (
    <Container direction="column" justify="space-evenly" alignItems="center" css={{ opacity }}>
      <Row align="center" justify="center">
        <span onClick={() => previous()} style={{ cursor, marginRight: 20 }}>
          <Step />
        </span>
        <span onClick={() => play()} style={{ cursor }}>
          {player.isPlaying ? <Pause /> : <Play />}
        </span>
        <span onClick={() => next()} style={{ cursor, marginLeft: 20 }}>
          <Step style={{ transform: 'rotate(180deg)' }} />
        </span>
      </Row>
      <Row align="center">
        <Col span={2} css={{ justifyContent: 'center', display: 'flex' }}>
          <Text>{!player.nowPlaying ? '--:--' : formatSeconds(player.playbackTime)}</Text>
        </Col>
        <Col>
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
        </Col>
        <Col span={2} css={{ justifyContent: 'center', display: 'flex' }}>
          <Text>
            {player.playbackDuration !== 0 ? formatSeconds(player.playbackDuration) : '--:--'}
          </Text>
        </Col>
      </Row>
    </Container>
  )
}

export default observer(PlayerControls)
