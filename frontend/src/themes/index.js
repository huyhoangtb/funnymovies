import React from 'react';
import { connect } from 'react-redux';
import themeActions from './actions';
import ThemeRegister from './register/Themes';
import ThemeCodes from './register/ThemeCodes';

class FrontendLayout extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(themeActions.setThemeDetail({code: ThemeCodes.funnyMoviesTheme}));
  }

  render() {
    const theme = this.props.theme || {};

    if(!theme || !theme.code || !ThemeRegister[theme.code]) {
      return <div>page not found 1</div>
    }

    const Container = ThemeRegister[theme.code];
    return (
      <Container {...this.props}>
        {this.props.children}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const domain = state.domain || {};
  const theme = domain.theme || {};
  return {
    theme,
  };
};

export default connect(mapStateToProps)(FrontendLayout);
