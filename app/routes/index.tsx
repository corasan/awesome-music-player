import { useCallback, useEffect } from 'react'
import { useSubmit } from '@remix-run/react'
import { useStore } from '~/stores'
import { observer } from 'mobx-react-lite'
import setupMusicKit from '~/util/setupMusicKit'

const Index = observer(() => {
  const submit = useSubmit()
  const { developerToken, setMusicKitInstance, musicKit } = useStore()

  const reqMusicKit = useCallback(async (token: string) => {
    const kit = await setupMusicKit(token)
    const res = await kit.authorize()
    console.log(res)
    setMusicKitInstance(kit)
  }, [])

  const authorize = useCallback(async () => {
    await musicKit.authorize()
  }, [])

  useEffect(() => {
    if (!developerToken) {
      submit(null, { method: 'post', action: '/setup' })
    } else {
      reqMusicKit(developerToken)
    }
  }, [developerToken, submit])

  return <div />
})

export default Index
