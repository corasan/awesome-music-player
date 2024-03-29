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
import { NextUIProvider, createTheme } from '@nextui-org/react'
import StoreProvider, { useStore } from '~/stores'
import getDeveloperToken from './util/getDeveloperToken'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import useDarkMode from 'use-dark-mode'

const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: '#1a171b',
      controlBlur: '#fff',
    },
  },
})

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Awesome Music Player',
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
  const darkMode = useDarkMode(false)
  const { musicKit } = useStore()

  const setup = async () => {
    const instance = MusicKit.configure({
      developerToken: data.developerToken,
      app: {
        name: 'Awesome Music Player',
        build: '1.0.0',
      },
    })
    musicKit.setInstance(instance)
  }

  useEffect(() => {
    if (!musicKit.instance) {
      setup()
    }
  }, [data, musicKit.instance])

  return (
    <NextUIProvider theme={!darkMode.value ? darkTheme : lightTheme}>
      <Outlet />
    </NextUIProvider>
  )
})

export default function Root() {
  return (
    <html lang="en" style={{ height: '100vh', width: '100vw' }}>
      <head>
        <Meta />
        <Links />
        <script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js" />
      </head>
      <body style={{ height: '100vh', width: '100vw' }}>
        <StoreProvider>
          <App />
        </StoreProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
