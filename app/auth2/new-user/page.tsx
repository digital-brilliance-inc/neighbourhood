import { auth, signOut } from '@/auth';

export default async function Page() {
  // signOut({ redirectTo: '/' });
  return <div>Hello from the new-user page</div>;
}
