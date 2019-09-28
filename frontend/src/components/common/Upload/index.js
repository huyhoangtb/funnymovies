import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import Store from 'store';
import PropTypes from 'prop-types';
import Endpoints from 'configs/endpoints';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class UploadComponent extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList });

  getFileList = () => {
    const fileList = this.props.fileList || [];
    if (!fileList) {
      return [];
    }
    const result = [];
    fileList.map((file) => {
      let url = file.url || file.thumbUrl;
      if (!url.startsWith('http')) {
        url = `${this.props.cndUrl || Endpoints.cndServer}/${url}`;
      }
      result.push({
        ...file,
        url,
      });
    });
    return result;
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const token = Store.getState().user.token || {};
    const { url, data, handleChange, fileList, label, accept, onSuccess, maxFileNumber } = this.props;
    const max = maxFileNumber || 3;
    const { viewOnly } = this.props;

    return (
      <div className="clearfix transaction-evidence padding-10">
        <h2 className="header-title-m">{label}</h2>
        <Upload
          accept={accept}
          data={data || {}}
          headers={{ Authorization: `Bearer ${token.access_token}` }}
          action={url}
          onSuccess={onSuccess}
          listType="picture-card"
          fileList={this.getFileList()}
          multiple
          showUploadList={{
            showRemoveIcon: false,
          }}
          onPreview={this.handlePreview}
          onChange={handleChange}
        >
          {viewOnly || (fileList && fileList.length >= max) ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

UploadComponent.propTypes = {
  viewOnly: PropTypes.bool,
};

UploadComponent.defaultProps = {
  viewOnly: false,
};

export default UploadComponent;
