import React from 'react';
import enpoints from 'configs/endpoints';
import GenerateForm from 'schema-form/GenerateForm';
import SchemaForm from './schema';
import Translate, {t1} from 'i18n';
import {Button, Form, message, notification} from 'antd';
import {connect} from 'react-redux';
import userActions from 'action-creators/user';
import {history} from 'store';
import PropTypes from 'prop-types';
import {getParamsFromSearchString} from '../../../common';
import {Link} from "react-router-dom";
import './stylesheet.scss';
import FormGeneration from "../../../schema-form/GenerateForm";

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
    const {onLoginSuccess} = this.props;
    message.success("Hey, welcome back!.. you see this message because you have logged in successfully");
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
    message.error("Your email or password is not valid, please double check again");
  }

  render() {
    return (
      <div className="ui-login-form">
        <GenerateForm
          className="login-form"
          onSuccess={this.onLoginSuccess}
          endpoint={enpoints.user.login}
          dispatchAfterSuccess={userActions.onLoginSuccess}
          schema={SchemaForm}
          onFail={this.onLoginFail}
          summitProps={{
            shape:"round",
            icon:"user",
            size:"large"
          }}
          submitLabel={t1('Login/register')}

        />
      </div>
    );
  }
}

RegisterForm.propTypes = {
    onLoginSuccess: PropTypes.func
}

export default RegisterForm;
