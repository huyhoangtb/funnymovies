const prefix = '/api/v1';

export default {

  user: {
    login: `${prefix}/user/login`,
    logout: `${prefix}/user/logout`,
  },
  movie: {
    shareVideo: (youtubeId) =>`${prefix}/movies/create/${youtubeId}`,
  },

  context: {
    publicContext: `${prefix}/system/context`,
  },
};
