import { Church } from '@/lib/model/church';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import clientPromise from '@/lib/mongodb/client';

export async function GET(request: Request) {
  const mongodb = await clientPromise;
  const churches = await mongodb.db('test').collection('churches').find<Church>({}).toArray();
  return Response.json(churches);
}
