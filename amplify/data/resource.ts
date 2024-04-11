// amplify/data/resource.ts
import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization([
      a.allow.owner('oidc').identityClaim('user_id'),
      a.allow.private('oidc'),
      a.allow
        .specificGroups(['testGroupName'], 'oidc')
        .withClaimIn('user_groups'),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'oidc',
    oidcAuthorizationMode: {
      oidcProviderName: 'oidc-provider-name',
      oidcIssuerUrl: 'https://example.com',
      clientId: 'client-id',
      tokenExpiryFromAuthInSeconds: 300,
      tokenExpireFromIssueInSeconds: 600,
    },
  },
});

import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// ...

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),

      done: a.boolean(),
      priority: a.enum(['low', 'medium', 'high'])

    })
    .authorization([a.allow.owner(), a.allow.public().to(['read'])]),
});

// ...
