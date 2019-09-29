import {Client} from '@loopback/testlab';
import {ServerApiApplication} from '../..';
import {setupApplication} from './test-helper';
import {givenEmptyDatabase} from "../helpers/database.helpers";

describe('HomePage', async () => {
  let app: ServerApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });
  before('givenEmptyDatabase', async () => {
    await givenEmptyDatabase();;
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a default home page', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });

  it('exposes self-hosted explorer', async () => {
    await client
      .get('/explorer/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  });
});
