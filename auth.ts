import NextAuth from 'next-auth';
import type { NextAuthConfig, User } from 'next-auth';
import Google from 'next-auth/providers/google';
import Nodemailer from '@auth/core/providers/nodemailer';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import mongoDBClient from './lib/mongodb/client';
import { sendVerificationRequest } from './lib/nodemailer/send-verification-request';
import { subscribeToMailingList } from './lib/actions';

export const config = {
  theme: {
    logo: '/litn-logo.png',
  },
  adapter: MongoDBAdapter(new Promise((resolve) => resolve(mongoDBClient))),
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      style: {
        bg: '#FFFFFF',
        text: '#000000',
        logo: 'https://authjs.dev/img/providers/facebook.svg',
      },
      authorization: {
        url: 'https://www.facebook.com/v20.0/dialog/oauth',
        params: {
          scope: 'email',
        },
      },
    }),
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
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   authorize: async (credentials, req) => {
    //     // Add logic here to look up the user from the credentials supplied
    //     const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null or false then the credentials will be rejected
    //       return null;
    //       // You can also Reject this callback with an Error or with a URL:
    //       // throw new Error('error message') // Redirect to error page
    //       // throw '/path/to/redirect'        // Redirect to a URL
    //     }
    //   },
    // }),
  ],
  basePath: '/api/auth',
  callbacks: {
    authorized({ request, auth }) {
      console.log('authorized(): auth = %o, request = %o', auth, request);
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
    async jwt({ token, trigger, session, profile }) {
      console.log('jwt(): token = %o, trigger = %o, session = %o, profile = %o', token, trigger, session, profile);
      if (trigger === 'signUp') {
        try {
          await subscribeToMailingList({
            email: profile?.email ?? '',
            firstName: profile?.given_name ?? '',
            lastName: profile?.family_name ?? '',
            pageName: 'signUp',
            pageUri: '/signup',
          });
        } catch (e) {
          console.error('auth.callbacks.jwt(): Error subscribing user to HubSpot: ' + e);
        }
      } else if (trigger === 'update') {
        token.name = session.user.name;
      }
      return token;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    // signIn: '/auth2/signin',
    // signOut: '/auth2/signout',
    //   error: '/auth2/error', // Error code passed in query string as ?error=
    //   verifyRequest: '/auth2/verify-request', // (used for check email message)
    // newUser: '/auth2/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
