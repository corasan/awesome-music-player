import { useEffect } from 'react'
import { useSubmit } from '@remix-run/react'
import StoreProvider from '~/stores'

export default function Index() {
  const submit = useSubmit()

  useEffect(() => {
    submit(null, { method: 'post', action: '/' })
  }, [submit])

  return (
    <StoreProvider>
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}></div>
    </StoreProvider>
  )
}
