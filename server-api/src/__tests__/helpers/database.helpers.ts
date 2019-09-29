import {MovieRepository} from '../../repositories';
import {movieTestDB} from '../fixtures/datasources/testdb.datasource';
import {YouTobeService, YouTobeServiceProvider} from "../../services";
import {YouTubeApiDataSource} from "../../datasources/you-tube-api.datasource";


const getYoutubeService = async () => {
    const dataSource = new YouTubeApiDataSource();
    return await new YouTobeServiceProvider(dataSource).value();
}

export async function givenEmptyDatabase() {

    let movieRepository: MovieRepository;
    let youTobeService: YouTobeService = await getYoutubeService();

    movieRepository = new MovieRepository(
        movieTestDB,
        youTobeService
    );

    await movieRepository.deleteAll();
}
