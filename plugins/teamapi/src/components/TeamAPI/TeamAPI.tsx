import React, { useMemo, useState } from 'react';
import { InfoCard, Progress } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { scmIntegrationsApiRef } from '@backstage/integration-react';
import { useEntity } from '@backstage/plugin-catalog-react';
import { getEntitySourceLocation } from '@backstage/catalog-model';
import { marked } from 'marked';
import { sanitize } from 'dompurify';

const useStyles = makeStyles(theme => ({
  infoCard: {
    marginBottom: theme.spacing(3),
    '& + .MuiAlert-root': {
      marginTop: theme.spacing(3),
    },
  },
}));

export const cleanHTML = (dirty: string) => ({
  __html: sanitize(dirty, {
    USE_PROFILES: { html: true, svg: true, svgFilters: true },
    KEEP_CONTENT: true,
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  }),
});

export const TeamAPI = () => {
  const [tapiCard, setTapiCard] = useState(<Progress />);
  const classes = useStyles();
  const config = useApi(configApiRef);
  const { entity } = useEntity();
  const scmIntegrations = useApi(scmIntegrationsApiRef);

  useMemo(() => {
    let url = 'TEAMAPI.md';
    if (url !== '') {
      url = scmIntegrations.resolveUrl({
        url,
        base: getEntitySourceLocation(entity).target,
      });
    }

    fetch(
      `${config.getString(
        'backend.baseUrl',
      )}/api/teamapi/file?${new URLSearchParams({
        url,
      })}`,
    )
      .then(response => response.json())
      .then(json => {
        setTapiCard(
          <InfoCard className={classes.infoCard} title="TEAM API">
            <div dangerouslySetInnerHTML={cleanHTML(marked.parse(json.data))} />
          </InfoCard>,
        );
      });
  }, [classes.infoCard, config, entity, scmIntegrations]);

  return <>{tapiCard}</>;
};
