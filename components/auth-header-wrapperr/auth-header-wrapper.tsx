import { auth } from '@/auth';
import { Header } from '../header/header';

export const AuthHeaderWrapper = async () => {
  const session = await auth();
  console.log('AuthHeaderWrapper(): session = %o', session);
  return <Header user={session?.user} />;
};
