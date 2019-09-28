import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';
import Loadable from "react-loadable";
import Loading from "../../common/viewers/loading";

const Richtext = Loadable({
  loader: () => import(/* webpackChunkName: "dev/elements/richtext" */ 'schema-form/elements/power-richtext'),
  loading: Loading,
});


class DevRichtext extends React.Component {
  render() {
    return (
      <div className='ui-dev-richtext'>
        <Richtext/>
      </div>
    );
  }
}

DevRichtext.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  hiddenLeftSlideBar: PropTypes.bool
}
export default DevRichtext;
