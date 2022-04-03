import getDeveloperToken from '~/util/getDeveloperToken'

export async function action() {
  const TEAM_ID = process.env.TEAM_ID as string
  const KEY_ID = process.env.KEY_ID as string
  const PRIVATE_KEY = process.env.PRIVATE_KEY as string
  const developerToken = getDeveloperToken(TEAM_ID, KEY_ID, PRIVATE_KEY)
  return { developerToken }
}

export default function Config() {
  return <div>Configuring Apple Music</div>
}
