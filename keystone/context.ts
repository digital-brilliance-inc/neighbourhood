import { getContext } from '@keystone-6/core/context';
import config from '../keystone';
import { type Context } from '.keystone/types';
import * as PrismaModule from '@prisma/client';

// Making sure multiple prisma clients are not created during hot reloading
export const keystoneContext: Context = (globalThis as any).keystoneContext ?? getContext(config, PrismaModule);

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).keystoneContext = keystoneContext;
}

// // keystone/context.ts
// import { createContext as createKeystoneContext } from '@/keystone/context'; // adjust path
// export const createContext = async () => {
//   return await createKeystoneContext();
// };

// import { getContext } from '@keystone-6/core/context';
// import { createSystem } from '@keystone-6/core/system';
// import config from '../keystone'; // adjust if your keystone config is somewhere else

// const { graphQLSchema, adminMeta } = createSystem(config);

// export async function createContext() {
//   return getContext(graphQLSchema, adminMeta, config, {}); // empty req/res for server use
// }
