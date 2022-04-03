// @ts-ignore
import jwt from 'jsonwebtoken'

export default function getDeveloperToken(TEAM_ID: string, KEY_ID: string, PRIVATE_KEY: string) {
  return jwt.sign({}, PRIVATE_KEY, {
    algorithm: 'ES256',
    expiresIn: '180d',
    issuer: TEAM_ID,
    header: {
      alg: 'ES256',
      kid: KEY_ID,
    },
  })
}
