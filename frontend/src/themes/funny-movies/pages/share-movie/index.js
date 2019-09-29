import React from 'react';
import {Row, Col, Button, Input, message} from 'antd';
import {connect} from 'react-redux';
import endpoints from 'configs/endpoints';
import Requester from 'common/network/http/Request'
import ReactPlayer from 'react-player'

import './stylesheet.scss';
import clientDataBase from "../../../../action-creators/client-database";
import actionCommon from "../../../../action-creators/common";


class ShareMovie extends React.Component {
  state = {youTubeUrl: "https://youtu.be/HuNHi0ikDHU?t=118"}

  onUrlChanged = (event) => {
    let youTubeUrl = event.target.value;
    this.setState({youTubeUrl: youTubeUrl});
  }


  getVideoId = (youTubeUrl) => {
    if (!youTubeUrl) {
      return undefined;
    }
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = youTubeUrl.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    }
    return undefined;
  }

  /**
   * This function will send youtube youtube to the server
   */
  onShareVideoId = async () => {
    const {dispatch, history, popupScreenId} = this.props;

    const youToBeId = this.getVideoId(this.state.youTubeUrl);
    if (!youToBeId) {
      message.error("Your Youtube Url is not correct!");
    }

    const sharedVideoResult = await Requester.post(endpoints.movie.shareVideo(youToBeId));
    if (sharedVideoResult && sharedVideoResult._success) {
      const video = sharedVideoResult._result;
      message.info(`Your movie: "${video.title}" had shared!`);
      history.push('/');
      dispatch(actionCommon.setStatusOfFormView({viewId: popupScreenId, display: false, title: ''}));
      dispatch(clientDataBase.fetch(endpoints.movie.getMovies, {}, {namespace: 'movies'}));
    } else {
      message.error("Sharing not success, please trying again!");
    }
  }

  render() {
    return (
      <div className="ui-share-movies">
        <div className='ui-body-panel'>
          <Row gutter={8}>
            <Col span={24}>
              <Input value={this.state.youTubeUrl} onChange={this.onUrlChanged}
                     placeholder="Enter the Youtube Url here " size='large'/>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24} className='m-t-20'>
              <ReactPlayer width={'100%'} height={300} url={this.state.youTubeUrl} playing/>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24} className='m-t-20 ui-share-button-panel'>
              <Button type="primary" onClick={this.onShareVideoId} className='ui-button' shape="round" icon="share-alt"
                      size='large'>
                Share this movie
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect()(ShareMovie);
