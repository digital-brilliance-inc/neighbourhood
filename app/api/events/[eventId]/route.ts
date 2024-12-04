import { EventModel } from '@/lib/model/event-model';
import mongoDBClient from '@/lib/mongodb/client';

export const revalidate = 0;

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const eventId = (await params).eventId;
  const filter: any = { id: eventId };
  const event = await mongoDBClient.db('test').collection('events').findOne<EventModel>(filter);
  return Response.json(event);
}

export async function POST(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const eventId = (await params).eventId;
  const eventModel = await request.json();
  // const response = await mongoDBClient.db('test').collection('events').updateOne({id: eventId}, eventModel);
  console.log('Got request to update eventId %o with data %o', eventId, eventModel);
  const response = { hello: 'world' };
  return Response.json(response);
}
