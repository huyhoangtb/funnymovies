import {model, property, Entity} from '@loopback/repository';
import {validate, Contains, IsInt, MinLength, IsEmail, IsFQDN, IsDate, Min, Max, } from "class-validator";

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
        required: true,
    })
    firstName: string;

    @property({
        type: 'string',
        required: true
    })
    lastName: string;

    @property({
        type: 'string',
        required: true
    })
    email: string;

    @property({
        type: 'string',
        required: true
    })
    address: string;


    @property({
        type: 'string',
        required: true
    })
    phone?: string;

    @property({
        type: 'string',
        require: true
    })
    password: string;

    @property({
        type: 'string',
        require: true
    })
    username: string;

}

export interface UserRelations {
    // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
