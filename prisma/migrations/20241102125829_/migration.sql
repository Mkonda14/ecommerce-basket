/*
  Warnings:

  - You are about to drop the column `subName` on the `categorytheme` table. All the data in the column will be lost.
  - Added the required column `globalName` to the `CategoryTheme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categorytheme` DROP COLUMN `subName`,
    ADD COLUMN `globalName` VARCHAR(191) NOT NULL;
