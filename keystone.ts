import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { TypeInfo } from '.keystone/types';
import { withAuth, session } from './keystone.auth';

// keystone.ts

const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
      password: password({ validation: { isRequired: true } }),
    },
  }),
  Post: list({
    access: allowAll,
    fields: {
      title: text(),
      content: document({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
      }),
      publishedAt: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      status: select({
        defaultValue: 'draft',
        ui: { displayMode: 'segmented-control' },
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
      }),
    },
  }),
};

export default config<TypeInfo>(
  withAuth({
    db: {
      provider: 'postgresql',
      // url: 'postgres://dbuser:dbpass@localhost:5432/keystone',
      url: 'prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDFKV0s2UzRNRlBYNkozUTNUMUUwMVlXMlgiLCJ0ZW5hbnRfaWQiOiIwNDQ3NTdlZmY0ZGQ0NmZmMTRjN2ZmMzBhYTE1NmVjOGJjMTNlNWJmMWVjNzY5MjA1YzM1OTA5MjU3NDliZjc1IiwiaW50ZXJuYWxfc2VjcmV0IjoiNWJhMTljZWItMjk2OS00OTJjLWJkOWItMDk2NDAyYzFjNWRmIn0.8F3rFgPzfjGQYZzAcvK9qlNwPicr8_vp6gXS8cC6MCY',
      onConnect: async (context) => {
        console.log('Connected to DB');
      },
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: 'uuid' },
    },
    lists,
    session,
    ui: {
      isDisabled: true,
    },
    graphql: {
      path: '/api/graphql', // Keystone will serve GraphQL here
    },
  }),
);
