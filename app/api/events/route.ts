import { EventModel } from '@/lib/model/event-model';
import mongoDBClient from '@/lib/mongodb/client';

export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const filter: any = {};
  const events = await mongoDBClient.db('test').collection('events').find<EventModel>(filter).toArray();
  return Response.json(events);
}
