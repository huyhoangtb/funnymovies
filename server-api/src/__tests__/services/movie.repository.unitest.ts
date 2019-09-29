import {Client, expect} from '@loopback/testlab';
import {ServerApiApplication} from '../..';
import {setupApplication} from '../acceptance/test-helper';
import {YouTobeService, YouTobeServiceProvider} from "../../services";
import {YouTubeApiDataSource} from "../../datasources";

const getYoutubeService = async () => {
    const dataSource = new YouTubeApiDataSource();
    return await new YouTobeServiceProvider(dataSource).value();
}

describe('YoutubeService', async () => {
    let app: ServerApiApplication;
    let client: Client;
    let youTobeService: YouTobeService;

    before('setupApplication', async () => {
        ({app, client} = await setupApplication());
        youTobeService = await getYoutubeService()
    });

    after(async () => {
        await app.stop();
    });

    it('Load Youtube Data for Id: fZQNPcsiVqY', async () => {
        const youtubeId = 'fZQNPcsiVqY';
        const movieData: any = await youTobeService.getMovieDetailById(youtubeId);

        expect(movieData.items.length).to.eql(1);
        expect(movieData.items[0].id).to.eql(youtubeId);
    });

    it('Case: Invalid Id', async () => {
        const youtubeId = 'InvalidYoutubeId';
        const movieData: any = await youTobeService.getMovieDetailById(youtubeId);
        expect(movieData.items.length).to.eql(0);
    });

});
