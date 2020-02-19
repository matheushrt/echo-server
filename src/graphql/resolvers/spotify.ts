export default {
  Query: {
    user: (_, { email }, { dataSources }): {} =>
      dataSources.spotifyAPI.getUser(email)
  }
};
