import React from 'react';
import LoginForm from './form';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui-my-component">
        <LoginForm />
      </div>
    );
  }
}

export default MyComponent;
