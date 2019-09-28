import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/common/viewers/loading';

const ReactPlayer = Loadable({
  loader: () => import(/* webpackChunkName: "schema-form/elements/richtext" */ 'react-player'),
  loading: Loading,
});


/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class VideoPlayer extends React.Component {


  render() {
    const props = { ...this.props };
    delete props.options;
    delete props.onDataEmpty;
    return (
      <ReactPlayer {...props} />
    );
  }
}

export default VideoPlayer;
