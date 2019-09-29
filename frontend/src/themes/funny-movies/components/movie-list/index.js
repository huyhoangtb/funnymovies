import React from 'react';
import MovieDetail from './item';
import {connect} from 'react-redux';
import endpoints from 'configs/endpoints';
import clientDataBase from 'action-creators/client-database'
import {List, Avatar, Icon} from 'antd';
import './stylesheet.scss';

class MovieList extends React.Component {

  state = {inited: false}

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(clientDataBase.fetch(endpoints.movie.getMovies, {}, {
      namespace: 'movies',
      onSuccess: () => this.setState({inited: true})
    }))
  }

  getSkeletonList = () => {
    return [{isSkeleton: true},{isSkeleton: true},{isSkeleton: true}]
  }

  getMoviesList = () => {
    const {movies} = this.props;
    if(movies && movies.length > 0) {
      return movies;
    }
    if(!this.inited) {
      return this.getSkeletonList();
    }
    return movies;
  }

  render() {
    const {movies, currentUser} = this.props;
    return (
      <div className="ui-movie-list">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.getMoviesList()}
          renderItem={movie => (<MovieDetail value={movie} currentUser={currentUser}/>)}
        />,
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  const clientDataBase = state.clientDataBase || {};
  return {
    movies: clientDataBase.movies,
    currentUser: state.user && state.user.user
  }
}

export default connect(mapStateToProps)(MovieList);
