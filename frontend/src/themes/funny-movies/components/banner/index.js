import React from 'react';
import Layout from 'antd/lib/layout';
import {Link} from 'react-router-dom';
import User from './User';
import { Button } from 'antd';
import './stylesheet.scss';

const {Content, Footer} = Layout;

class FunnyMovieBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='ui-banner-top'>
        <div className='ui-body-panel ui-banner-body'>
          <div className='ui-logo-panel'><Link  to={'/'}><span className='ui-funny'>Funny</span> Movies</Link> </div>
          <div className='ui-login-register'>
            <User/>
          </div>
        </div>
      </div>
    );
  }
}

export default FunnyMovieBanner;

