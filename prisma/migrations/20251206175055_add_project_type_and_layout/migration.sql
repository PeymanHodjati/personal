-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "layout" TEXT NOT NULL DEFAULT 'standard',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'personal';
