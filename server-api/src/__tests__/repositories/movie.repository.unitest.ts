import {Client, expect} from '@loopback/testlab';
import {ServerApiApplication} from '../..';
import {setupApplication} from '../acceptance/test-helper';
import {MovieRepository} from "../../repositories";
import {movieTestDB} from "../fixtures/datasources/testdb.datasource";
import {YouTobeService, YouTobeServiceProvider} from "../../services";
import {YouTubeApiDataSource} from "../../datasources";
import {MovieModel} from "../../models";

const getYoutubeService = async () => {
    const dataSource = new YouTubeApiDataSource();
    return await new YouTobeServiceProvider(dataSource).value();
}

describe('MovieRepository', async () => {
    let app: ServerApiApplication;
    let client: Client;
    let movieRepository: MovieRepository;
    let youTobeService: YouTobeService;

    before('setupApplication', async () => {
        ({app, client} = await setupApplication());
        youTobeService = await getYoutubeService()
        movieRepository = new MovieRepository(
            movieTestDB,
            youTobeService
        );
        await movieRepository.deleteAll();
    });

    after(async () => {
        await app.stop();
    });

    it('Create Movie 1', async () => {
        const userProfile = {id: '5d709c3b43408953c8433f33', email: 'vntopmas@gmail.com'};
        const youtubeId = 'qaI4psAJ58c';
        const movie: MovieModel | any = await movieRepository.createMovie(youtubeId, userProfile);
        expect(movie.videoId).to.eql(youtubeId);
        expect(movie.shareUserId).to.eql(userProfile.id);
        expect(movie.title).to.eql('Sea Animal Song + More Nursery Rhymes & Kids Songs - CoCoMelon');
    });

    it('Create Movie 2', async () => {
        const userProfile = {id: '5d709c3b43408953c8433f33', email: 'vntopmas@gmail.com'};
        const youtubeId = 'fZQNPcsiVqY';
        const movie: MovieModel | any = await movieRepository.createMovie(youtubeId, userProfile);
        expect(movie.videoId).to.eql(youtubeId);
        expect(movie.shareUserId).to.eql(userProfile.id);
        expect(movie.title).to.eql('Who Took the Donuts? | Baby Panda Detective | Ice Creams, Hamburgers | Pretend Play | BabyBus');
    });

    it('Unit test ==> Vote', async () => {
        const userProfile = {id: '5d709c3b43408953c8433f33', email: 'vntopmas@gmail.com'};
        const youtubeId = 'PC_GKF0YUSc';
        let movie: MovieModel | any = await movieRepository.createMovie(youtubeId, userProfile);
        expect(movie.videoId).to.eql(youtubeId);
        expect(movie.shareUserId).to.eql(userProfile.id);

        // unit test for like
        let voteResult: boolean = await movieRepository.vote(movie.id, 'like', userProfile);
        expect(voteResult).to.eql(true);
        movie = await movieRepository.findById(movie.id);
        let votes = movie.votes || {};
        expect(votes[userProfile.id]).to.eql('like');

        // unit test for dislike
        voteResult = await movieRepository.vote(movie.id, 'dislike', userProfile);
        expect(voteResult).to.eql(true);
        movie = await movieRepository.findById(movie.id);
        votes = movie.votes || {};
        expect(votes[userProfile.id]).to.eql('dislike');

        voteResult = await movieRepository.vote(movie.id, 'reset', userProfile);
        expect(voteResult).to.eql(true);
        movie = await movieRepository.findById(movie.id);
        votes = movie.votes || {};
        expect(votes[userProfile.id]).to.eql(undefined);

    });

    it('Create Invalid Video', async () => {
        const userProfile = {id: '5d709c3b43408953c8433f33', email: 'vntopmas@gmail.com'};
        const youtubeId = 'NoVideo';
        const movie: MovieModel | any = await movieRepository.createMovie(youtubeId, userProfile);
        expect(movie).to.eql(null);
    });

    it('Validate Total Videos that inserted', async () => {
        const movies: MovieModel[] = await movieRepository.find({});
        expect(movies.length).to.eql(3);
    });
});
