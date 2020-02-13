import { Model } from 'objection';
import Knex from 'knex';
import * as config from './knexfile';

const env = process.env.ENVIRONMENT || 'development';
const cfg = config[env];

// Initialize knex.
const knex = Knex(cfg);

// Give the knex instance to objection.
Model.knex(knex);
