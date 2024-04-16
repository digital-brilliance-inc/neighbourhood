import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import type { NextAuthConfig } from 'next-auth';
import Nodemailer from '@auth/core/providers/nodemailer';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './lib/mongodb/client';
import { sendVerificationRequest } from './lib/nodemailer/send-verification-request';

export const config = {
  theme: {
    logo: '/litn-logo.png',
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    Nodemailer({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      name: 'Email',
      sendVerificationRequest,
      from: process.env.EMAIL_FROM,
    }),
  ],
  basePath: '/api/auth',
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
    jwt({ token, trigger, session, profile }) {
      // console.log('jwt(): token = %o, trigger = %o, session = %o, profile = %o', token, trigger, session, profile);
      if (trigger === 'update') token.name = session.user.name;
      return token;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  pages: {
    // signIn: '/auth2/signin',
    // signOut: '/auth2/signout',
    //   error: '/auth2/error', // Error code passed in query string as ?error=
    //   verifyRequest: '/auth2/verify-request', // (used for check email message)
    newUser: '/auth2/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
