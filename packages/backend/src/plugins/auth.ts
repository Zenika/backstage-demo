import {
  DEFAULT_NAMESPACE,
  stringifyEntityRef,
} from '@backstage/catalog-model';
import {
  createRouter,
  providers,
  defaultAuthProviderFactories,
} from '@backstage/plugin-auth-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

const groupEntityRef = stringifyEntityRef({
  kind: 'Group',
  name: 'Organization',
  namespace: DEFAULT_NAMESPACE,
});

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    discovery: env.discovery,
    tokenManager: env.tokenManager,
    providerFactories: {
      ...defaultAuthProviderFactories,
      // This replaces the default GitHub auth provider with a customized one.
      // The `signIn` option enables sign-in for this provider, using the
      // identity resolution logic that's provided in the `resolver` callback.
      //
      // This particular resolver makes all users share a single "guest" identity.
      // It should only be used for testing and trying out Backstage.
      //
      // If you want to use a production ready resolver you can switch to
      // the one that is commented out below, it looks up a user entity in the
      // catalog using the GitHub username of the authenticated user.
      // That resolver requires you to have user entities populated in the catalog,
      // for example using https://backstage.io/docs/integrations/github/org
      //
      // There are other resolvers to choose from, and you can also create
      // your own, see the auth documentation for more details:
      //
      //   https://backstage.io/docs/auth/identity-resolver
      //      github: providers.github.create({
      //        signIn: {
      // resolver(_, ctx) {
      //  const userRef = 'user:default/guest'; // Must be a full entity reference
      //  return ctx.issueToken({
      //    claims: {
      //      sub: userRef, // The user's own identity
      //      ent: [userRef], // A list of identities that the user claims ownership through
      //    },
      //  });
      // },
      //          resolver: providers.github.resolvers.usernameMatchingUserEntityName(),
      //        },
      //      }),
      google: providers.google.create({
        signIn: {
          resolver: async (info, ctx) => {
            const {
              profile: { email },
            } = info;
            // Profiles are not always guaranteed to to have an email address.
            // You can also find more provider-specific information in `info.result`.
            // It typically contains a `fullProfile` object as well as ID and/or access
            // tokens that you can use for additional lookups.
            if (!email) {
              throw new Error('User profile contained no email');
            }
            // This example resolver simply uses the local part of the email as the name.
            const [name] = email.split('@');

            const userEntityRef = stringifyEntityRef({
              kind: 'User',
              name: name,
              namespace: DEFAULT_NAMESPACE,
            });

            return ctx.issueToken({
              claims: {
                sub: userEntityRef,
                ent: [userEntityRef, groupEntityRef],
              },
            });
          },
        },
      }),
    },
  });
}
