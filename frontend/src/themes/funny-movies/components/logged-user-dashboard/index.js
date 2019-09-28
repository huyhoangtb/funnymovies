import React from 'react';
import {connect} from 'react-redux';
import {history} from "../../../../store";
import {Redirect} from 'react-router-dom';
import {Button, Icon, Tooltip} from 'antd';
import './stylesheet.scss';
import userActionCreators from "../../../../action-creators/user";

class UserDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  onLogout = () => {
    this.props.dispatch(userActionCreators.onLoginSuccess({user: {}, token: undefined}));
    history.push('/')
  }

  render() {
    const {user} = this.props;

    return (
      <div className='ui-user-info-dashboard'>
        <div className='m-r-20'>
          Welcome {user.email}
        </div>
        <div className='m-r-20'>
          <Button type="primary" shape="round" icon="share-alt" size='large'>
            Share a movie
          </Button>
        </div>
        <div className='m-r-20'>
          <Tooltip title="Click here to logout">
              <Icon onClick={this.onLogout} className='logout-icon' type="logout" size='large' />
          </Tooltip>
        </div>

      </div>
    );
  }
}

export default connect()(UserDetail);

