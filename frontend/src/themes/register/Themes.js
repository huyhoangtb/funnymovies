import React from 'react';
import ThemeCodes from 'themes/register/ThemeCodes'
import Loadable from 'react-loadable';
import Loading from 'components/common/viewers/loading';

const funnyMoviesTheme = Loadable({
  loader: () => import(/* webpackChunkName: "themes.funnyMoviesTheme" */ 'themes/funny-movies'),
  loading: Loading,
});

export default {
  [ThemeCodes.funnyMoviesTheme]: funnyMoviesTheme,
}
