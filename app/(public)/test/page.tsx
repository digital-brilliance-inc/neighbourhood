import { keystoneContext } from '@/keystone/context';

export default async function Page() {
  const session = {};
  const context = await keystoneContext;
  // console.log('keystone context = %o', keystoneContext);
  // const users = await keystoneContext.withSession(session).query.User.findMany({
  //   // query: 'id name about { document }',
  //   where: { posts: { some: { title: { equals: 'This is a new post' } } } },
  // });

  // console.log('users = %o', users);

  return (
    <div className="page-events">
      <div className="flex-container">Hello</div>
    </div>
  );
}
