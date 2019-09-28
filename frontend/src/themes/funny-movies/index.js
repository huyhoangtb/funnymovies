import React from 'react';
import Layout from 'antd/lib/layout';
import MoviesBanner from './components/banner'
import {connect} from 'react-redux';
import './stylesheet.scss';

const {Content, Footer, Header} = Layout;

class CashRent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Layout className="ui-funny-movies-layout">
        <Header>
          <MoviesBanner/>
        </Header>
        <Content className="ui-funny-movies-body">
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default connect()(CashRent);

