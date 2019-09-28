import React from 'react';
import Layout from 'antd/lib/layout';
import {connect} from 'react-redux';
import './stylesheet.scss';

const {Content, Footer} = Layout;

class CashRent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Layout className="ui-funny-movies-layout">
        <Content className="ui-funny-movies-body">
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default connect()(CashRent);

