import { options } from 'schema-form/common';

export const dataActionTypes = {
  FETCH_DATA: 'RC_FETCH_DATA',
  UPDATE_NODE_DATA: 'RC_UPDATE_NODE_DATA',
  STORE_DATA_USING_NAMESPACE: 'RC_STORE_DATA_USING_NAMESPACE',
  UPDATE_PROP_OF_CLIENT_DATABASE: 'UPDATE_PROP_OF_CLIENT_DATABASE',
  STORE_SINGLE_DATA: 'RC_STORE_SINGLE_DATA',
};

export default {
  fetch: (url, values, options, method) => ({
    type: dataActionTypes.FETCH_DATA,
    url,
    values,
    options,
    method,
  }),
  feetchWithoutParam: (url, options, method) => ({
    type: dataActionTypes.FETCH_DATA,
    url,
    options,
    method,
  }),
  updateNode: (url, values, options, method) => ({
    type: dataActionTypes.UPDATE_NODE_DATA,
    url,
    values,
    options,
    method,
  }),
  storeDataUsingNamespace: (values, namespace) => ({
    type: dataActionTypes.STORE_DATA_USING_NAMESPACE,
    values,
    namespace,
  }),
  updatePropsOfClientDatabase: (updatedValue, options) => ({
    type: dataActionTypes.UPDATE_PROP_OF_CLIENT_DATABASE,
    updatedValue,
    options,
  }),
  storeSingleData: (value) => ({
    type: dataActionTypes.STORE_SINGLE_DATA,
    value,
  }),
};

export const optionsTmpl = { ...options };
