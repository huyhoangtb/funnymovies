import React from 'react';
import {connect} from 'react-redux';
import {List, Modal, Icon, Skeleton} from 'antd';
import './stylesheet.scss';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import ReactPlayer from "react-player";
import Requester from "../../../../../common/network/http/Request";
import endpoints from "../../../../../configs/endpoints";
import clientDataBase from "../../../../../action-creators/client-database";


const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
);

class MovieDetail extends React.Component {
  state = {
    showModelPlayVideo: false,
  }

  switchStateOfModel = () => {
    this.setState({
      showModelPlayVideo: !this.state.showModelPlayVideo,
    });
  };

  onVote = async (voteValue) => {
    const {value, dispatch} = this.props;
    let vote = voteValue;
    if(this.getMyVote()) {
      vote = 'reset'
    }
    const voteResult = await Requester.post(endpoints.movie.vote(value.id, vote));
    if(voteResult && voteResult._success) {
      dispatch(clientDataBase.fetch(endpoints.movie.getMovies, {}, {namespace: 'movies'}));
    }
  }

  getMyVote = () => {
    const {value, currentUser} = this.props;
    const votes = value.votes || {};
    return votes[currentUser && currentUser.id];
  }

  render() {
    const {value, currentUser} = this.props;
    const myVote = this.getMyVote();

    const voteControl = [];
    if (!myVote || myVote === 'like') {
      voteControl.push(
        <Icon type='like-o' onClick={async () => await this.onVote('like')} className={'m-l-20 m-r-10'}
              style={{fontSize: 25, color: '#08c'}}/>);
    }
    if (!myVote || myVote === 'dislike') {
      voteControl.push(
        <Icon type='dislike' onClick={async () => await this.onVote('dislike')}
              style={{fontSize: 25, color: 'red'}}/>
      );
    }

    let userInfoAndVote = (
      <span>
          {value.sharedByEmail ? `Shared by: ${value.sharedByEmail}` : ''}
        {
          currentUser && currentUser.id && voteControl
        }

        </span>
    )

    return (
      <div className='ui-movie-item'>
        <Skeleton loading={value.isSkeleton} active>
        <div className='ui-movie-thumbnail'>
          <img
            width={272}
            onClick={this.switchStateOfModel}
            alt="logo"
            src={value.thumbnailUrl}
          />
        </div>
        <List.Item
          key={value.id}
          actions={[
            <span>Youtube statistics</span>,
            <IconText type="like-o" text={value.likeCount} key="list-vertical-like-o"/>,
            <IconText type="dislike" text={value.likeCount} key="list-vertical-dislike"/>,
            <IconText type="eye" text={value.viewCount} key="list-vertical-eye"/>,
            <IconText type="message" text={value.commentCount} key="list-vertical-message"/>,
            userInfoAndVote
          ]}
        >
          <div className='ui-movie-detail'>
            <List.Item.Meta
              title={<span className='movie-title' onClick={this.switchStateOfModel}>{value.title}</span>}
              description={value.description}
            />
          </div>


        </List.Item>

        <Modal
          className='ui-player-model'
          visible={this.state.showModelPlayVideo}
          footer={
            <ul className='ant-list-item-action'>
              <li>
                <IconText type="like-o" text={value.likeCount} key="list-vertical-like-o"/>
              </li>
              <li>
                <IconText type="like-o" text={value.likeCount} key="list-vertical-like-o"/>
              </li>
              <li>
                <IconText type="eye" text={value.viewCount} key="list-vertical-eye"/>
              </li>
              <li>
                <IconText type="message" text={value.commentCount} key="list-vertical-message"/>
              </li>
            </ul>
          }
          onCancel={this.switchStateOfModel}
          destroyOnClose
        >
          <ReactPlayer width={'100%'} height={300} url={`https://www.youtube.com/watch?v=${value.videoId}`} playing/>
          <h4 className='m-b-40 ant-list-item-meta-title m-t-20 '>{value.title}</h4>
          <PerfectScrollbar>
            <div className='ui-description'>{value.description}</div>
          </PerfectScrollbar>
        </Modal>
        </Skeleton>
      </div>

    );
  }
}


export default connect()(MovieDetail);
