import { Initiative } from '@/lib/model/initiative';
import mongoDBClient from '@/lib/mongodb/client';

export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const filter: any = {};
  const initiatives = await mongoDBClient
    .db('test')
    .collection('initiatives')
    .find<Initiative>(filter, { sort: { order: 'asc' } })
    .toArray();
  return Response.json(initiatives);
}
