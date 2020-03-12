import { RequestHandler } from 'express';
import { hgetallAsync, hmsetAsync } from '../../helpers/redisAsync';
import fetch from 'node-fetch';

export const currentlyPlayingMiddleware: RequestHandler = async (req, res) => {
  const userCredentials: AuthorizationResponse = await hgetallAsync(
    'matheushrt@gmail.com'
  );
  // const user: SpotifyUser = await (
  //   await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
  //     headers: {
  //       Authorization: `Bearer ${userCredentials.access_token}`
  //     }
  //   })
  // ).json();

  res.json(userCredentials);
  // res.render('telegram');
};
