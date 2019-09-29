import {model, property, Entity} from '@loopback/repository';

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
    title: string;


    @property({
        type: 'string',
        required: true
    })
    description: string;
}

export interface MovieRelations {
    // describe navigational properties here
}

export type MovieWithRelations = MovieModel & MovieRelations;
