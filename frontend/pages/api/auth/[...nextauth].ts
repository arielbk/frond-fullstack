import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { API_URL } from '../../../utils/urls'

const options = {
  providers: [
    // OAuth authentication providers
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session: any, user: any) => {
      session.jwt = user.jwt
      session.id = user.id
      session.email = user.email
      return Promise.resolve(session)
    },
    jwt: async (token: any, user: any, account: any) => {
      const isSignIn = user ? true : false
      if (isSignIn) {
        const response = await fetch(
          `${API_URL}/auth/${account?.provider}/callback?access_token=${account?.accessToken}`
        )
        const data = await response.json()
        if (!data.jwt || !data.user) throw new Error('New user was not created')
        token.jwt = data.jwt
        token.id = data.user.id
      }
      return Promise.resolve(token)
    },
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
