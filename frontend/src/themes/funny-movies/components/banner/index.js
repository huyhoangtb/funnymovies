import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import UserForm from '../user-form';
import LoggedInUserDashboard from '../logged-user-dashboard';
import './stylesheet.scss';


class FunnyMovieBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user || {};

    return (
      <div className='ui-banner-top'>
        <div className='ui-body-panel ui-banner-body'>
          <div className='ui-logo-panel'><Link  to={'/'}><span className='ui-funny'>Funny</span> Movies</Link> </div>
          <div className='ui-login-register'>
            { //todo: check token expiresIn
              !user.id && <UserForm/>
            }

            {
              user.id && <LoggedInUserDashboard user={user}/>
            }

          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user && state.user.user
  }
}
export default connect(mapStateToProps)(FunnyMovieBanner);

