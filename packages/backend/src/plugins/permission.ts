import { createRouter } from '@backstage/plugin-permission-backend';
import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
import {
  AuthorizeResult,
  PolicyDecision,
  isResourcePermission,
} from '@backstage/plugin-permission-common';
import {
  catalogConditions,
  createCatalogConditionalDecision,
} from '@backstage/plugin-catalog-backend/alpha';
import {
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

const isAdmin = (user: BackstageIdentityResponse | undefined) =>
  user?.identity.ownershipEntityRefs.includes('group:default/zenika-clermont');

const isGoogleGuest = (user: BackstageIdentityResponse | undefined) =>
  user?.identity.ownershipEntityRefs.includes('group:default/google_guests');

class TestPermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: BackstageIdentityResponse,
  ): Promise<PolicyDecision> {
    // exempting admins from permission
    if (isAdmin(user)) {
      return { result: AuthorizeResult.ALLOW };
    }

    // if owner of the ressource
    if (isResourcePermission(request.permission, 'catalog-entity')) {
      // google users can read all users and groups on top of their owned entitiesentities
      if (
        isGoogleGuest(user) &&
        request.permission.attributes.action === 'read'
      ) {
        return createCatalogConditionalDecision(request.permission, {
          anyOf: [
            catalogConditions.isEntityKind({
              kinds: ['user', 'group'],
            }),
            catalogConditions.isEntityOwner({
              claims: user?.identity.ownershipEntityRefs ?? [],
            }),
          ],
        });
      }
      return createCatalogConditionalDecision(
        request.permission,
        catalogConditions.isEntityOwner({
          claims: user?.identity.ownershipEntityRefs ?? [],
        }),
      );
    }

    return { result: AuthorizeResult.ALLOW };
  }
}

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    config: env.config,
    logger: env.logger,
    discovery: env.discovery,
    policy: new TestPermissionPolicy(),
    identity: env.identity,
  });
}
