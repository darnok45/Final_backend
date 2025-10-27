import express from 'express';
import { envs } from './configuration/envs.js';
import passport from './configuration/passport.js';

//Importaciones de rutas
import userRouter from './module/user/user.route.js'
import alumnoRoutes from './module/alumno/alumno.route.js';
import profesorRoutes from './module/profesor/profesor.route.js';
import materiaRoutes from './module/materia/materia.route.js';
import tareaRoutes from './module/tarea/tarea.route.js';
import entregaRoutes from './module/entrega/entrega.route.js';

// Inicialización de la aplicación de express
const app = express();

// Middleware para que express interprete JSON en el body de las solicitudes
app.use(express.json());

// Inicializa passport para el majeo de la autentificación
app.use(passport.initialize())

// Routes de las entidades
app.use(alumnoRoutes);
app.use(profesorRoutes);
app.use(materiaRoutes);
app.use(tareaRoutes);
app.use(entregaRoutes);
app.use(userRouter);

// Definición del puerto del servidor a traves de las variables de entorno
app.set('port', envs.PORT);

// Exportar la instancia configurada de express
export default app;