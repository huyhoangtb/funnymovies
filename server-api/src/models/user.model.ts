import {model, property, Entity} from '@loopback/repository';

@model({settings: {strict: false}})
export class User extends Entity {

    constructor(data?: Partial<User>) {
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
    email: string;

    @property({
        type: 'string',
        require: true
    })
    password: string;


}

export interface UserRelations {
    // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
