import express from 'express';
import { envs } from './configuration/envs.js';
import passport from './configuration/passport.js';

const app = express();

app.use(express.json());

app.use(passport.initialize())

app.set('port', envs.PORT);

export default app;