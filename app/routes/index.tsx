import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Container, Grid, Loading } from '@nextui-org/react'
import { useStore } from '~/stores'

const Index = () => {
  const { musicKit } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (musicKit.authorizationToken && !musicKit.authorizationLoading) {
      navigate('/player')
    }
  }, [musicKit.authorizationToken, musicKit.authorizationLoading])

  return (
    <Container display="flex" justify="center" alignItems="center" direction="column">
      <img src="/images/apple-music.png" alt="Apple Music Logo" height={100} />
      <Grid.Container justify="center" css={{ pt: 100 }}>
        <Grid xs={2} justify="center">
          <Loading color="error" size="lg" />
        </Grid>
      </Grid.Container>
    </Container>
  )
}

export default observer(Index)
