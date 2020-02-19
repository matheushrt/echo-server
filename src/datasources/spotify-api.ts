/* eslint-disable @typescript-eslint/camelcase */
import { RESTDataSource } from 'apollo-datasource-rest';
import qs from 'querystring';
import { hgetallAsync, hmsetAsync } from '../helpers/redisAsync';

export default class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1';
  }

  async getUser(email: string): Promise<object> {
    const userCredentials: AuthorizationResponse = await this.refreshToken(
      email
    );

    try {
      // userCredentials = await hgetallAsync(email);
      return await this.get('/me', null, {
        headers: {
          Authorization: `Bearer ${userCredentials?.access_token}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async refreshToken(email: string): Promise<AuthorizationResponse> {
    let userCredentials: AuthorizationResponse = await hgetallAsync(email);

    if (Date.now() <= userCredentials.tokenExpirationTime) {
      return userCredentials;
    } else {
      const bodyParams: TokenBodyParams = {
        grant_type: 'refresh_token',
        refresh_token: userCredentials?.refresh_token,
        redirect_uri: 'http://localhost:4000/register/callback'
      };

      try {
        const spotifyJSONResponse = await this.get(
          'https://accounts.spotify.com/api/token',
          null,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
              ).toString('base64')}`
            },
            body: qs.stringify({ ...bodyParams })
          }
        );

        // transforming expires_in to milliseconds
        const tokenExpirationTime =
          Date.now() + spotifyJSONResponse.expires_in * 1000;

        userCredentials = {
          ...spotifyJSONResponse,
          tokenExpirationTime
        };

        if (email && userCredentials?.access_token) {
          await hmsetAsync(email, { ...userCredentials });
        }

        return userCredentials;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
