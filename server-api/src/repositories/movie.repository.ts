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
     * @param youtubeId
     * @param createUser
     */
    async createMovie(youtubeId: string, createUser: UserProfile): Promise<any> {
        const youtubeData = await this.getMovieDetail(youtubeId);
        if (youtubeData === null) {
            return null;
        }
        const movie = this.cloneMovieDataFromYouTube(youtubeData, createUser);
        movie.createdDate = new Date();
        return await this.create(movie);
    }

    async vote(movieId: string, voteValue: string, createUser: UserProfile) {
        const movie = await this.findById(movieId);
        if (!movie) {
            return false;
        }
        const votes: any = movie.votes || {};
        votes[createUser.id] = voteValue;
        return this.updateById(movieId, {votes});
    }

    /**
     * Using Rest Service to get data from google
     *
     * @param movieId
     */
    async getMovieDetail(movieId: string): Promise<any> {
        if (!movieId) {
            return null;
        }
        try {
            const result = await this.youTobeService.getMovieDetailById(movieId);
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
        const snippet = youTobeMovieData.snippet || {};
        const statistics = youTobeMovieData.statistics || {};
        const thumbnails = snippet.thumbnails || {};

        movieModel.videoId = youTobeMovieData.id;
        if (user) {
            movieModel.shareUserId = user.id;
            movieModel.sharedByEmail = user.email || user.name;
        }

        movieModel.description = snippet.description;
        movieModel.title = snippet.title;
        movieModel.channelTitle = snippet.channelTitle;

        movieModel.likeCount = statistics.likeCount;
        movieModel.dislikeCount = statistics.dislikeCount;
        movieModel.viewCount = statistics.viewCount;
        movieModel.commentCount = statistics.commentCount;
        movieModel.thumbnailUrl = thumbnails.medium.url;

        return movieModel;
    }


}
