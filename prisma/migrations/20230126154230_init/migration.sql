/*
  Warnings:

  - You are about to drop the column `user_id` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blogger_id` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogger_id` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_user_id_fkey";

-- AlterTable
ALTER TABLE "blog" DROP COLUMN "user_id",
ADD COLUMN     "blogger_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "user_id",
ADD COLUMN     "blogger_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "blogger" (
    "blogger_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "blogger_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pw_hash" TEXT NOT NULL,
    "image" BYTEA,

    CONSTRAINT "blogger_pkey" PRIMARY KEY ("blogger_id")
);

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_blogger_id_fkey" FOREIGN KEY ("blogger_id") REFERENCES "blogger"("blogger_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_blogger_id_fkey" FOREIGN KEY ("blogger_id") REFERENCES "blogger"("blogger_id") ON DELETE RESTRICT ON UPDATE CASCADE;
