/*
  Warnings:

  - The values [INSTITUCIONAL] on the enum `TipoCuentaGithub` will be removed. If these variants are still used in the database, this will fail.
  - The values [GROUP,COLLABORATIVE] on the enum `TipoGrupo` will be removed. If these variants are still used in the database, this will fail.
  - The values [AVANCE_SEMESTRE,TOP_PROYECTOS,PLAGIO_RESUMEN,DOCENTES_DESEMPENO] on the enum `TipoReporte` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoCuentaGithub_new" AS ENUM ('INSTITUCIONAL', 'PERSONAL');
ALTER TABLE "GithubAuth" ALTER COLUMN "tipoCuenta" TYPE "TipoCuentaGithub_new" USING ("tipoCuenta"::text::"TipoCuentaGithub_new");
ALTER TYPE "TipoCuentaGithub" RENAME TO "TipoCuentaGithub_old";
ALTER TYPE "TipoCuentaGithub_new" RENAME TO "TipoCuentaGithub";
DROP TYPE "public"."TipoCuentaGithub_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TipoGrupo_new" AS ENUM ('INDIVIDUAL', 'GRUPAL', 'COLABORATIVO');
ALTER TABLE "public"."Equipo" ALTER COLUMN "tipoGrupo" DROP DEFAULT;
ALTER TABLE "public"."Proyecto" ALTER COLUMN "tipoGrupo" DROP DEFAULT;
ALTER TABLE "Proyecto" ALTER COLUMN "tipoGrupo" TYPE "TipoGrupo_new" USING ("tipoGrupo"::text::"TipoGrupo_new");
ALTER TABLE "Equipo" ALTER COLUMN "tipoGrupo" TYPE "TipoGrupo_new" USING ("tipoGrupo"::text::"TipoGrupo_new");
ALTER TYPE "TipoGrupo" RENAME TO "TipoGrupo_old";
ALTER TYPE "TipoGrupo_new" RENAME TO "TipoGrupo";
DROP TYPE "public"."TipoGrupo_old";
ALTER TABLE "Equipo" ALTER COLUMN "tipoGrupo" SET DEFAULT 'GRUPAL';
ALTER TABLE "Proyecto" ALTER COLUMN "tipoGrupo" SET DEFAULT 'GRUPAL';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TipoReporte_new" AS ENUM ('DASHBOARD', 'AVANCESEMESTRE', 'TOPPROYECTOS', 'PLAGIORESUMEN', 'DOCENTESDESEMPENO');
ALTER TABLE "ReporteGenerado" ALTER COLUMN "tipo" TYPE "TipoReporte_new" USING ("tipo"::text::"TipoReporte_new");
ALTER TYPE "TipoReporte" RENAME TO "TipoReporte_old";
ALTER TYPE "TipoReporte_new" RENAME TO "TipoReporte";
DROP TYPE "public"."TipoReporte_old";
COMMIT;

-- AlterTable
ALTER TABLE "Equipo" ALTER COLUMN "tipoGrupo" SET DEFAULT 'GRUPAL';

-- AlterTable
ALTER TABLE "Proyecto" ALTER COLUMN "tipoGrupo" SET DEFAULT 'GRUPAL';
