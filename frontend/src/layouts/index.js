import React from 'react';
import { connect } from 'react-redux';
import contextActions from 'action-creators/context';
import { matchRoutes, renderRoutes } from 'react-router-config';
import 'antd/dist/antd.less';
import { checkPermissionsOfRoute } from 'configs/Roles';
import { BackTop } from 'antd';
import { history } from '../store';
import LayoutRegister from './register';

import './layout-common.scss';

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class Layouts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      router: {},
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(contextActions.getApplicationContext());
    window.NProgress.configure({
      template: '<div class="bar" role="bar"><div class="peg" ></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    });
    this.handleOnChangeLayout();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.handleOnChangeLayout(nextProps);
    }
  }

  componentWillUnmount() {
    window.messagePopup = undefined;
    window.removeEventListener('resize', this.updateWindowDimensions);
  }


  handleOnChangeLayout = (nextProps) => {
    const { dispatch, location, route, authInfo } = nextProps || this.props;
    if (!location) {
      return;
    }
    const branches = matchRoutes(route.routes, location.pathname);
    if (!branches || branches.length === 0) {
      return;
    }
    const branchRoute = branches[0].route;
    if (branchRoute && branchRoute.layout && (!this.state.layoutId || branchRoute.layout !== this.state.layoutId)) {
      const layoutId = branchRoute.layout;
      this.setState({ layoutId });
    }
    branches.map((branch) => {
      checkPermissionsOfRoute(branch, dispatch, history, authInfo);
    });
  }

  render() {
    const { route } = this.props;
    const layoutId = this.state.layoutId;

    if (!layoutId) {
      return (<div>Site not found</div>);
    }
    const CurrentLayoutConfig = LayoutRegister[layoutId];
    return (
      <div className="ui-root-layout">

        <CurrentLayoutConfig.component onLayoutChange={this.handleOnChangeLayout}>
          {renderRoutes(route.routes)}
        </CurrentLayoutConfig.component>

        <BackTop>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentLayout: state.layout,
    user: state.user.user,
    authInfo: state.user,
  };
};

export default connect(mapStateToProps)(Layouts);
