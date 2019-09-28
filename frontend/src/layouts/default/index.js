import React from 'react';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui-default-layout">
        {this.props.children}
      </div>
    );
  }
}

export default index;
