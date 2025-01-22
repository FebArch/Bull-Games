-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'user';
