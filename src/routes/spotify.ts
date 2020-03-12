/* eslint-disable @typescript-eslint/camelcase */
import express from 'express';
import { currentlyPlayingMiddleware } from '../middlewares/spotify';

const router = express.Router();

router.get('/currently-playing', currentlyPlayingMiddleware);

export default router;
