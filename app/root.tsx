import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { NextUIProvider } from '@nextui-org/react'
import StoreProvider, { useStore } from '~/stores'
import getDeveloperToken from './util/getDeveloperToken'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export const loader = async () => {
  const TEAM_ID = process.env.TEAM_ID as string
  const KEY_ID = process.env.KEY_ID as string
  const PRIVATE_KEY = process.env.PRIVATE_KEY as string
  const developerToken = getDeveloperToken(TEAM_ID, KEY_ID, PRIVATE_KEY.replace(/\\n/gm, '\n'))

  return { developerToken }
}

const App = observer(() => {
  const data = useLoaderData()
  const { musicKit } = useStore()

  const setup = async () => {
    const instance = MusicKit.configure({
      developerToken: data.developerToken,
      app: {
        name: 'My Cool Web App',
        build: '1978.4.1',
      },
    })
    musicKit.setInstance(instance)
  }

  useEffect(() => {
    if (!musicKit.instance) {
      setup()
    }
  }, [data, musicKit.instance])

  return <Outlet />
})

export default function Root() {
  return (
    <html lang="en" style={{ display: 'flex', flex: 1, height: '100%' }}>
      <head>
        <Meta />
        <Links />
        <script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js" />
      </head>
      <body style={{ display: 'flex', flex: 1, height: '100%' }}>
        <NextUIProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </NextUIProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
