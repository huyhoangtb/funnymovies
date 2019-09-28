import React from 'react';
import {render, hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router'
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/lib/integration/react';
import IntlProvider from 'i18n/I18nComponent';
import appRouters from 'routes';
import {renderRoutes} from 'react-router-config';
import Store, {history, persistor} from './store';

window.rootAppContainer = document.getElementById('root');

hydrate(
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          {renderRoutes(appRouters)}
        </ConnectedRouter>
      </IntlProvider>
    </PersistGate>
  </Provider>, window.rootAppContainer,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
