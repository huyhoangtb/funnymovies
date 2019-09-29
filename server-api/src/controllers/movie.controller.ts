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
        movie: any,
        @inject(AuthenticationBindings.CURRENT_USER)
            currentUserProfile: UserProfile,
    ): Promise<{ _success: boolean, _result: MovieModel | any }> {
        try {
            const _result = await this.movieRepository.createMovie(youtubeId, currentUserProfile);
            return {_result, _success: true}
        } catch (e) {
        }

        return {_result: null, _success: false,}

    }

    @post('/movies/{id}/vote/{value}')
    @authenticate('jwt')
    async vote(
        @param.path.string('id') id: string,
        @param.path.string('value') value: string,
        @inject(AuthenticationBindings.CURRENT_USER)
            currentUserProfile: UserProfile,
    ): Promise<{ _success: boolean}> {
        try {
            const _success = await this.movieRepository.vote(id, value, currentUserProfile);
            return {_success}
        } catch (e) {
        }

        return {_success: false,}

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
    ): Promise<{ _success: boolean, _result: MovieModel[] }> {
        const _result = await this.movieRepository.find(filter);
        return {
            _result,
            _success: true
        }
    }

}
