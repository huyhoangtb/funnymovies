import {ServerApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {ServerApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ServerApiApplication(options);
  app.basePath('/api/v1');
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
