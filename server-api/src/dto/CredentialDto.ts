import {model, Model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Credentials extends Model {

    constructor(data?: Partial<Credentials>) {
        super(data);
    }
    @property({
        type: 'string',
        require: false
    })
    email: string;

    @property({
        type: 'string',
        require: false
    })
    password: string;
}
