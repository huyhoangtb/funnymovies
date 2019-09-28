import React from 'react';
import {fetchData} from 'common';
import fetchDataToClientDataBase from 'action-creators/client-database';

export default (props) => {
  const config = props || {};
  const name = config.name || 'documentData';
  const clientDataBase = config.clientDataBase;
  return (Component) => {
    return class extends React.Component {
      state = {};

      componentDidMount = async () => {
        let routeParams = this.props.routeParams || {};
        const url = config.url || config.endpoint;

        if (!url) {
          return;
        }

        if (clientDataBase) {
          const {dispatch} = this.props;
          dispatch(fetchDataToClientDataBase.fetch(url, routeParams, {...clientDataBase}));
          return;
        }

        const response = await fetchData(url, routeParams);
        if (response) {
          this.setState({[name]: response});
        }
      }

      render() {
        const value = this.state[name];
        const data = {[name]: value};
        return (
          <Component
            {...this.props}
            {...data}>

            {this.props.children}

          </Component>
        );
      }
    };
  };
};
