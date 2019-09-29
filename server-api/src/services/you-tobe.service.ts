import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {YouTubeApiDataSource} from '../datasources';

export interface YouTobeService {
  // this is where you define the Node.js methods that will be
  // mapped to the SOAP operations as stated in the datasource
  // json file.

  getMovieDetailById(youTubeId: string): Promise<any>;
}

export class YouTobeServiceProvider implements Provider<YouTobeService> {
  constructor(
    // YouTubeApi must match the name property in the datasource json file
    @inject('datasources.YouTubeApi')
    protected dataSource: YouTubeApiDataSource = new YouTubeApiDataSource(),
  ) {}

  value(): Promise<YouTobeService> {
    return getService(this.dataSource);
  }
}
