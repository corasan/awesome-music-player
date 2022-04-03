import { useEffect } from 'react'
import { useSubmit } from '@remix-run/react'
import { useStore } from '~/stores'
import { observer } from 'mobx-react-lite'

const Index = observer(() => {
  const submit = useSubmit()
  const { developerToken } = useStore()

  useEffect(() => {
    if (!developerToken) {
      submit(null, { method: 'post', action: '/setup' })
    }
  }, [developerToken, submit])

  return <div />
})

export default Index
