import React from 'react';
import { connect } from 'react-redux';
import { multiLanguage } from 'i18n';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class CenterItemViewer extends React.Component {

  render() {
    const { width, height, disableHover } = this.props;
    const className = this.props.className || '';

    return (
      <div className={`center-viewer-panel ${className} ${disableHover ? '' : 'on-hover'}`} style={{ width, height }}>
        {this.props.children}
      </div>
    );
  }
}

const mapPropsToState = (state) => (
  {}
);

export default connect(mapPropsToState)(multiLanguage(CenterItemViewer));
