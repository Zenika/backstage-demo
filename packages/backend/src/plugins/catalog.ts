import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

import { GitlabFillerProcessor } from '@immobiliarelabs/backstage-plugin-gitlab-backend';
import { GithubOrgEntityProvider } from '@backstage/plugin-catalog-backend-module-github';
import { Config } from '@backstage/config';

interface IBackendConfig {
  url: string;
  schedule_frequency: number;
  schedule_timeout: number;
}

const getOrgaConfig = (config: Config): IBackendConfig => {
  return config.get<IBackendConfig>('backend.env.orga');
};

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addProcessor(new ScaffolderEntitiesProcessor());

  builder.addProcessor(new GitlabFillerProcessor(env.config));

  builder.addEntityProvider(
    GithubOrgEntityProvider.fromConfig(env.config, {
      id: 'development',
      orgUrl: getOrgaConfig(env.config).url,
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { hours: getOrgaConfig(env.config).schedule_frequency },
        timeout: { minutes: getOrgaConfig(env.config).schedule_timeout },
      }),
    }),
  );

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
