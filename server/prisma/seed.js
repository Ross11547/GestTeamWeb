// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function upsertRol(nombre) {
  return prisma.rol.upsert({
    where: { nombre },
    update: {},
    create: { nombre },
  });
}

async function upsertFacultad({ institucionId, nombre, theme }) {
  return prisma.facultad.upsert({
    where: { institucionId_nombre: { institucionId, nombre } },
    update: { theme },
    create: { institucionId, nombre, theme },
  });
}

async function upsertUsuario({ correo, dataCreate, dataUpdate }) {
  return prisma.usuario.upsert({
    where: { correo },
    update: dataUpdate,
    create: dataCreate,
  });
}

async function main() {
  console.log("Seeding database...");

  const [rolAdmin, rolEst, rolDir, rolDoc] = await Promise.all([
    upsertRol("Admin"),
    upsertRol("Estudiante"),
    upsertRol("Director"),
    upsertRol("Docente"),
  ]);
  console.log("Roles OK");

  const inst = await prisma.institucion.upsert({
    where: { slug: "unifranz" },
    update: { activo: true, nombre: "Universidad Franz Tamayo" },
    create: {
      nombre: "Universidad Franz Tamayo",
      slug: "unifranz",
      activo: true,
    },
  });
  console.log("Institucion OK:", inst.slug);

  const periodo = await prisma.periodoAcademico.upsert({
    where: {
      institucionId_nombre: {
        institucionId: inst.id,
        nombre: "2026-1",
      },
    },
    update: {
      activo: true,
      fechaIni: new Date("2026-02-01T00:00:00.000Z"),
      fechaFin: new Date("2026-07-31T23:59:59.999Z"),
    },
    create: {
      institucionId: inst.id,
      nombre: "2026-1",
      fechaIni: new Date("2026-02-01T00:00:00.000Z"),
      fechaFin: new Date("2026-07-31T23:59:59.999Z"),
      activo: true,
    },
  });
  console.log("Periodo OK:", periodo.nombre);

  const fac1 = await upsertFacultad({
    institucionId: inst.id,
    nombre: "Ingeniería de Sistemas",
    theme: {
      primary: "#fcbf49",
      primary100: "#FFDE59",
      primary200: "#FFE680",
      primary300: "#FFD700",
      primary800: "#F8E061ff",
      primary900: "#ffc107",
      primary400: "#E6B800",
      primary500: "#CC9A00",
      primary600: "#B38600",
      primary700: "#996F00",
    },
  });

  const fac2 = await upsertFacultad({
    institucionId: inst.id,
    nombre: "Ciencias de la Salud",
    theme: {
      primary: "#007bff",
      primary100: "#66b2ff",
      primary200: "#99ccff",
      primary300: "#cce5ff",
      primary800: "#0056b3",
      primary900: "#004080",
      primary400: "#3399ff",
      primary500: "#267fdd",
      primary600: "#1a66bb",
      primary700: "#0d4d99",
    },
  });

  console.log("Facultades OK");

  const adminHash = await bcrypt.hash("123456", 10);
  const rossanaHash = await bcrypt.hash("Z20Xd#efb0", 10);
  const miguelHash = await bcrypt.hash("123456", 10);

  await upsertUsuario({
    correo: "admin.sa@unifranz.edu.bo",
    dataUpdate: {
      idRol: rolAdmin.id,
      idFacultad: fac1.id,
      activo: true,
      password: adminHash,
    },
    dataCreate: {
      nombre: "Admin",
      apellido: "Pérez",
      telefono: "123456789",
      ci: 9876543,
      correo: "admin.sa@unifranz.edu.bo",
      password: adminHash,
      idRol: rolAdmin.id,
      activo: true,
      idFacultad: fac1.id,
    },
  });

  await upsertUsuario({
    correo: "cbbe.rossanaangela.trujillo.sa@unifranz.edu.bo",
    dataUpdate: {
      idRol: rolEst.id,
      idFacultad: fac1.id,
      activo: true,
      password: rossanaHash,
    },
    dataCreate: {
      nombre: "Rossana",
      apellido: "Trujillo",
      telefono: "63986377",
      ci: 1111111,
      correo: "cbbe.rossanaangela.trujillo.sa@unifranz.edu.bo",
      password: rossanaHash,
      idRol: rolEst.id,
      activo: true,
      idFacultad: fac1.id,
    },
  });

  await upsertUsuario({
    correo: "estudianteMed.sa@unifranz.edu.bo",
    dataUpdate: {
      idRol: rolEst.id,
      idFacultad: fac2.id,
      activo: true,
      password: miguelHash,
    },
    dataCreate: {
      nombre: "Miguel",
      apellido: "Pérez",
      telefono: "123456789",
      ci: 2222222,
      correo: "estudianteMed.sa@unifranz.edu.bo",
      password: miguelHash,
      idRol: rolEst.id,
      activo: true,
      idFacultad: fac2.id,
    },
  });

  console.log("Usuarios OK");
  console.log("Seeding completado!");
}

main()
  .catch((e) => {
    console.error("Error seeding database", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });