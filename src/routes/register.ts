/* eslint-disable @typescript-eslint/camelcase */
import express from 'express';
import fetch from 'node-fetch';
import { registerMiddleware, registerCallbackMiddleware } from '../middlewares';
import { hgetallAsync, hmsetAsync } from '../helpers/redisAsync';

const router = express.Router();

router.get('/', registerMiddleware);

router.get('/callback', registerCallbackMiddleware);

// // +++++++++
// router.get('/shows', async (req, res) => {
//   const userCredentials: AuthorizationResponse = await hgetallAsync(
//     'matheushrt@gmail.com'
//   );
//   const user: SpotifyUser = await (
//     await fetch('https://api.spotify.com/v1/episodes/0SA5skRZm8os9X6bzJJcui', {
//       headers: {
//         Authorization: `Bearer ${userCredentials.access_token}`
//       }
//     })
//   ).json();

//   res.json(user);
// });

// // +++++++++
// router.get('/play', async (req, res) => {
//   try {
//     const userCredentials: AuthorizationResponse = await hgetallAsync(
//       'matheushrt@gmail.com'
//     );
//     const user = await fetch(
//       'https://api.spotify.com/v1/me/player/currently-playing',
//       {
//         headers: {
//           Authorization: `Bearer ${userCredentials.access_token}`
//         }
//       }
//     );
//     res.status(user.status);

//     const response: { status: number; statusText: string } | SpotifyUser =
//       user.status !== 200
//         ? { status: user.status, statusText: user.statusText }
//         : await user.json();

//     res.json(response);
//   } catch (error) {
//     console.error(error);
//   }
// });

// // +++++++++
// router.get('/track', async (req, res) => {
//   try {
//     const userCredentials: AuthorizationResponse = await hgetallAsync(
//       'matheushrt@gmail.com'
//     );
//     const user = await fetch(
//       'https://api.spotify.com/v1/audio-features/57yI1u6t6cFXbjgjQcRHug',
//       {
//         headers: {
//           Authorization: `Bearer ${userCredentials.access_token}`
//         }
//       }
//     );
//     res.status(user.status);

//     const response: { status: number; statusText: string } | SpotifyUser =
//       user.status !== 200
//         ? { status: user.status, statusText: user.statusText }
//         : await user.json();

//     res.json(response);
//   } catch (error) {
//     console.error(error);
//   }
// });

// // +++++++++
// router.get('/player', async (req, res) => {
//   try {
//     const userCredentials: AuthorizationResponse = await hgetallAsync(
//       'matheushrt@gmail.com'
//     );
//     const user = await fetch('https://api.spotify.com/v1/me/player', {
//       headers: {
//         Authorization: `Bearer ${userCredentials.access_token}`
//       }
//     });
//     res.status(user.status);

//     const response: { status: number; statusText: string } | SpotifyUser =
//       user.status !== 200
//         ? { status: user.status, statusText: user.statusText }
//         : await user.json();

//     res.json(response);
//   } catch (error) {
//     console.error(error);
//   }
// });

// // +++++++++
// router.get('/podcast', async (req, res) => {
//   try {
//     const userCredentials: AuthorizationResponse = await hgetallAsync(
//       'matheushrt@gmail.com'
//     );
//     const user = await fetch(
//       'https://api.spotify.com/v1/search?query=podne*&type=show&offset=0&limit=50',
//       {
//         headers: {
//           Authorization: `Bearer ${userCredentials.access_token}`
//         }
//       }
//     );
//     res.status(user.status);

//     const response: { status: number; statusText: string } | SpotifyUser =
//       user.status !== 200
//         ? { status: user.status, statusText: user.statusText }
//         : await user.json();

//     res.json(response);
//   } catch (error) {
//     console.error(error);
//   }
// });

// // +++++++++
// router.get('/recent', async (req, res) => {
//   try {
//     const userCredentials: AuthorizationResponse = await hgetallAsync(
//       'matheushrt@gmail.com'
//     );
//     const user = await fetch(
//       'https://api.spotify.com/v1/me/player/recently-played',
//       {
//         headers: {
//           Authorization: `Bearer ${userCredentials.access_token}`
//         }
//       }
//     );
//     res.status(user.status);

//     const response: { status: number; statusText: string } | SpotifyUser =
//       user.status !== 200
//         ? { status: user.status, statusText: user.statusText }
//         : await user.json();

//     res.json(response);
//   } catch (error) {
//     console.error(error);
//   }
// });

export default router;
