import { ActionFunction } from '@remix-run/node'
import { useActionData, useNavigate } from '@remix-run/react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import getDeveloperToken from '~/util/getDeveloperToken'

export const action: ActionFunction = () => {
  const TEAM_ID = process.env.TEAM_ID as string
  const KEY_ID = process.env.KEY_ID as string
  const PRIVATE_KEY = process.env.PRIVATE_KEY as string
  const developerToken = getDeveloperToken(TEAM_ID, KEY_ID, PRIVATE_KEY)

  return { developerToken }
}

const Setup = observer(() => {
  const data = useActionData()
  const { developerToken, setDeveloperToken } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (data?.developerToken) {
      setDeveloperToken(data.developerToken)
    }
  }, [data, setDeveloperToken])

  useEffect(() => {
    if (developerToken) {
      navigate('/')
    }
  }, [developerToken, navigate])

  return <div>Configuring Apple Music</div>
})

export default Setup
