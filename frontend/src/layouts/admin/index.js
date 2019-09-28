import React from 'react';
import Layout from 'antd/lib/layout';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import Breadcrumb from 'antd/lib/breadcrumb';
import {connect} from 'react-redux';
import layoutContextAction from '../actions/layout-context';
import AdminTopMenu from './top-menu';
import AdminLeftMenu from './menu-left';
import {t1} from '../../i18n';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import './stylesheet.scss';

const {Header, Content, Footer, Sider} = Layout;
const {TabPane} = Tabs;

class AdminLayout extends React.Component {

  switchStateOfLeftMenu = () => {
    const {layoutContext, dispatch} = this.props;
    dispatch(layoutContextAction.setStateOfLeftMenu(!layoutContext.isOpenLeftMenu));
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    const {layoutContext} = this.props;
    const defaultBreadcrumb = layoutContext.breadcrumb && layoutContext.breadcrumb.default && layoutContext.breadcrumb.default.schema || [];
    return (
      <PerfectScrollbar  ref={(ref) => {
        this._scrollBarRef = ref;
      }}>
        <Layout className="ui-admin-layout">
          <AdminTopMenu/>
          <Layout>
            {/*<Sider*/}
            {/*width={250}*/}
            {/*collapsed={!layoutContext.isOpenLeftMenu}*/}
            {/*className="ui-admin-left-menu-panel ant-layout-sider"*/}
            {/*>*/}
            {/*<AdminLeftMenu/>*/}
            {/*</Sider>*/}
            <Content>
              <Layout>

                {/*<Header className="content-header">*/}
                {/*<Tabs type="card" className='admin-header-tab'>*/}
                {/*<TabPane tab="Tab 1" key="1">*/}
                {/*Content of Tab Pane 1*/}
                {/*</TabPane>*/}
                {/*<TabPane tab="Tab 2" key="2">*/}
                {/*Content of Tab Pane 2*/}
                {/*</TabPane>*/}
                {/*<TabPane tab="Tab 3" key="3">*/}
                {/*Content of Tab Pane 3*/}
                {/*</TabPane>*/}
                {/*</Tabs>*/}
                {/*</Header>*/}

                {/*<Header className="content-header">*/}
                {/*<div className="header-left">*/}
                {/*<div className="flex-center header-collapsed-icon" onClick={this.switchStateOfLeftMenu}>*/}
                {/*<Icon*/}
                {/*className="trigger"*/}
                {/*type={layoutContext.isOpenLeftMenu ? 'menu-fold' : 'menu-unfold'}*/}
                {/*onClick={this.toggle}*/}
                {/*/>*/}
                {/*</div>*/}

                {/*<Breadcrumb>*/}
                {/*<Breadcrumb.Item href="/admin">{t1('admin')}</Breadcrumb.Item>*/}
                {/*{*/}
                {/*defaultBreadcrumb && defaultBreadcrumb.map((breadcrumb) => {*/}
                {/*return (<Breadcrumb.Item*/}
                {/*key={`${breadcrumb.url || breadcrumb.endpoint}.${breadcrumb.id}`}*/}
                {/*href={breadcrumb.url || breadcrumb.endpoint}*/}
                {/*>{breadcrumb.name || breadcrumb.label}</Breadcrumb.Item>);*/}
                {/*})*/}

                {/*}*/}
                {/*</Breadcrumb>*/}
                {/*</div>*/}
                {/*<div className="header-right">*/}
                {/*/!* <LoginedUser/>*!/*/}
                {/*</div>*/}
                {/*</Header>*/}

                <Content className="content-box">
                  <Tabs type="card" className='admin-header-tab'>
                    <TabPane tab="Học liệu" key="1">
                      Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="kế hoạch đào tạo" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Thi trực tuyến" key="4">
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="Báo cáo thống kê" key="4">
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="Tổ chức & nhân sự" key="3">
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="Hệ thống" key="4">
                      Content of Tab Pane 3
                    </TabPane>
                  </Tabs>
                  <div className="ui-main-content-panel">
                    <div className="ui-sub-menu ">
                      {/* <AdminSubMenuLeft/>*/}
                    </div>
                    <div className="content-box-panel">
                      {this.props.children}
                    </div>
                  </div>

                </Content>
              </Layout>
            </Content>
          </Layout>
        </Layout>
      </PerfectScrollbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layoutContext: state.layoutContext,
  };
};


export default connect(mapStateToProps)(AdminLayout);

