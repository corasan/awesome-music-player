import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { observer } from 'mobx-react-lite'
import { useLoaderData } from '@remix-run/react'
import { Container, Grid, Loading } from '@nextui-org/react'
import { useStore } from '~/stores'
import setupMusicKit from '~/util/setupMusicKit'
import getDeveloperToken from '~/util/getDeveloperToken'

export const loader = async () => {
  const TEAM_ID = process.env.TEAM_ID as string
  const KEY_ID = process.env.KEY_ID as string
  const PRIVATE_KEY = process.env.PRIVATE_KEY as string
  const developerToken = getDeveloperToken(TEAM_ID, KEY_ID, PRIVATE_KEY)

  return { developerToken }
}

const Index = observer(() => {
  const data = useLoaderData()
  const { musicKit } = useStore()
  const navigate = useNavigate()

  const authorize = async () => {
    await musicKit.authorize()
  }

  const setup = async (token: string) => {
    const instance = await setupMusicKit(token)
    musicKit.setInstance(instance)
    await authorize()
  }

  useEffect(() => {
    if (data.developerToken) {
      setup(data.developerToken)
    }
  }, [])

  useEffect(() => {
    if (musicKit.authorizationToken && !musicKit.authorizationLoading) {
      navigate('/player')
    }
  }, [musicKit.authorizationToken && !musicKit.authorizationLoading])

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
})

export default Index
