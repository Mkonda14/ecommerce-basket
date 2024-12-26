/*
  Warnings:

  - You are about to drop the column `sneakerId` on the `custom` table. All the data in the column will be lost.
  - Made the column `colorPrimaryId` on table `custom` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `custom` DROP FOREIGN KEY `Custom_colorPrimaryId_fkey`;

-- DropForeignKey
ALTER TABLE `custom` DROP FOREIGN KEY `Custom_sneakerId_fkey`;

-- AlterTable
ALTER TABLE `custom` DROP COLUMN `sneakerId`,
    MODIFY `colorPrimaryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Custom` ADD CONSTRAINT `Custom_colorPrimaryId_fkey` FOREIGN KEY (`colorPrimaryId`) REFERENCES `ColorPrimary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
