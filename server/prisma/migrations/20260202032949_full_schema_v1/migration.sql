/*
  Warnings:

  - Added the required column `updatedAt` to the `Carrera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Facultad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HitoProyecto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Materia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Semestre` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoProyecto" AS ENUM ('BORRADOR', 'ACTIVO', 'CERRADO', 'ARCHIVADO');

-- CreateEnum
CREATE TYPE "EstadoEntrega" AS ENUM ('BORRADOR', 'ENTREGADO', 'REVISADO', 'DEVUELTO', 'ATRASADO');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('INFORME', 'PRESENTACION', 'GUIA', 'EVIDENCIA', 'OTRO');

-- CreateEnum
CREATE TYPE "TipoAnalisis" AS ENUM ('DOCUMENTO', 'CODIGO');

-- CreateEnum
CREATE TYPE "RolMiembroEquipo" AS ENUM ('LIDER', 'MIEMBRO', 'COLABORADOR');

-- AlterEnum
ALTER TYPE "TipoGrupo" ADD VALUE 'COLLABORATIVE';

-- DropForeignKey
ALTER TABLE "AnalisisPlagio" DROP CONSTRAINT "AnalisisPlagio_documentoId_fkey";

-- AlterTable
ALTER TABLE "AnalisisPlagio" ADD COLUMN     "entregaId" INTEGER,
ADD COLUMN     "tipo" "TipoAnalisis" NOT NULL DEFAULT 'DOCUMENTO',
ALTER COLUMN "documentoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Carrera"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE "Documento" ADD COLUMN     "entregaId" INTEGER,
ADD COLUMN     "tipo" "TipoDocumento" NOT NULL DEFAULT 'OTRO',
ADD COLUMN     "usuarioId" INTEGER;

-- AlterTable
ALTER TABLE "Facultad"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "institucionId" INTEGER,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE "HitoProyecto"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "descripcion" TEXT DEFAULT '',
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE "Horario"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE "Materia"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE "Proyecto" ADD COLUMN     "descripcion" TEXT DEFAULT '',
ADD COLUMN     "estado" "EstadoProyecto" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Semestre"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "updatedAt" SET DEFAULT NOW();

-- CreateTable
CREATE TABLE "Institucion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institucion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeriodoAcademico" (
    "id" SERIAL NOT NULL,
    "institucionId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaIni" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeriodoAcademico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaseMateria" (
    "id" SERIAL NOT NULL,
    "periodoId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "docenteId" INTEGER,
    "paralelo" TEXT,
    "aula" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClaseMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InscripcionMateria" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "periodoId" INTEGER NOT NULL,
    "claseId" INTEGER,
    "materiaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InscripcionMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProyectoMateria" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "periodoId" INTEGER,
    "claseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProyectoMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipo" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoGrupo" "TipoGrupo" NOT NULL DEFAULT 'GROUP',
    "materiaId" INTEGER,
    "periodoId" INTEGER,
    "creadoPorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipoMiembro" (
    "id" SERIAL NOT NULL,
    "equipoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "rolEquipo" "RolMiembroEquipo" NOT NULL DEFAULT 'MIEMBRO',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipoMiembro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntregaHito" (
    "id" SERIAL NOT NULL,
    "hitoId" INTEGER NOT NULL,
    "equipoId" INTEGER NOT NULL,
    "autorId" INTEGER,
    "estado" "EstadoEntrega" NOT NULL DEFAULT 'ENTREGADO',
    "comentario" TEXT DEFAULT '',
    "evidenciaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntregaHito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevisionEntrega" (
    "id" SERIAL NOT NULL,
    "entregaId" INTEGER NOT NULL,
    "revisorId" INTEGER NOT NULL,
    "nota" DOUBLE PRECISION,
    "feedback" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RevisionEntrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepoGithub" (
    "id" SERIAL NOT NULL,
    "equipoId" INTEGER NOT NULL,
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepoGithub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepoSnapshot" (
    "id" SERIAL NOT NULL,
    "repoId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commits" INTEGER NOT NULL DEFAULT 0,
    "prs" INTEGER NOT NULL DEFAULT 0,
    "issues" INTEGER NOT NULL DEFAULT 0,
    "resumenJson" JSONB,

    CONSTRAINT "RepoSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feria" (
    "id" SERIAL NOT NULL,
    "institucionId" INTEGER,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT DEFAULT '',
    "fecha" TIMESTAMP(3) NOT NULL,
    "lugar" TEXT DEFAULT '',
    "imagenMapaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeriaCategoria" (
    "id" SERIAL NOT NULL,
    "feriaId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeriaCategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeriaEquipo" (
    "id" SERIAL NOT NULL,
    "feriaId" INTEGER NOT NULL,
    "categoriaId" INTEGER,
    "equipoId" INTEGER,
    "nombreEquipo" TEXT NOT NULL,
    "nombreProyecto" TEXT NOT NULL,
    "descripcion" TEXT DEFAULT '',
    "mesaCodigo" TEXT,
    "mesaX" INTEGER,
    "mesaY" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeriaEquipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeriaEquipoMiembro" (
    "id" SERIAL NOT NULL,
    "feriaEquipoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "FeriaEquipoMiembro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeriaEvaluacion" (
    "id" SERIAL NOT NULL,
    "feriaEquipoId" INTEGER NOT NULL,
    "juradoId" INTEGER NOT NULL,
    "puntaje" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeriaEvaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CV" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "resumen" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVHabilidad" (
    "id" SERIAL NOT NULL,
    "cvId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT,
    "nivel" INTEGER,
    "evidencia" TEXT,

    CONSTRAINT "CVHabilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVLogro" (
    "id" SERIAL NOT NULL,
    "cvId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT DEFAULT '',
    "fecha" TIMESTAMP(3),

    CONSTRAINT "CVLogro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVProyecto" (
    "id" SERIAL NOT NULL,
    "cvId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT DEFAULT '',
    "rol" TEXT DEFAULT '',
    "area" TEXT DEFAULT '',
    "tecnologias" TEXT DEFAULT '',
    "linkEvidencia" TEXT,
    "fechaInicio" TIMESTAMP(3),
    "fechaFin" TIMESTAMP(3),

    CONSTRAINT "CVProyecto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Institucion_slug_key" ON "Institucion"("slug");

-- CreateIndex
CREATE INDEX "PeriodoAcademico_institucionId_activo_idx" ON "PeriodoAcademico"("institucionId", "activo");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodoAcademico_institucionId_nombre_key" ON "PeriodoAcademico"("institucionId", "nombre");

-- CreateIndex
CREATE INDEX "ClaseMateria_periodoId_idx" ON "ClaseMateria"("periodoId");

-- CreateIndex
CREATE INDEX "ClaseMateria_materiaId_idx" ON "ClaseMateria"("materiaId");

-- CreateIndex
CREATE INDEX "ClaseMateria_docenteId_idx" ON "ClaseMateria"("docenteId");

-- CreateIndex
CREATE INDEX "InscripcionMateria_periodoId_materiaId_idx" ON "InscripcionMateria"("periodoId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "InscripcionMateria_usuarioId_periodoId_materiaId_key" ON "InscripcionMateria"("usuarioId", "periodoId", "materiaId");

-- CreateIndex
CREATE INDEX "ProyectoMateria_materiaId_periodoId_idx" ON "ProyectoMateria"("materiaId", "periodoId");

-- CreateIndex
CREATE UNIQUE INDEX "ProyectoMateria_proyectoId_materiaId_periodoId_key" ON "ProyectoMateria"("proyectoId", "materiaId", "periodoId");

-- CreateIndex
CREATE INDEX "Equipo_proyectoId_idx" ON "Equipo"("proyectoId");

-- CreateIndex
CREATE INDEX "Equipo_materiaId_periodoId_idx" ON "Equipo"("materiaId", "periodoId");

-- CreateIndex
CREATE INDEX "Equipo_creadoPorId_idx" ON "Equipo"("creadoPorId");

-- CreateIndex
CREATE INDEX "EquipoMiembro_usuarioId_idx" ON "EquipoMiembro"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "EquipoMiembro_equipoId_usuarioId_key" ON "EquipoMiembro"("equipoId", "usuarioId");

-- CreateIndex
CREATE INDEX "EntregaHito_hitoId_idx" ON "EntregaHito"("hitoId");

-- CreateIndex
CREATE INDEX "EntregaHito_equipoId_idx" ON "EntregaHito"("equipoId");

-- CreateIndex
CREATE INDEX "EntregaHito_createdAt_idx" ON "EntregaHito"("createdAt");

-- CreateIndex
CREATE INDEX "RevisionEntrega_entregaId_idx" ON "RevisionEntrega"("entregaId");

-- CreateIndex
CREATE INDEX "RevisionEntrega_revisorId_idx" ON "RevisionEntrega"("revisorId");

-- CreateIndex
CREATE UNIQUE INDEX "RepoGithub_equipoId_key" ON "RepoGithub"("equipoId");

-- CreateIndex
CREATE UNIQUE INDEX "RepoGithub_owner_name_key" ON "RepoGithub"("owner", "name");

-- CreateIndex
CREATE INDEX "RepoSnapshot_repoId_fecha_idx" ON "RepoSnapshot"("repoId", "fecha");

-- CreateIndex
CREATE INDEX "Feria_fecha_idx" ON "Feria"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "FeriaCategoria_feriaId_nombre_key" ON "FeriaCategoria"("feriaId", "nombre");

-- CreateIndex
CREATE INDEX "FeriaEquipo_feriaId_categoriaId_idx" ON "FeriaEquipo"("feriaId", "categoriaId");

-- CreateIndex
CREATE INDEX "FeriaEquipoMiembro_usuarioId_idx" ON "FeriaEquipoMiembro"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "FeriaEquipoMiembro_feriaEquipoId_usuarioId_key" ON "FeriaEquipoMiembro"("feriaEquipoId", "usuarioId");

-- CreateIndex
CREATE INDEX "FeriaEvaluacion_feriaEquipoId_idx" ON "FeriaEvaluacion"("feriaEquipoId");

-- CreateIndex
CREATE INDEX "FeriaEvaluacion_juradoId_idx" ON "FeriaEvaluacion"("juradoId");

-- CreateIndex
CREATE UNIQUE INDEX "CV_usuarioId_key" ON "CV"("usuarioId");

-- CreateIndex
CREATE INDEX "CVHabilidad_cvId_idx" ON "CVHabilidad"("cvId");

-- CreateIndex
CREATE INDEX "CVLogro_cvId_idx" ON "CVLogro"("cvId");

-- CreateIndex
CREATE INDEX "CVProyecto_cvId_idx" ON "CVProyecto"("cvId");

-- CreateIndex
CREATE INDEX "AnalisisPlagio_documentoId_idx" ON "AnalisisPlagio"("documentoId");

-- CreateIndex
CREATE INDEX "AnalisisPlagio_entregaId_idx" ON "AnalisisPlagio"("entregaId");

-- CreateIndex
CREATE INDEX "AnalisisPlagio_creadoEn_idx" ON "AnalisisPlagio"("creadoEn");

-- CreateIndex
CREATE INDEX "Carrera_idFacultad_idx" ON "Carrera"("idFacultad");

-- CreateIndex
CREATE INDEX "Documento_usuarioId_idx" ON "Documento"("usuarioId");

-- CreateIndex
CREATE INDEX "Documento_entregaId_idx" ON "Documento"("entregaId");

-- CreateIndex
CREATE INDEX "Documento_creadoEn_idx" ON "Documento"("creadoEn");

-- CreateIndex
CREATE INDEX "Facultad_institucionId_idx" ON "Facultad"("institucionId");

-- CreateIndex
CREATE INDEX "HitoProyecto_proyectoId_idx" ON "HitoProyecto"("proyectoId");

-- CreateIndex
CREATE INDEX "Materia_idCarrera_idx" ON "Materia"("idCarrera");

-- CreateIndex
CREATE INDEX "Materia_semestreId_idx" ON "Materia"("semestreId");

-- CreateIndex
CREATE INDEX "Semestre_carreraId_numero_idx" ON "Semestre"("carreraId", "numero");

-- CreateIndex
CREATE INDEX "Usuario_idRol_idx" ON "Usuario"("idRol");

-- CreateIndex
CREATE INDEX "Usuario_idFacultad_idx" ON "Usuario"("idFacultad");

-- CreateIndex
CREATE INDEX "Usuario_idCarrera_idx" ON "Usuario"("idCarrera");

-- CreateIndex
CREATE INDEX "Usuario_semestreId_idx" ON "Usuario"("semestreId");

-- CreateIndex
CREATE INDEX "Usuario_createdAt_idx" ON "Usuario"("createdAt");

-- AddForeignKey
ALTER TABLE "PeriodoAcademico" ADD CONSTRAINT "PeriodoAcademico_institucionId_fkey" FOREIGN KEY ("institucionId") REFERENCES "Institucion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facultad" ADD CONSTRAINT "Facultad_institucionId_fkey" FOREIGN KEY ("institucionId") REFERENCES "Institucion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaseMateria" ADD CONSTRAINT "ClaseMateria_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "PeriodoAcademico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaseMateria" ADD CONSTRAINT "ClaseMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaseMateria" ADD CONSTRAINT "ClaseMateria_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscripcionMateria" ADD CONSTRAINT "InscripcionMateria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscripcionMateria" ADD CONSTRAINT "InscripcionMateria_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "PeriodoAcademico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscripcionMateria" ADD CONSTRAINT "InscripcionMateria_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "ClaseMateria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscripcionMateria" ADD CONSTRAINT "InscripcionMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoMateria" ADD CONSTRAINT "ProyectoMateria_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoMateria" ADD CONSTRAINT "ProyectoMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoMateria" ADD CONSTRAINT "ProyectoMateria_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "PeriodoAcademico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoMateria" ADD CONSTRAINT "ProyectoMateria_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "ClaseMateria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "PeriodoAcademico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipoMiembro" ADD CONSTRAINT "EquipoMiembro_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipoMiembro" ADD CONSTRAINT "EquipoMiembro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntregaHito" ADD CONSTRAINT "EntregaHito_hitoId_fkey" FOREIGN KEY ("hitoId") REFERENCES "HitoProyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntregaHito" ADD CONSTRAINT "EntregaHito_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntregaHito" ADD CONSTRAINT "EntregaHito_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionEntrega" ADD CONSTRAINT "RevisionEntrega_entregaId_fkey" FOREIGN KEY ("entregaId") REFERENCES "EntregaHito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionEntrega" ADD CONSTRAINT "RevisionEntrega_revisorId_fkey" FOREIGN KEY ("revisorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_entregaId_fkey" FOREIGN KEY ("entregaId") REFERENCES "EntregaHito"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalisisPlagio" ADD CONSTRAINT "AnalisisPlagio_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "Documento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalisisPlagio" ADD CONSTRAINT "AnalisisPlagio_entregaId_fkey" FOREIGN KEY ("entregaId") REFERENCES "EntregaHito"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepoGithub" ADD CONSTRAINT "RepoGithub_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepoSnapshot" ADD CONSTRAINT "RepoSnapshot_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "RepoGithub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feria" ADD CONSTRAINT "Feria_institucionId_fkey" FOREIGN KEY ("institucionId") REFERENCES "Institucion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeriaCategoria" ADD CONSTRAINT "FeriaCategoria_feriaId_fkey" FOREIGN KEY ("feriaId") REFERENCES "Feria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeriaEquipo" ADD CONSTRAINT "FeriaEquipo_feriaId_fkey" FOREIGN KEY ("feriaId") REFERENCES "Feria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeriaEquipo" ADD CONSTRAINT "FeriaEquipo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "FeriaCategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeriaEquipo" ADD CONSTRAINT "FeriaEquipo_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeriaEquipoMiembro" ADD CONSTRAINT "FeriaEquipoMiembro_feriaEquipoId_fkey" FOREIGN KEY ("feriaEquipoId") REFERENCES "FeriaEquipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeriaEquipoMiembro" ADD CONSTRAINT "FeriaEquipoMiembro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeriaEvaluacion" ADD CONSTRAINT "FeriaEvaluacion_feriaEquipoId_fkey" FOREIGN KEY ("feriaEquipoId") REFERENCES "FeriaEquipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeriaEvaluacion" ADD CONSTRAINT "FeriaEvaluacion_juradoId_fkey" FOREIGN KEY ("juradoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVHabilidad" ADD CONSTRAINT "CVHabilidad_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVLogro" ADD CONSTRAINT "CVLogro_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVProyecto" ADD CONSTRAINT "CVProyecto_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
