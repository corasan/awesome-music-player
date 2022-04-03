import type { MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { NextUIProvider } from '@nextui-org/react'
import StoreProvider from '~/stores'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <StoreProvider>
            <Outlet />
          </StoreProvider>
        </NextUIProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js" />
      </body>
    </html>
  )
}
