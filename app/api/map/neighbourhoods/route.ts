import { Neighbourhood } from '@/lib/model/neighbourhood';
import getClientPromise from '@/lib/mongodb/client';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export const revalidate = 0;

export const GET = async (req: NextRequest, res: NextResponse) => {
  // const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET!, salt: 'hello' });
  // console.log('/GET(): getToken = %o', token);

  // const session = await auth(req, res);
  // console.log('/GET(): session = %o', session);

  const mongodb = await getClientPromise();
  const neighbourhoods = (await mongodb.db('test').collection('neighbourhoods').find<Neighbourhood>({}).toArray()).map(
    (n) => ({
      ...n,
      userId: undefined,
    }),
  );
  return Response.json(neighbourhoods);
};
