import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import alumnoRoutes from "./module/alumno/alumno.route.js";
import profesorRoutes from "./module/profesor/profesor.route.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/alumno", alumnoRoutes);
app.use("/profesor", profesorRoutes);

export default app;
