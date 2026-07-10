import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from './src/infrastructure/github/githubAuth.js';
import { erroresMiddleware } from "./src/api/middleware/erroresMiddleware.js";

import institucionRutas from './src/api/routes/institucion.routes.js';
import periodoAcademicoRutas from './src/api/routes/periodoAcademico.routes.js';
import facultadRutas from './src/api/routes/facultad.routes.js';
import carreraRutas from './src/api/routes/carrera.routes.js';
import semestreRutas from './src/api/routes/semestre.routes.js';
import materiaRutas from './src/api/routes/materia.routes.js';
import horarioRutas from './src/api/routes/horario.routes.js';
import rolRutas from './src/api/routes/rol.routes.js';
import usuarioRutas from './src/api/routes/usuarios.routes.js';

import claseMateriaRutas from './src/api/routes/claseMateria.routes.js';
import inscripcionRutas from './src/api/routes/inscripcion.routes.js';
import inscripcionMateriaRutas from './src/api/routes/inscripcionMateria.routes.js';
import docenteMateriaRutas from './src/api/routes/docenteMateria.routes.js';  
import estudianteMateriaRutas from './src/api/routes/estudianteMateria.routes.js';
import proyectoRutas from './src/api/routes/proyecto.routes.js';

import estudianteRutas from './src/api/routes/estudiante.route.js';
import docenteRutas from './src/api/routes/docente.routes.js';
import directorRutas from './src/api/routes/director.routes.js';
import dashhoardRutas from './src/api/routes/dashboard.routes.js';  
import documentosRutas from './src/api/routes/documentos.routes.js';
import pizarraRutas from './src/api/routes/pizarra.routes.js';

import proyectosGitHub from './src/infrastructure/github/githubProyectos.js';
import githubRoutes from './src/infrastructure/github/githubRutas.js';
import plagio from './src/infrastructure/similitud/plagioRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,          
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors());

process.on('unhandledRejection', (err) => {
  console.error('[UNHANDLED REJECTION]', err);
});
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'dev-secret'],
    sameSite: 'lax',
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", usuarioRutas);
app.use("/api", facultadRutas);
app.use("/api", carreraRutas);
app.use("/api", semestreRutas);
app.use("/api", materiaRutas);
app.use("/api", horarioRutas);
app.use("/api", rolRutas);
app.use("/api", estudianteRutas);
app.use("/api", docenteRutas);
app.use("/api", directorRutas);
app.use("/api", dashhoardRutas);
app.use("/api", documentosRutas);
app.use("/api", pizarraRutas);
app.use("/api", institucionRutas);
app.use("/api", periodoAcademicoRutas);
app.use("/api", claseMateriaRutas);
app.use("/api", inscripcionRutas);
app.use("/api", inscripcionMateriaRutas);
app.use("/api", docenteMateriaRutas);
app.use("/api", estudianteMateriaRutas);
app.use("/api", proyectoRutas);

app.use('/github', githubRoutes);
app.use('/projects', proyectosGitHub);
app.use('/api/plagio', plagio);

app.get('/', (_req, res) => res.send('GestTeam Server OK'));
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use(erroresMiddleware);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
