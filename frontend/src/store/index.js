import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import { createBrowserHistory } from 'history';
import { devToolsEnhancer } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router'
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { blacklist, whitelist } from 'reducers/persist-keys';
import createRootReducer from 'reducers';
import mySaga from 'sagas';

delete window.__PRELOADED_STATE__;

const config = {
  key: 'primary',
  storage,
  blacklist,
  whitelist,
};

const sagaMiddleware = createSagaMiddleware();


export const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const rootReducer = persistCombineReducers(config, createRootReducer(history));

const Store = createStore(rootReducer, undefined,
  compose(
    applyMiddleware(historyMiddleware),
    applyMiddleware(sagaMiddleware),
    devToolsEnhancer ? devToolsEnhancer() : (f) => f,
  ));

sagaMiddleware.run(mySaga);
const persistConfig = null; // { whitelist, blacklist };
// begin periodically persisting the store
export const persistor = persistStore(Store, persistConfig, () => Store.getState());

// Tell react-snap how to save Redux state
window.snapSaveState = () => ({
  __PRELOADED_STATE__: Store.getState(),
});

export default Store;
