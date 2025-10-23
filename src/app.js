import express from 'express';
import { envs } from './configuration/envs.js';
import passport from './configuration/passport.js';
import userRouter from './module/user/user.route.js'
import alumnoRoutes from './module/alumno/alumno.route.js';
import profesorRoutes from './module/profesor/profesor.route.js';
import materiaRoutes from './module/materia/materia.route.js';
import tareaRoutes from './module/tarea/tarea.route.js';

const app = express();

app.use(express.json());

app.use(passport.initialize())

// Routes
app.use(alumnoRoutes);
app.use(profesorRoutes);
app.use(materiaRoutes);
app.use(tareaRoutes);

app.set('port', envs.PORT);

app.use(userRouter)

export default app;