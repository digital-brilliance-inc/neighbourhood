import { Neighbourhood } from '@/lib/model/neighbourhood';
import clientPromise from '@/lib/mongodb/client';

export async function GET(request: Request) {
  const mongodb = await clientPromise;
  const neighbourhoods = await mongodb.db('test').collection('neighbourhoods').find<Neighbourhood>({}).toArray();
  return Response.json(neighbourhoods);
}
