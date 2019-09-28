import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './redis.datasource.json';

export class RedisDataSource extends juggler.DataSource {
  static dataSourceName = 'Redis';

  constructor(
    @inject('datasources.config.Redis', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
