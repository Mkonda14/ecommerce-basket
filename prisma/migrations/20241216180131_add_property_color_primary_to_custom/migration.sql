/*
  Warnings:

  - A unique constraint covering the columns `[colorPrimaryId]` on the table `Custom` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `custom` ADD COLUMN `colorPrimaryId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Custom_colorPrimaryId_key` ON `Custom`(`colorPrimaryId`);

-- AddForeignKey
ALTER TABLE `Custom` ADD CONSTRAINT `Custom_colorPrimaryId_fkey` FOREIGN KEY (`colorPrimaryId`) REFERENCES `ColorPrimary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
