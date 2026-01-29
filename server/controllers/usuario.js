import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get('/usuario', async (_req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({});
    res.json({ data: usuarios, mensaje: 'usuarios obtenidos correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al traer los usuarios', error: error.message });
  }
});

app.get('/usuario/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ mensaje: 'id inválido' });
    }
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'usuario no encontrado' });
    }
    res.json({ data: usuario, mensaje: 'usuario obtenido correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al traer el usuario', error: error.message });
  }
});

app.post('/usuario', async (req, res) => {
  try {
    const {
      nombre, apellido, telefono, ci, correo,
      password, confirmaPassword, idRol, activo,
    } = req.body;

    if (!nombre || !apellido || !telefono || !ci || !correo || !password || !confirmaPassword ||
      idRol === undefined || activo === undefined) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(correo)) {
      return res.status(400).json({ mensaje: 'El correo debe tener un formato válido.' });
    }
    if (password !== confirmaPassword) {
      return res.status(400).json({ mensaje: 'Las contraseñas no coinciden.' });
    }
    if (typeof ci !== 'number' || ci <= 0) {
      return res.status(400).json({ mensaje: 'El CI debe ser un número válido y positivo.' });
    }

    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ mensaje: 'El correo ingresado ya está registrado.' });

    const passwordHash = await bcrypt.hash(String(password), 10);

    const nuevo = await prisma.usuario.create({
      data: { nombre, apellido, telefono, ci, correo, password: passwordHash, idRol, activo },
    });

    res.status(201).json({ mensaje: 'Usuario agregado correctamente.', data: nuevo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar usuario.', error: error.message });
  }
});

app.put('/usuario/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ mensaje: 'id inválido' });
    }

    const actual = await prisma.usuario.findUnique({ where: { id } });
    if (!actual) {
      return res.status(404).json({ mensaje: 'usuario no encontrado' });
    }

    const data = { ...req.body };

    if (data.correo) {
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correoValido.test(String(data.correo))) {
        return res.status(400).json({ mensaje: 'El correo debe tener un formato válido.' });
      }
      const dupe = await prisma.usuario.findUnique({ where: { correo: String(data.correo) } });
      if (dupe && dupe.id !== id) {
        return res.status(400).json({ mensaje: 'El correo ingresado ya está registrado.' });
      }
    }

    if (data.ci !== undefined) {
      if (typeof data.ci !== 'number' || data.ci <= 0) {
        return res.status(400).json({ mensaje: 'El CI debe ser un número válido y positivo.' });
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(String(data.password), 10);
    }

    const usuario = await prisma.usuario.update({ where: { id }, data });
    res.json({ data: usuario, mensaje: 'usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
});

app.delete('/usuario/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ mensaje: 'id inválido' });
    }

    const actual = await prisma.usuario.findUnique({ where: { id } });
    if (!actual) {
      return res.status(404).json({ mensaje: 'usuario no encontrado' });
    }

    const usuario = await prisma.usuario.delete({ where: { id } });
    res.json({ data: usuario, mensaje: 'usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
});

/* =========================
   LOGIN INSTITUCIONAL REAL
   - Crea sesión Passport (req.login)
   - Devuelve JWT para fallback sin cookies
   ========================= */
// LOGIN INSTITUCIONAL REAL (sin depender de cookies; devuelve JWT)
app.post('/auth/login', async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ mensaje: 'El correo y el password son requeridos.' });
    }

    const domain = process.env.ALLOWED_INSTITUTION_DOMAIN || 'unifranz.edu.bo';
    const correoValidado = new RegExp(`^[a-zA-Z0-9._%+-]+@${domain}$`);
    if (!correoValidado.test(correo)) {
      return res.status(400).json({ mensaje: `El correo debe ser institucional (@${domain})` });
    }

    const user = await prisma.usuario.findUnique({
      where: { correo },
      include: {
        rol: true,
        githubAuth: { select: { accessToken: true } },
        facultad: { select: { nombre: true, theme: true } },
      },
    });

    if (!user) return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });

    const stored = String(user.password || '');
    let ok = false;
    if (/^\$2[aby]\$/.test(stored)) {
      ok = await bcrypt.compare(String(password), stored);
    } else {
      ok = stored === String(password);
      if (ok) {
        const newHash = await bcrypt.hash(String(password), 10);
        await prisma.usuario.update({ where: { id: user.id }, data: { password: newHash } });
      }
    }

    if (!ok) return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });

    const token = jwt.sign(
      { uid: user.id },
      process.env.SESSION_SECRET || 'dev_secret',
      { expiresIn: '1d' }
    );

    const { password: _pw, ...userWithoutPassword } = user;
    return res.status(200).json({
      mensaje: 'Inicio de sesión correcto',
      data: { ...userWithoutPassword, rol: user.rol?.nombre },
      token,
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return res.status(500).json({
      mensaje: 'Error al iniciar sesión',
      detalle: error?.message || String(error),
    });
  }
});

export default app;