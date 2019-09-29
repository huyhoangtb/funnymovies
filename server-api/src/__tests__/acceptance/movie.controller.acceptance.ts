import {Client, expect} from '@loopback/testlab';
import {ServerApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('MovieController', () => {
  let app: ServerApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /movies', async () => {

  const response = await client.get('/movies');
  const result = response.body;
  expect(result).to.containEql({_success: true});
  });

});
