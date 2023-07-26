import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { teamapiPlugin, TeamapiPage } from '../src/plugin';

createDevApp()
  .registerPlugin(teamapiPlugin)
  .addPage({
    element: <TeamapiPage />,
    title: 'Root Page',
    path: '/teamapi'
  })
  .render();
