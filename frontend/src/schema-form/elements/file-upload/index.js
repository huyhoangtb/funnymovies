import React from 'react';
import {message, Upload} from 'antd';
import './stylesheet.scss';
import {connect} from 'react-redux';
import Endpoint from '../../../configs/endpoints';

const Dragger = Upload.Dragger;

class FileUpload extends React.Component {

  state = {};
  getComponentDefaultProps = () => {
    const {name, fileName, multiple, user, org, action, url, endpoint, onChange, onFormChanged} = this.props;
    const $this = this;
    return {
      name: name || fileName || 'file',
      multiple,
      headers: {
        orgIid: (org && org.iid) || (user && user.orgIids && user.orgIids.length > 0 && user.orgIids[0]),
        orgRootIid: user && user.orgRootIid,
        userIid: user && user.iid,
      },
      action: action || url || endpoint || Endpoint.file.upload,
      onChange: (info) => {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log('uploading'); //,info.file, info.fileList
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          const response = info.file && info.file.response;
          onChange && onChange(response._result);
          onFormChanged && onFormChanged();
          return;
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
        onChange && onChange(info);
      },
    };
  }




  getValueFromEvent = (e) => {
    console.log('getValueFromEvent', e);
  }

  defaultGetValueFromEvent(e) {
    console.log('eeeeee', e);
  }

  render() {
    const props = {...this.props};
    delete props.onChange;
    delete props.endpoint;
    delete props.url;
    delete props.org;
    delete props.user;
    delete props.fileName;

    return (
      <div>
        <Dragger {...props}
                 beforeUpload={this.props.beforeUpload}
                 value={this.state.value}
                 {...this.getComponentDefaultProps()} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user || {},
    org: state.user.currentOrg || {},
  };
};

export default connect(mapStateToProps)(FileUpload);
