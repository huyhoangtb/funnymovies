import React from 'react';
import enpoints from 'configs/endpoints';
import GenerateForm from 'schema-form/GenerateForm';
import SchemaForm from './schema';
import Translate, {t1} from 'i18n';
import {Button, Form, notification} from 'antd';
import {connect} from 'react-redux';
import userActions from 'action-creators/user';
import {history} from 'store';
import PropTypes from 'prop-types';
import {getParamsFromSearchString} from '../../../common';
import {Link} from "react-router-dom";
import './stylesheet.scss';

const FormItem = Form.Item;

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onLoginSuccess = (result) => {
    const {dispatch, onLoginSuccess} = this.props;
    notification.success(
      {
        message: t1('Login to the system successfully'),
        description: t1('Hi there, Welcome back!'),
      },
    );
    if(onLoginSuccess) {
      onLoginSuccess(result);
      return;
    }

    const params = getParamsFromSearchString(history.location.search);
    const redirect = params.get('redirect');
    if (!redirect) {
      history.push('/');
    } else {
      history.push(redirect);
    }
  }
  onLoginFail = (result) => {
    const msg = result && result.msg ? result.msg : Translate.t1('Your username or password wrong!..');
    this.setState({errMsg: msg, successMsg: undefined});
  }

  render() {
    return (
      <div className="ui-login-form">
        <GenerateForm
          className="login-form"
          onSuccess={this.onLoginSuccess}
          endpoint={enpoints.user.login}
          // onSuccess = {this.onLoginSuccess}
          dispatchAfterSuccess={userActions.onLoginSuccess}
          schema={SchemaForm}
          submitLabel={t1('Login me in')}
          rightSummitBtn={
            [
              <Button key='login-with-facebook' type="secondary" className='login-facebook'>
                {t1('Login with facebook')}
              </Button>,
              <Button key='create-new-account' type="secondary" className='create-account'>
                {t1('Create account')}
              </Button>,
              <Link key='forgot-password' to={'forgot-password'} className='forgot-password-link'>
                {t1('Forgot password')}
              </Link>,
            ]
          }
        />
      </div>
    );
  }
}

RegisterForm.propTypes = {
    onLoginSuccess: PropTypes.func
}

export default connect()(RegisterForm);
