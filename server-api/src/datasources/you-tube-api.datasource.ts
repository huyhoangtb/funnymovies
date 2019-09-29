import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './you-tube-api.datasource.json';

export class YouTubeApiDataSource extends juggler.DataSource {
  static dataSourceName = 'YouTubeApi';

  constructor(
    @inject('datasources.config.YouTubeApi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
