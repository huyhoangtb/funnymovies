import React from 'react';
import PropsType from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import PagesOfTheme from 'themes/register/Pages'

const pageNotfound = <div>component not found</div>;

const Page = (props) => {
  const {pageCode} = props;
  const theme = props.theme || {};
  const themeCode = theme.code;

  if (!PagesOfTheme || !PagesOfTheme[themeCode] || !PagesOfTheme[themeCode][pageCode]) {
    return pageNotfound;
  }
  const Page = PagesOfTheme[themeCode][pageCode];

  return <Page {...props}/>;
};

Page.propsTypes = {
  pageCode: PropsType.string,
  themeCode: PropsType.string,
}

const mapStateToProps = (state) => {
  const domain = state.domain || {};
  const theme = domain.theme || {};
  return {
    theme,
  };
};

export default connect(mapStateToProps)(Page);
