import {Client, expect} from '@loopback/testlab';
import {ServerApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('AuthenticateController', () => {
    let app: ServerApiApplication;
    let client: Client;

    before('setupApplication', async () => {
        ({app, client} = await setupApplication());
    });

    after(async () => {
        await app.stop();
    });

    it('invokes GET /user/login', async () => {
        const response = await client.post('/user/login').send({email: 'vntopmas@gmail.com', password: '123123'});
        const result = response.body;
        expect(result).to.containEql({_success: true});
    });

});
