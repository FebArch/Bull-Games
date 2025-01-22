-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "genres" TEXT[],
ALTER COLUMN "gameDesc" SET DEFAULT 'No Description.....',
ALTER COLUMN "storyline" SET DEFAULT 'No Storyline.....';
