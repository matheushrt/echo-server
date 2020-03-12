import createError from 'http-errors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import typeDefs from './graphql/schemas/User';
import resolvers from './graphql/resolvers/spotify';
import SpotifyAPI from './datasources/spotify-api';
import './database/config';
import { register, spotify } from './routes';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: (): {} => ({
    spotifyAPI: new SpotifyAPI()
  })
});
const app = express();
server.applyMiddleware({ app });

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// template engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// routes
app.use('/register', register);
app.use('/spotify', spotify);

// catch 404
app.use((req, res) => {
  const { status, message } = createError(404);
  res.status(status).send(message);
});

export default app;
