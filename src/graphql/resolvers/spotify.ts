export default {
  Query: {
    me: (_, __, { dataSources }): {} => dataSources.spotifyAPI.getMe()
  }
};
