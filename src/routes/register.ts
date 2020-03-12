/* eslint-disable @typescript-eslint/camelcase */
import express from 'express';
import {
  registerMiddleware,
  registerCallbackMiddleware,
  registerTemplateMiddleware
} from '../middlewares/register';

const router = express.Router();

router.get('/', registerMiddleware);

router.get('/callback', registerCallbackMiddleware);

router.get('/bot-register', registerTemplateMiddleware);

export default router;
