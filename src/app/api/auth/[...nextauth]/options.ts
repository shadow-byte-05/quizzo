import { dbConnect } from '@/lib/dbConnect'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UserModel } from '@/models/user.model'
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect()

        try {
          const user = await UserModel.findOne({
            $or: [
              { username: credentials?.email },
              { email: credentials?.email },
            ],
          })

          if (!user) {
            throw new Error('User not found')
          }

          const isPasswordValid = await bcrypt.compare(
            credentials?.password || '',
            user.password
          )
          if (!isPasswordValid) {
            throw new Error('Invalid password')
          }

          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          }
        } catch (error) {
          throw new Error('Authorization failed')
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.email = token.email
      }
      return session
    },
    async signIn({ user, account }: any) {
      await dbConnect()

      if (account?.provider === 'google') {
        const userRegistered = await UserModel.findOne({ email: user.email })

        if (!userRegistered) {
          await UserModel.create({
            username: user.email.split('@')[0],
            email: user.email,
            image: user.image,
            provider: 'google',
            password: '', // no password for google users
          })
        }
      }

      return true
    },
  },

  session: {
    strategy: "jwt" as const,
  },

  pages: {
    signIn: '/sign-up',
  },

  secret: process.env.NEXTAUTH_SECRET,
}
