import express from 'express';
import { envs } from './configuration/envs.js';
import passport from './configuration/passport.js';
import userRouter from './module/user/user.route.js'
/* import alumnoRoutes from './module/alumno/alumno.route.js';
import profesorRoutes from './module/profesor/profesor.route.js'; */
const app = express();

app.use(express.json());

app.use(passport.initialize())

/* app.use('/alumno', alumnoRoutes);
app.use('/profesor', profesorRoutes); */

app.set('port', envs.PORT);

app.use(userRouter)

export default app;