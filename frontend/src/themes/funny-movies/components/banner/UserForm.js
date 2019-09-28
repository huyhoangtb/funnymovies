import React from 'react';
import './stylesheet.scss';
import FormGeneration from "../../../../schema-form/GenerateForm";
import enpoints from "../../../../configs/endpoints";
import userActions from "../../../../action-creators/user";
import {t1} from "../../../../i18n";
import SchemaForm from "./schema";
import {message} from "antd";
import {getParamsFromSearchString} from "../../../../common";
import {history} from "../../../../store";


class UserForm extends React.Component {

  constructor(props) {
    super(props);
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

      <FormGeneration
        className="login-form"
        formProps={{
          layout: 'inline',
          className:'ui-user-form'
        }}
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

    );
  }
}

export default UserForm;

