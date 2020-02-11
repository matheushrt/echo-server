/* eslint-disable @typescript-eslint/camelcase */
import express from 'express';
import fetch from 'node-fetch';
import qs from 'querystring';
const router = express.Router();

router.get('/', (req, res) => {
  const queryParameters: AuthorizeQueryParams = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    scope: 'user-read-private user-read-email',
    redirect_uri: 'http://localhost:4000/login/callback'
  };

  res.redirect(
    `https://accounts.spotify.com/authorize?${qs.stringify({
      ...queryParameters
    })}`
  );
});

router.get('/callback', async (req, res) => {
  const bodyParams: TokenBodyParams = {
    grant_type: 'authorization_code',
    code: req.query,
    redirect_uri: 'http://localhost:4000/login/callback'
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

    const spotifyJSONResponse = await spotifyResponse.json();
    res.json(spotifyJSONResponse);
  } catch (error) {
    console.error(error);
  }
});

export default router;
