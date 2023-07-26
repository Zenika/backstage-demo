import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const teamapiPlugin = createPlugin({
  id: 'teamapi',
  routes: {
    root: rootRouteRef,
  },
});

export const TeamapiPage = teamapiPlugin.provide(
  createRoutableExtension({
    name: 'TeamapiPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
