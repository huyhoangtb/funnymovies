import React from 'react';
import { copyTextToClipboardWithoutFormating } from 'common';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class DescItem extends React.Component {
  onCopy = () => {
    const { value, copedTitle, title } = this.props;
    this.setState({ notify: copedTitle || 'coped' });
    clearTimeout(this.state.timeOutId);
    this.state.timeOutId = setTimeout(() => {
      this.setState({ notify: title });
    }, 3000);

    copyTextToClipboardWithoutFormating(value);
  };

  constructor(props) {
    super(props);
    this.state = { timeOutId: undefined };
  }

  render() {
    const { value, copedTitle, title, isBox } = this.props;
    return (
      <i
        className={`copy-icon mi mi-content-copy copy-button ${isBox ? 'is-box' : ''}`}
        title={this.state.notify || title} onClick={this.onCopy}
      />
    );
  }
}


export default DescItem;
