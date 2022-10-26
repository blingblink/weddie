
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import GoogleProvider from "next-auth/providers/google";

// const authHandler = (req, res) => NextAuth(req, res, options);
// 
// export default authHandler;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    })
  ],
  // jwt: {
  //   encryption: true
  // },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);