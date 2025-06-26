import { dbConnect } from '@/lib/dbConnect'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UserModel } from '@/models/user.model'
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import { NextResponse } from 'next/server'
import { JWT } from 'next-auth/jwt'
import { Account, Session, User } from 'next-auth'



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
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ): Promise<User | null> {
        await dbConnect()

        try {
          const user = await UserModel.findOne({
            $or: [
              { username: credentials?.email },
              { email: credentials?.email },
            ],
          })

          if (!user) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials?.password || '',
            user.password
          )
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          }
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.email = token.email as string
      }
      return session
    },
    async signIn({ user, account }: { user: User; account: Account | null }) {
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
    strategy: 'jwt' as const,
  },

  pages: {
    signIn: '/sign-up',
  },

  secret: process.env.NEXTAUTH_SECRET,
}
