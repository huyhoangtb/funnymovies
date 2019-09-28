import React from 'react';
import { Icon, Input } from 'antd';
import { t1 } from 'i18n';
import Validators from 'common/validate';

export const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export default (($this) => {
  return [
    {
      name: 'email',
      isFull: true,
      colSpan: 8,
      component: Input,
      decoratorOption: { rules: [{ required: true, message: t1('Email is required!') }] },
      componentProps: {
        placeholder: t1('Email'),
        prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
      },
    },
    {
      name: 'password',
      isFull: true,
      colSpan: 8,
      decoratorOption: { rules: [{ required: true, message: t1('Password is required!') }] },
      validator: Validators.passwordValidator,
      component: Input.Password,
      componentProps: {
        placeholder: t1('Your password'),
        prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
      },
    },
  ];
});
