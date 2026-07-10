/*
  Warnings:

  - A unique constraint covering the columns `[institucionId,nombre]` on the table `Facultad` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Facultad_institucionId_nombre_key" ON "Facultad"("institucionId", "nombre");
