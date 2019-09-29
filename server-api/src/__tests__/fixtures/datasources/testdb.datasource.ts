import {juggler} from '@loopback/repository';

export const movieTestDB: juggler.DataSource = new juggler.DataSource({
        "name": "MongoDB",
        "connector": "mongodb",
        "url": "mongodb://localhost:27017/funny-movie-test",
        "host": "localhost",
        "port": 27017,
        "user": "",
        "password": "",
        "database": "platform",
        "useNewUrlParser": true
    }
);
