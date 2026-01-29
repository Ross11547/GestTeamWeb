-- CreateEnum
CREATE TYPE "TipoCuentaGithub" AS ENUM ('INSTITUTIONAL', 'PERSONAL');

-- CreateEnum
CREATE TYPE "TipoGrupo" AS ENUM ('INDIVIDUAL', 'GROUP');

-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "ci" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "idRol" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL,
    "codigo" TEXT,
    "idFacultad" INTEGER,
    "idCarrera" INTEGER,
    "semestreId" INTEGER,
    "esDirector" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facultad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "theme" JSONB,

    CONSTRAINT "Facultad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "idFacultad" INTEGER NOT NULL,
    "sigla" TEXT,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semestre" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "etiqueta" TEXT NOT NULL DEFAULT '',
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Semestre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "idCarrera" INTEGER NOT NULL,
    "semestreId" INTEGER,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" SERIAL NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "dia" "DiaSemana" NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFin" TIMESTAMP(3) NOT NULL,
    "aula" TEXT NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocenteMateria" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "DocenteMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstudianteMateria" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "EstudianteMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "tamano" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contenidoTexto" TEXT,
    "esRepositorioUnifranz" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalisisPlagio" (
    "id" SERIAL NOT NULL,
    "documentoId" INTEGER NOT NULL,
    "originalidad" DOUBLE PRECISION NOT NULL,
    "plagioWeb" DOUBLE PRECISION NOT NULL,
    "plagioUniversidad" DOUBLE PRECISION NOT NULL,
    "contenidoIA" DOUBLE PRECISION NOT NULL,
    "nivelRiesgo" TEXT NOT NULL,
    "resumenJson" JSONB,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalisisPlagio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuentePlagio" (
    "id" SERIAL NOT NULL,
    "analisisId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT,
    "url" TEXT,
    "coincidencia" INTEGER NOT NULL,

    CONSTRAINT "FuentePlagio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FragmentoPlagio" (
    "id" SERIAL NOT NULL,
    "analisisId" INTEGER NOT NULL,
    "inicio" INTEGER NOT NULL,
    "fin" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fuenteLabel" TEXT,

    CONSTRAINT "FragmentoPlagio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubAuth" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipoCuenta" "TipoCuentaGithub" NOT NULL,
    "githubId" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "correo" TEXT,
    "accessToken" TEXT NOT NULL,
    "tokenType" TEXT,
    "scopes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstGithubApp" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "installationId" INTEGER NOT NULL,
    "accountLogin" TEXT,
    "accountId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstGithubApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubLinkPair" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "instGithubId" INTEGER,
    "instLogin" TEXT,
    "instEmail" TEXT,
    "perGithubId" INTEGER,
    "perLogin" TEXT,
    "perEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubLinkPair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proyecto" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "codigoMateria" TEXT,
    "tipoGrupo" "TipoGrupo" NOT NULL DEFAULT 'GROUP',
    "repoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HitoProyecto" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "orden" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "peso" INTEGER,
    "fechaInicio" TIMESTAMP(3),
    "fechaFin" TIMESTAMP(3),
    "estado" TEXT,

    CONSTRAINT "HitoProyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiembroProyecto" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "rol" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MiembroProyecto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_codigo_key" ON "Usuario"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_sigla_key" ON "Carrera"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Semestre_carreraId_numero_key" ON "Semestre"("carreraId", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_codigo_key" ON "Materia"("codigo");

-- CreateIndex
CREATE INDEX "Horario_materiaId_dia_idx" ON "Horario"("materiaId", "dia");

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_usuarioId_materiaId_key" ON "Inscripcion"("usuarioId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "DocenteMateria_usuarioId_materiaId_key" ON "DocenteMateria"("usuarioId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "EstudianteMateria_usuarioId_materiaId_key" ON "EstudianteMateria"("usuarioId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "GithubAuth_usuarioId_tipoCuenta_key" ON "GithubAuth"("usuarioId", "tipoCuenta");

-- CreateIndex
CREATE UNIQUE INDEX "GithubAuth_githubId_tipoCuenta_key" ON "GithubAuth"("githubId", "tipoCuenta");

-- CreateIndex
CREATE UNIQUE INDEX "InstGithubApp_installationId_key" ON "InstGithubApp"("installationId");

-- CreateIndex
CREATE UNIQUE INDEX "GithubLinkPair_usuarioId_key" ON "GithubLinkPair"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "HitoProyecto_proyectoId_orden_key" ON "HitoProyecto"("proyectoId", "orden");

-- CreateIndex
CREATE UNIQUE INDEX "MiembroProyecto_proyectoId_usuarioId_key" ON "MiembroProyecto"("proyectoId", "usuarioId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idFacultad_fkey" FOREIGN KEY ("idFacultad") REFERENCES "Facultad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idCarrera_fkey" FOREIGN KEY ("idCarrera") REFERENCES "Carrera"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "Semestre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrera" ADD CONSTRAINT "Carrera_idFacultad_fkey" FOREIGN KEY ("idFacultad") REFERENCES "Facultad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semestre" ADD CONSTRAINT "Semestre_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_idCarrera_fkey" FOREIGN KEY ("idCarrera") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "Semestre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocenteMateria" ADD CONSTRAINT "DocenteMateria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocenteMateria" ADD CONSTRAINT "DocenteMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteMateria" ADD CONSTRAINT "EstudianteMateria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteMateria" ADD CONSTRAINT "EstudianteMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalisisPlagio" ADD CONSTRAINT "AnalisisPlagio_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "Documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuentePlagio" ADD CONSTRAINT "FuentePlagio_analisisId_fkey" FOREIGN KEY ("analisisId") REFERENCES "AnalisisPlagio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FragmentoPlagio" ADD CONSTRAINT "FragmentoPlagio_analisisId_fkey" FOREIGN KEY ("analisisId") REFERENCES "AnalisisPlagio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubAuth" ADD CONSTRAINT "GithubAuth_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstGithubApp" ADD CONSTRAINT "InstGithubApp_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubLinkPair" ADD CONSTRAINT "GithubLinkPair_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HitoProyecto" ADD CONSTRAINT "HitoProyecto_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiembroProyecto" ADD CONSTRAINT "MiembroProyecto_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiembroProyecto" ADD CONSTRAINT "MiembroProyecto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
