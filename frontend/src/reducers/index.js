import { connectRouter } from 'connected-react-router';
import CommonState from './common';
import DomainState from './domain';
import layout from './layout';
import context from './context';
import layoutContext from './context/layout';
import siteLanguage from './language';
import clientDataBase from './client-data-base';
import user from './user';

export default (history) => ({
  router: connectRouter(history),
  common: CommonState,
  layout,
  siteLanguage,
  user,
  context,
  domain: DomainState,
  layoutContext,
  clientDataBase,
});
