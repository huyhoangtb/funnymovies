import {model, property, Entity} from '@loopback/repository';
import {User} from "./user.model";

class Vote {
    @property({
        type: 'string',
        id: true,
        generated: true
    })
    id: string;

    @property({
        type: 'boolean',
        id: true,
        generated: true
    })
    vote: boolean;
}

@model({settings: {strict: false}})
export class MovieModel extends Entity {

    constructor(data?: Partial<MovieModel>) {
        super(data);
    }

    @property({
        type: 'string',
        id: true,
        generated: true
    })
    id: string;

    @property({
        type: 'string',
        required: true
    })
    videoId: string;

    @property({
        type: 'string',
        required: true
    })
    shareUserId: string;

    @property({
        type: 'string',
        required: false
    })
    sharedByEmail?: string;

    @property({
        type: 'string',
        required: true
    })
    title: string;


    @property({
        type: 'string',
        required: true
    })
    description: string;

    @property({
        type: 'string',
        required: true
    })
    channelTitle: string;

    @property({
        type: 'string',
        required: true
    })
    viewCount: string;

    @property({
        type: 'string',
        required: true
    })
    likeCount: string;

    @property({
        type: 'string',
        required: true
    })
    dislikeCount: string;

    @property({
        type: 'string',
        required: true
    })
    commentCount: string;

    @property({
        type: 'string',
        required: true
    })
    thumbnailUrl: string;

    @property({
        type: 'date',
        required: true,
    })
    createdDate?: Date;

    @property({
        type: 'object',
        required: true,
    })
    votes: object
}

export interface MovieRelations {
    // describe navigational properties here
}

export type MovieWithRelations = MovieModel & MovieRelations;
