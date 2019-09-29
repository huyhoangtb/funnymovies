const prefix = '/api/v1';

export default {

  user: {
    login: `${prefix}/user/login`,
    logout: `${prefix}/user/logout`,
  },
  movie: {
    shareVideo: (youtubeId) =>`${prefix}/movies/create/${youtubeId}`,
    getMovies: `${prefix}/movies?filter[order]=createdDate%20DESC`,
  },

  context: {
    publicContext: `${prefix}/system/context`,
  },
};
