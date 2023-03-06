import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { prisma } from '../../../prisma/db'

export default NuxtAuthHandler({
  secret: process.env.NUXT_SECRET,
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text'},
        password: { label: 'Password', type: 'password'}
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findMany({
          where: {
            username: credentials.username,
            password: credentials.password
          },
        })
      
        if (user.length > 0) {
          return user[0]
        } else {
          console.error('Warning: Malicious login attempt registered, bad credentials provided')
          return null
        }
      }
    })
  ]
})
