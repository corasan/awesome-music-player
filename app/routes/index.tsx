import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Button, Container, Grid, Loading } from '@nextui-org/react'
import { useStore } from '~/stores'

const Index = () => {
  const { musicKit } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (musicKit.instance && musicKit.instance.isAuthorized) {
      navigate('/player')
    }
  }, [musicKit.instance, musicKit.authorizationToken, musicKit.authorizationLoading])

  return (
    <Container display="flex" justify="center" alignItems="center" direction="column">
      <img src="/images/apple-music.png" alt="Apple Music Logo" height={100} />
      <Grid.Container justify="center" css={{ pt: 100 }}>
        <Grid xs={2} justify="center">
          <Button color="error" size="lg" onClick={() => musicKit.authorize()}>
            {musicKit.authorizationLoading ? <Loading color="error" size="lg" /> : 'Authorize'}
          </Button>
        </Grid>
      </Grid.Container>
    </Container>
  )
}

export default observer(Index)
