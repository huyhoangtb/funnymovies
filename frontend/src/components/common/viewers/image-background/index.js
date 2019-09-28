import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class ImageBackGround extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { width, height, src, className, children, bgClassName, imgClass } = this.props;
    return (
      <div className="ui-image-background" style={{ width: `${width}px`, height: `${height}px` }}>
        <div className={`image-panel ${bgClassName}`}>
          {src && <img src={src} className={`${imgClass} fullscreen`} title="bg" />}
        </div>
        <div className={`text-panel ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
          {children}
        </div>
      </div>
    );
  }
}

ImageBackGround.propTypes = {
  bgClassName: PropTypes.string,
  className: PropTypes.string,
  imgClass: PropTypes.string,
  src: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default ImageBackGround;
