import React from 'react';
import PAGE_CODES from 'themes/register/PageCodes'
import Page from 'themes/helpers/Page';
import PopoverSubLayoutHelper from "../layouts/helpers/PopoverSubLayoutHelper";

const ROOT = '';

export default [
  {
    path: `${ROOT}/`,
    component: PopoverSubLayoutHelper,
    popupDefaultTitle:'Share a Youtube movie',
    defaultComponent: (props) => <Page {...props}  pageCode={PAGE_CODES.HOME}/>,
    popupScreenId:'shareMovie',
    routes: [
      {
        path: `${ROOT}/share-movie`,
        exact: true,
        component: (props) => <Page {...props} pageCode={PAGE_CODES.SHARE_MOVIE}/>,
      }
    ]
  },
  // {
  //   path: ROOT,
  //   exact: true,
  //   component:(props) => <Page {...props}pageCode={PAGE_CODES.HOME}/>,
  // },
];
