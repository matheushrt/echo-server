/* eslint-disable @typescript-eslint/camelcase */
import { RequestHandler } from 'express';
import qs from 'querystring';
import fetch from 'node-fetch';
import { setAsync, getAsync, hmsetAsync } from '../../helpers/redisAsync';
import { User } from '../../database/models';

export const registerMiddleware: RequestHandler = async (req, res) => {
  const queryParameters: AuthorizeQueryParams = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    scope:
      'user-library-read user-read-private user-read-email user-read-currently-playing user-read-playback-state user-read-recently-played',
    redirect_uri: 'http://localhost:4000/register/callback'
  };

  // temporarily registering telegram user id for later use
  // if spotify login is ok then we create a new user on db
  // and save telegram user id with it
  const telegram_user_id = req?.query?.id;

  if (telegram_user_id) {
    await setAsync('telegram_user_id', telegram_user_id);
    res.redirect(
      `https://accounts.spotify.com/authorize?${qs.stringify({
        ...queryParameters
      })}`
    );
  } else res.sendStatus(401);
};

export const registerCallbackMiddleware: RequestHandler = async (req, res) => {
  const bodyParams: TokenBodyParams = {
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: 'http://localhost:4000/register/callback'
  };

  try {
    const spotifyResponse = await fetch(
      'https://accounts.spotify.com/api/token',
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

    const spotifyJSONResponse: AuthorizationResponse = await spotifyResponse.json();

    if (spotifyJSONResponse) {
      const user: SpotifyUser = await (
        await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${spotifyJSONResponse.access_token}`
          }
        })
      ).json();

      // transforming expires_in to milliseconds
      const tokenExpirationTime =
        Date.now() + spotifyJSONResponse.expires_in * 1000;

      const userCredentials: AuthorizationResponse = {
        ...spotifyJSONResponse,
        tokenExpirationTime
      };

      if (user?.email && userCredentials?.access_token) {
        const telegram_user_id = await getAsync('telegram_user_id');
        await hmsetAsync(user.email, { ...userCredentials, telegram_user_id });

        const graph = {
          id: user.id,
          email: user.email,
          telegram_user_id: parseInt(telegram_user_id),
          display_name: user.display_name,
          image: user.images[0].url,
          href: user.href,
          product: user.product,
          type: user.type,
          uri: user.uri,
          external_url: user.external_urls.spotify,
          followers: user.followers.total
        };

        const userExists = await User.query().findById(graph.id);

        if (userExists) {
          return res.status(403).send('User already registered');
        }

        await User.query().insertGraphAndFetch(graph);

        res.status(201).send('REGISTERED! YOU MAY NOW CLOSE THIS WINDOW.');
      } else res.sendStatus(401);
    } else res.sendStatus(401);
  } catch (error) {
    console.error(error);
  }
};

export const registerTemplateMiddleware: RequestHandler = (req, res) => {
  res.render('register', { botName: process.env.TELEGRAM_BOT_NAME });
};
