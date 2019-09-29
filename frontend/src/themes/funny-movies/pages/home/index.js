import React from 'react';
import MovieList from '../../components/movie-list'
import {connect} from 'react-redux';

import './stylesheet.scss';

class FunnyMovie extends React.Component {

  render() {
    return (
      <div className="ui-home-funny-movies m-t-20">
        <div className='ui-body-panel '>
          <MovieList/>
        </div>
      </div>
    );
  }
}

export default connect()(FunnyMovie);
