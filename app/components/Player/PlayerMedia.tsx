import { Card, Container, Text } from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/stores'

const PlayerMedia = () => {
  const { player } = useStore()
  const playing = player.nowPlaying
  return (
    <Container display="flex" justify="center" alignItems="center" direction="column">
      {playing && (
        <>
          <Card cover css={{ height: 550, width: 550 }}>
            <Card.Image
              src={playing?.artworkURL}
              alt={`Artwork for song ${playing?.title} by ${playing?.artistName}`}
              height="100%"
              width="100%"
            />
          </Card>
          <Text h2 css={{ mt: 30 }}>
            {playing?.title}
          </Text>
          <Text h4 css={{ mt: 10 }} color="$gray400">
            {playing.artistName}
          </Text>
        </>
      )}
    </Container>
  )
}

export default observer(PlayerMedia)
