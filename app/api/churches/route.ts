import { Church } from '@/lib/model/church';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import getClientPromise from '@/lib/mongodb/client';

export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const filter: any = {};
  if (params.get('sponsor') === 'true') {
    filter.isSponsor = true;
  }
  const mongodb = await getClientPromise();
  const churches = await mongodb.db('test').collection('churches').find<Church>(filter).toArray();
  return Response.json(churches);
}
