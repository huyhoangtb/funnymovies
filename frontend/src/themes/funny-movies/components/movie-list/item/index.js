import React from 'react';
import {List, Modal, Icon} from 'antd';
import './stylesheet.scss';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import ReactPlayer from "react-player";


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

  render() {
    const {value, currentUser} = this.props;
    let userInfoAndVote =  (
        <span>
          {value.sharedByEmail ? `Shared by: ${value.sharedByEmail}` : ''}
          {
            currentUser && currentUser.id &&
              [
                <Icon type='like-o' className={'m-l-20 m-r-10'} style={{fontSize: 25, color: '#08c'}}/>,
                <Icon type='dislike' style={{fontSize: 25, color: 'red'}}/>
              ]
          }

        </span>
      )

    return (
      <div className='ui-movie-item'>
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

      </div>

    );
  }
}

export default MovieDetail;
