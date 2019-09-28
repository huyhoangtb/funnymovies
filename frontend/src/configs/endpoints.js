
// ${process.env.REACT_APP_SERVER_API_URL}
const prefix = '/api/v1';

export default {
  cndServer: process.env.REACT_APP_CDN_SERVER_URL,

  user: {
    create: `${prefix}/user/create`,
    register: `${prefix}/user/register`,
    login: `${prefix}/user/login`,
    logout: `${prefix}/user/logout`,
    detail: `${prefix}/user/detail`,
  },

  context: {
    publicContext: `${prefix}/system/context`,
  },
};
