import React from 'react';
import { setLayout } from './actions';
import { connect } from 'react-redux';

export const LayoutRegistered = {
  defaultLayout: 'defaultLayout',
  frontend: 'frontend',
  adminLayout: 'adminLayout',
  meetLayout: 'meetLayout',
};

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class LayoutHelper {

  useLayout(layoutId, component, params) {
    const { dispatch } = component.props;
    if (layoutId) {
      dispatch(setLayout(layoutId, params));
    }
  }

  setLayout(componentContext) {
    const theme = process.env.REACT_APP_THEME || LayoutRegistered.obolex;

    this.useLayout(theme, componentContext);
  }

}

class LayoutClass extends React.Component {
  componentWillMount() {
    const { dispatch, layoutId, params } = this.props;
    if (layoutId) {
      dispatch(setLayout(layoutId, params));
    }
  }

  render() {
    return (<span />);
  }
}

export const Layout = connect()(LayoutClass);

export default new LayoutHelper();

