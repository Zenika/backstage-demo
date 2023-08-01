/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ExploreLayout,
  GroupsExplorerContent,
} from '@backstage/plugin-explore';
import React from 'react';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

export const ExplorePage = () => {
  const configApi = useApi(configApiRef);
  const organizationName =
    configApi.getOptionalString('organization.name') ?? 'Backstage';

  return (
    <ExploreLayout
      title={`Explore the ${organizationName} teams`}
      subtitle="Discover teams in your organization"
    >
      <ExploreLayout.Route path="Organization" title='Organization'>
        <GroupsExplorerContent title=""/>
      </ExploreLayout.Route>

    </ExploreLayout>
  );
};

export const explorePage = <ExplorePage />;