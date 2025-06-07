"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");

// keystone.auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
var sessionMaxAge = 60 * 60 * 24;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      password: (0, import_fields.password)({ validation: { isRequired: true } })
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)(),
      content: (0, import_fields_document.document)({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ]
      }),
      publishedAt: (0, import_fields.timestamp)(),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineCreate: { fields: ["name", "email"] }
        }
      }),
      status: (0, import_fields.select)({
        defaultValue: "draft",
        ui: { displayMode: "segmented-control" },
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" }
        ]
      })
    }
  })
};
var keystone_default = (0, import_core.config)(
  withAuth({
    db: {
      provider: "postgresql",
      // url: 'postgres://dbuser:dbpass@localhost:5432/keystone',
      url: "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDFKV0s2UzRNRlBYNkozUTNUMUUwMVlXMlgiLCJ0ZW5hbnRfaWQiOiIwNDQ3NTdlZmY0ZGQ0NmZmMTRjN2ZmMzBhYTE1NmVjOGJjMTNlNWJmMWVjNzY5MjA1YzM1OTA5MjU3NDliZjc1IiwiaW50ZXJuYWxfc2VjcmV0IjoiNWJhMTljZWItMjk2OS00OTJjLWJkOWItMDk2NDAyYzFjNWRmIn0.8F3rFgPzfjGQYZzAcvK9qlNwPicr8_vp6gXS8cC6MCY",
      onConnect: async (context) => {
        console.log("Connected to DB");
      },
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: "uuid" }
    },
    lists,
    session,
    ui: {
      isDisabled: true
    },
    graphql: {
      path: "/api/graphql"
      // Keystone will serve GraphQL here
    }
  })
);
//# sourceMappingURL=config.js.map
