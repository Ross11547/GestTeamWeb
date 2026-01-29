import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from './auth.js';

import usuario from './controllers/usuario.js';
import carrera from './controllers/carrera.js';
import facultad from './controllers/facultad.js';
import materia from './controllers/materias.js';
import rol from './controllers/rol.js';
import semestre from './controllers/semestre.js';
import horario from './controllers/horario.js';
import dashboard from './controllers/dashboard.js';
import docente from './controllers/docente.js';
import estudiante from './controllers/estudiante.js';
import director from './controllers/director.js';

import projects from './routes/projects.js';
import githubRoutes from './routes/github.js';
import plagio from './routes/plagioRoutes.js';

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

app.use(usuario);
app.use(carrera);
app.use(facultad);
app.use(materia);
app.use(rol);
app.use(semestre);
app.use(horario);
app.use(dashboard);
app.use(docente);
app.use(estudiante);
app.use(director);
app.use('/github', githubRoutes);
app.use('/projects', projects);
app.use('/api/plagio', plagio);

app.get('/', (_req, res) => res.send('GestTeam Server OK'));

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
