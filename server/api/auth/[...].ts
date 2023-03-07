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
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          },
          select: {
            username: true,
            password: true
          }
        })
      
        if (credentials.username === user!.username &&  credentials.password === user!.password) {
          return user
        } else {
          console.error('Warning: Malicious login attempt registered, bad credentials provided')
          return null
        }
      }
    })
  ]
})
