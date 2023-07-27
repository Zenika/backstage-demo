import {
  CacheClient,
  UrlReader,
  errorHandler,
} from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { NotModifiedError, stringifyError } from '@backstage/errors';

export interface RouterOptions {
  logger: Logger;
  reader: UrlReader;
  cacheClient: CacheClient;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { reader, cacheClient, logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/file', async (req, res) => {
    const urlToProcess = req.query.url as string;
    if (!urlToProcess) {
      res.statusCode = 400;
      res.json({ message: 'No URL provided' });
      return;
    }

    const cachedFileContent = (await cacheClient.get(urlToProcess)) as {
      data: string;
      etag: string;
    };

    try {
      const fileGetResponse = await reader.readUrl(urlToProcess, {
        etag: cachedFileContent?.etag,
      });
      const fileBuffer = await fileGetResponse.buffer();
      const data = fileBuffer.toString();

      await cacheClient.set(urlToProcess, {
        data,
        etag: fileGetResponse.etag,
      });

      res.json({ data });
    } catch (error: any) {
      if (cachedFileContent && error.name === NotModifiedError.name) {
        res.json({ data: cachedFileContent.data });
        return;
      }

      const message = stringifyError(error);
      logger.error(
        `Unable to fetch ${urlToProcess} from ${urlToProcess}: ${message}`,
      );
      res.statusCode = 500;
      res.json({ message });
    }
  });

  router.use(errorHandler());
  return router;
}
