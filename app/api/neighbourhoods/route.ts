import { Neighbourhood } from '@/lib/model/neighbourhood';
import mongoDBClient from '@/lib/mongodb/client';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { list } from '@vercel/blob';

export const revalidate = 0;

export const GET = async (req: NextRequest): Promise<Response> => {
  // const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET!, salt: 'hello' });
  // console.log('/GET(): getToken = %o', token);

  // const session = await auth(req, res);
  // console.log('/GET(): session = %o', session);

  const neighbourhoods = (
    await mongoDBClient.db('test').collection('neighbourhoods').find<Neighbourhood>({}).toArray()
  ).map((n) => ({
    ...n,
    userId: undefined,
  }));
  // return Response.json(neighbourhoods);
  const images = await list({ prefix: 'milton/neighbourhoods/' });
  console.log('/api/neighbourhoods/route.GET: images = ' + JSON.stringify(images, null, 2));

  // Combine the neighbourhood definitions and the images together
  for (let n of neighbourhoods) {
    n.imageUrls = images.blobs
      .filter((img: any) => n.imagesPath && img.pathname.indexOf(n.imagesPath) > -1 && img.size > 0)
      .map((blobResult) => blobResult.url);
  }

  return Response.json(neighbourhoods);
};
