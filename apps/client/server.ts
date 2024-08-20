import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import bootstrap from './server.bootstrap';

const server = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const publicPath = resolve(serverDistFolder, '../browser');
const documentFilePath = join(serverDistFolder, 'index.server.html');
const commonEngine = new CommonEngine();
const port = process.env['PORT'] || 3000;

server.set('view engine', 'html');
server.set('views', publicPath);

server.get(
  '**',
  express.static(publicPath, { index: 'index.html', maxAge: '1y' }),
);

server.get('**', (req, res, next) => {
  const { baseUrl, headers, originalUrl, protocol } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      publicPath,
      url: `${protocol}://${headers.host}${originalUrl}`,
    })
    .then(html => res.send(html))
    .catch(err => next(err));
});

server.listen(port, () => console.log(`🚀 http://localhost:${port}`));
