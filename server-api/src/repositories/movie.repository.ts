import {DefaultCrudRepository} from '@loopback/repository';
import {MovieModel, MovieRelations, User} from '../models';
import {MongoDbDataSource} from '../datasources';
import {
    UserProfile,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {YouTobeService} from "../services";

export class MovieRepository extends DefaultCrudRepository<MovieModel,
    typeof MovieModel.prototype.id,
    MovieRelations> {
    constructor(
        @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
        @inject('services.YouTobeService') protected youTobeService: YouTobeService,
    ) {
        super(MovieModel, dataSource);
    }

    /**
     * Get Movie from youtube and store data to the local db. The data can be change in future but need to store
     * for fast search for example
     *
     * @param movieId
     * @param createUser
     */
    async createMovie(movieId: string, createUser: UserProfile): Promise<any> {
        const youtubeData = await this.getMovieDetail(movieId);
        if (youtubeData === null) {
            return null;
        }
        const movie = this.cloneMovieDataFromYouTube(youtubeData, createUser);
        return await this.create(movie);
    }

    /**
     * Using Rest Service to get data from google
     *
     * @param movieId
     */
    async getMovieDetail(movieId: string): Promise<any> {
        try {
            const result = await this.youTobeService.getMovieDetailById('bbLd9cB7AWo');
            if (!result.items || result.items.length === 0) {
                return null;
            }
            return result.items[0];

        } catch (e) {
            return null;
        }

    }

    /**
     * Clone data from youtube to MovieModel Objects
     *
     * @param youTobeMovieData
     * @param user
     */
    cloneMovieDataFromYouTube(youTobeMovieData: any, user: UserProfile): MovieModel {
        const movieModel = new MovieModel();
        const snippet = youTobeMovieData.snippet;
        const statistics = youTobeMovieData.statistics;

        movieModel.videoId = youTobeMovieData.id;
        movieModel.shareUserId = user && user.id;
        movieModel.description = snippet.description;
        movieModel.title = snippet.title;
        movieModel.channelTitle = snippet.channelTitle;

        movieModel.likeCount = statistics.likeCount;
        movieModel.dislikeCount = statistics.dislikeCount;
        movieModel.viewCount = statistics.viewCount;
        movieModel.commentCount = statistics.commentCount;

        return movieModel;
    }


}
