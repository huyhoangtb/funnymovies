import React from 'react';
import { connect } from 'react-redux';
import { history } from 'store';
import userActionCreators from 'action-creators/user';

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const options = {
      onSuccess: () => {
        history.push('/');
      },
    };
    dispatch(userActionCreators.logout(options));
  }


  render() {
    return (
      <div>logout...</div>
    );
  }
}


export default connect()(Logout);
