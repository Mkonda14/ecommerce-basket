/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `passwordresettokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `passwordresettokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `verificationtokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `verificationtokens` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `passwordresettokens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `verificationtokens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `passwordresettokens` ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `verificationtokens` ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Sneaker` (
    `id` VARCHAR(191) NOT NULL,
    `marque` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `promoPrice` DOUBLE NOT NULL,
    `isPromo` BOOLEAN NOT NULL,
    `stock` INTEGER NOT NULL,
    `colorPrimary` VARCHAR(191) NOT NULL,
    `colorPrimaryName` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Size` (
    `id` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `sneakerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ColorSecondary` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `sneakerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,
    `secureUrl` VARCHAR(191) NOT NULL,
    `sneakerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `designer` VARCHAR(191) NOT NULL,
    `popularity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `popularity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theme` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `popularity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SneakerToTheme` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SneakerToTheme_AB_unique`(`A`, `B`),
    INDEX `_SneakerToTheme_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SneakerToTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SneakerToTag_AB_unique`(`A`, `B`),
    INDEX `_SneakerToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `passwordresettokens_email_key` ON `passwordresettokens`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `passwordresettokens_token_key` ON `passwordresettokens`(`token`);

-- CreateIndex
CREATE UNIQUE INDEX `verificationtokens_email_key` ON `verificationtokens`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `verificationtokens_token_key` ON `verificationtokens`(`token`);

-- AddForeignKey
ALTER TABLE `Sneaker` ADD CONSTRAINT `Sneaker_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Size` ADD CONSTRAINT `Size_sneakerId_fkey` FOREIGN KEY (`sneakerId`) REFERENCES `Sneaker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorSecondary` ADD CONSTRAINT `ColorSecondary_sneakerId_fkey` FOREIGN KEY (`sneakerId`) REFERENCES `Sneaker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_sneakerId_fkey` FOREIGN KEY (`sneakerId`) REFERENCES `Sneaker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SneakerToTheme` ADD CONSTRAINT `_SneakerToTheme_A_fkey` FOREIGN KEY (`A`) REFERENCES `Sneaker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SneakerToTheme` ADD CONSTRAINT `_SneakerToTheme_B_fkey` FOREIGN KEY (`B`) REFERENCES `Theme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SneakerToTag` ADD CONSTRAINT `_SneakerToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Sneaker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SneakerToTag` ADD CONSTRAINT `_SneakerToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
