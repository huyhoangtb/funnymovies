import { LayoutRegistered } from 'layouts/LayoutHelper';
import RootLayout from 'layouts';
import Loadable from 'react-loadable';
import Frontend from './front-end';
import Loading from '../components/common/viewers/loading';

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "components/user/login" */ 'components/user/login'),
  loading: Loading,
});


const ROOT = '';

export default [
  {
    component: RootLayout,
    routes: [
      {
        path: '/login',
        exact: true,
        component: Login,
        layout: LayoutRegistered.defaultLayout,
      },
      { ...Frontend },
    ],
  },


];
