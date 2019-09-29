import React from 'react';
import {Button, Col, Form, Popconfirm, Row, Tabs} from 'antd';
import {connect} from 'react-redux';
import FormCommon from 'schema-form/common';
import './stylesheet.scss';

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;


/**
 * Created by Peter Hoang Nguyen - skype_id: vitechsoft_hoangnh
 * Email: vntopmas@gmail.com
 **/
class SForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSummitForm = (e) => {
    const {
      url, endpoint, onSummit, beforeSummit, onSuccess, onFail, disableResponseMessage, attachedNodes, documentData,
      checkSuccessOnField, dispatchFullResponse, dispatchAfterSuccess, node, formData, nodeAction, hiddenFields,
    } = this.props;
    const options = {
      url,
      endpoint,
      onSummit,
      beforeSummit,
      disableResponseMessage,
      onSuccess,
      onFail,
      nodeAction,
      documentData,
      checkSuccessOnField,
      dispatchFullResponse,
      dispatchAfterSuccess,
      formData,
      attachedNodes,
      hiddenFields,
    };

    FormCommon.submitForm(e, this.props.form, options, node);
  }

  summitOnEnter = (event) => {
    event = event || window.event;
    const className = event && event.target && event.target.className;

    if (!className || !className.split(' ').includes('ant-input')) {
      return;
    }

    if (event.key === 'Enter' || event.keyCode == 13) {
      this.onSummitForm(event);
    }
  }

  render() {
    let {submitLabel, resetLabel, className, leftSummitBtn, leftSummitBtns, rightSummitBtn, rightSummitBtns, confirmBeforeSummit, confirmText, layout} = this.props;
    submitLabel = submitLabel || 'submit';
    const formProps = this.props.formProps || {};
    const summitProps = this.props.summitProps || {}

    return (
      <Form
        {...formProps}
        onKeyPress={this.summitOnEnter}
        className={`ant-advanced-search-form schema-form-panel ${className}`}
      >

        {this.props.children}
        <div className='ant-col ant-col-8 ui-btn-submit-panel'>
          <Form.Item>
            {leftSummitBtn}
            {leftSummitBtns}
            {
              confirmBeforeSummit &&
              <Popconfirm
                placement="topLeft" title={confirmText}
                onConfirm={this.onSummitForm} okText="Yes" cancelText="No"
              >
                <Button type="primary">{submitLabel}</Button>
              </Popconfirm>
            }
            {
              !confirmBeforeSummit &&
              <Button ref="summitButton" className='summit-btn' type="primary" {...summitProps}
                      onClick={this.onSummitForm}>{submitLabel}</Button>
            }
            {
              rightSummitBtn
            }
            {
              rightSummitBtns
            }
          </Form.Item>
        </div>
      </Form>
    );
  }
}

export default connect()(SForm);
