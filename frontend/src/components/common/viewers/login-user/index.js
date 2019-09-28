import React from 'react';
import {Avatar, Icon, Popover, Progress} from 'antd';
import {connect} from 'react-redux';
import './stylesheet.scss';
import {Link} from "react-router-dom";
import {t1} from "../../../../i18n";

class LoginUser extends React.Component {

  getShortName = () => {
    const user = this.props.user || {};
    let name = user.firstName || user.lastname || user.fullname || '';
    name = name.trim();
    if (name.length > 0) {
      return name.charAt(0);
    }

    return 'OCDM';

  }

  getFullname = () => {
    const user = this.props.user || {};
    return user.fullname || `${user.firstName} ${user.lastName}`;
  }

  render() {
    const user = this.props.user || {};

    const content = (
      <ul className='user-account-short-link'>
        <li><Link to={'/academy/progress'}><Progress type="circle" percent={30} width={16} /><span>{t1('My progress')}</span></Link></li>
        <li><Link to={'/academy/course-management'}><Icon type="container"/><span>{t1('My course')}</span></Link></li>
        <li><Link to={'/academy/info'}><Icon type="user"/><span>{t1('My account')}</span></Link></li>
        <li><Link to={'/academy/change-password'}><Icon type="key"/><span>{t1('Change password')}</span></Link></li>
      </ul>
    )

    return (
      <Popover
        content={content}
        placement="bottom"
        trigger="hover"
        className='user-menu-popover'
        title="User profiles"
        trigger="click">
        <div className="ui-user-avatar">
          <div className="avatar">
            <Avatar size="small" src={user.avatar}>{this.getShortName()}</Avatar>
          </div>
          <div className="info">
            <div className="display-name">{this.getFullname()} <Icon style={{fontSize: '10px'}} type="down"/></div>
            {/*<div className="role-name">Administrator </div>*/}
          </div>
        </div>
      </Popover>
    );
  }
}

const mapStateToProps = (state) => {
  const userStore = state.user || {}
  return {
    user: userStore.user,
    authInfo: userStore.authInfo
  }
}
export default connect(mapStateToProps)(LoginUser);
