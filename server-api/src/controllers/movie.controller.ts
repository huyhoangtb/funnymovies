import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
} from '@loopback/repository';
import {
    authenticate,
    UserProfile,
    AuthenticationBindings,
} from '@loopback/authentication';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from "../keys";
import {
    post,
    param,
    get,
    getFilterSchemaFor,
    getModelSchemaRef,
    getWhereSchemaFor,
    patch,
    put,
    del,
    requestBody,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {MovieModel, User} from '../models';
import {MovieRepository} from '../repositories';

export class MovieController {
    constructor(
        @repository(MovieRepository)
        public movieRepository: MovieRepository,

    ) {
    }

    @post('/movies/create/{youtubeId}', {
        responses: {
            '200': {
                description: 'Movie model instance',
                content: {'application/json': {schema: getModelSchemaRef(MovieModel)}},
            },
        },
    })
    @authenticate('jwt')
    async create(
        @param.path.string('youtubeId') youtubeId: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: {
                        youtubeId: 'string'
                    },
                },
            },
        })
            movie: any,
        @inject(AuthenticationBindings.CURRENT_USER)
            currentUserProfile: UserProfile,
    ): Promise<MovieModel> {
       return await this.movieRepository.createMovie(youtubeId, currentUserProfile);
    }

    @get('/movies', {
        responses: {
            '200': {
                description: 'Array of Movie model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(MovieModel)},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(MovieModel)) filter?: Filter<MovieModel>,
    ): Promise<MovieModel[]> {
        return await this.movieRepository.find(filter);
    }

}
