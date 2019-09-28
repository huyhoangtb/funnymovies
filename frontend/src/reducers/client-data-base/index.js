import {dataActionTypes} from 'action-creators/client-database';

const clientDataBaseState = {};

const ClientDataBase = (state = clientDataBaseState, action) => {
  let newState = {};
  switch (action.type) {
    case dataActionTypes.STORE_DATA_USING_NAMESPACE:
      const {values, namespace} = action;
      if (typeof namespace === 'object') {
        newState = {
          ...state,
          [namespace.name]: {[values[namespace.key]]: values},
        };
      } else {
        newState = {
          ...state,
          [namespace]: values,
        };
      }

      break;
    case dataActionTypes.UPDATE_PROP_OF_CLIENT_DATABASE:
      const {updatedValue, options} = action;

      if (!options) break;

      const {key, prop, propValue} = options;
      const data = state[options.namespace] && state[options.namespace][key];
      if(!data) break;

      data[prop] = propValue;

      newState = {
        ...state,
        [options.namespace]: {[key]: {...data}},
      };

      break;

    case dataActionTypes.STORE_SINGLE_DATA:
      const {value} = action;
      const id = value.iid || value._id || value.id;
      newState = {
        ...state,
        [id]: value,
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default ClientDataBase;
