/*
  Warnings:

  - You are about to drop the column `globalName` on the `categorytheme` table. All the data in the column will be lost.
  - You are about to drop the column `sneakerId` on the `colorsecondary` table. All the data in the column will be lost.
  - You are about to drop the column `sneakerId` on the `size` table. All the data in the column will be lost.
  - You are about to drop the column `colorPrimary` on the `sneaker` table. All the data in the column will be lost.
  - You are about to drop the column `colorPrimaryName` on the `sneaker` table. All the data in the column will be lost.
  - You are about to drop the `_sneakertotheme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `imagesneaker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likesneaker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `secondName` to the `CategoryTheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customId` to the `ColorSecondary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorPrimaryId` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_sneakertotheme` DROP FOREIGN KEY `_SneakerToTheme_A_fkey`;

-- DropForeignKey
ALTER TABLE `_sneakertotheme` DROP FOREIGN KEY `_SneakerToTheme_B_fkey`;

-- DropForeignKey
ALTER TABLE `colorsecondary` DROP FOREIGN KEY `ColorSecondary_sneakerId_fkey`;

-- DropForeignKey
ALTER TABLE `imagesneaker` DROP FOREIGN KEY `ImageSneaker_sneakerId_fkey`;

-- DropForeignKey
ALTER TABLE `imagetheme` DROP FOREIGN KEY `ImageTheme_themeId_fkey`;

-- DropForeignKey
ALTER TABLE `likesneaker` DROP FOREIGN KEY `LikeSneaker_sneakerId_fkey`;

-- DropForeignKey
ALTER TABLE `likesneaker` DROP FOREIGN KEY `LikeSneaker_userId_fkey`;

-- DropForeignKey
ALTER TABLE `liketheme` DROP FOREIGN KEY `LikeTheme_themeId_fkey`;

-- DropForeignKey
ALTER TABLE `liketheme` DROP FOREIGN KEY `LikeTheme_userId_fkey`;

-- DropForeignKey
ALTER TABLE `size` DROP FOREIGN KEY `Size_sneakerId_fkey`;

-- DropForeignKey
ALTER TABLE `sneaker` DROP FOREIGN KEY `Sneaker_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `theme` DROP FOREIGN KEY `Theme_categoryId_fkey`;

-- AlterTable
ALTER TABLE `categorysneaker` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `categorytheme` DROP COLUMN `globalName`,
    ADD COLUMN `secondName` VARCHAR(191) NOT NULL,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `colorsecondary` DROP COLUMN `sneakerId`,
    ADD COLUMN `customId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `liketheme` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `size` DROP COLUMN `sneakerId`,
    ADD COLUMN `colorPrimaryId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `sneaker` DROP COLUMN `colorPrimary`,
    DROP COLUMN `colorPrimaryName`,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tagsneaker` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `theme` MODIFY `description` TEXT NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_sneakertotheme`;

-- DropTable
DROP TABLE `imagesneaker`;

-- DropTable
DROP TABLE `likesneaker`;

-- CreateTable
CREATE TABLE `ColorPrimary` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `sneakerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ColorPrimary_sneakerId_key`(`sneakerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Custom` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `isCustom` BOOLEAN NOT NULL DEFAULT false,
    `sneakerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Custom_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageCustom` (
    `id` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,
    `secureUrl` VARCHAR(191) NOT NULL,
    `customId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikeCustom` (
    `id` VARCHAR(191) NOT NULL,
    `customId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Graffiti` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DOUBLE NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `textMinLength` INTEGER NULL,
    `textMaxLength` INTEGER NULL,
    `textMaxWords` INTEGER NULL,
    `popularity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageGraffiti` (
    `id` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,
    `secureUrl` VARCHAR(191) NOT NULL,
    `graffitiId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ImageGraffiti_graffitiId_key`(`graffitiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryGraffiti` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `secondName` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `popularity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DefaultColorGraffiti` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `graffitiId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikeGraffiti` (
    `id` VARCHAR(191) NOT NULL,
    `graffitiId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customization` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `instruction` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `sneakerId` VARCHAR(191) NULL,
    `graffitiId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ColorCustomization` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `customizationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewLetter` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `NewLetter_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CustomToTheme` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CustomToTheme_AB_unique`(`A`, `B`),
    INDEX `_CustomToTheme_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sneaker` ADD CONSTRAINT `Sneaker_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategorySneaker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Size` ADD CONSTRAINT `Size_colorPrimaryId_fkey` FOREIGN KEY (`colorPrimaryId`) REFERENCES `ColorPrimary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorPrimary` ADD CONSTRAINT `ColorPrimary_sneakerId_fkey` FOREIGN KEY (`sneakerId`) REFERENCES `Sneaker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Custom` ADD CONSTRAINT `Custom_sneakerId_fkey` FOREIGN KEY (`sneakerId`) REFERENCES `Sneaker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorSecondary` ADD CONSTRAINT `ColorSecondary_customId_fkey` FOREIGN KEY (`customId`) REFERENCES `Custom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageCustom` ADD CONSTRAINT `ImageCustom_customId_fkey` FOREIGN KEY (`customId`) REFERENCES `Custom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeCustom` ADD CONSTRAINT `LikeCustom_customId_fkey` FOREIGN KEY (`customId`) REFERENCES `Custom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeCustom` ADD CONSTRAINT `LikeCustom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Theme` ADD CONSTRAINT `Theme_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategoryTheme`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageTheme` ADD CONSTRAINT `ImageTheme_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeTheme` ADD CONSTRAINT `LikeTheme_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeTheme` ADD CONSTRAINT `LikeTheme_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Graffiti` ADD CONSTRAINT `Graffiti_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategoryGraffiti`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageGraffiti` ADD CONSTRAINT `ImageGraffiti_graffitiId_fkey` FOREIGN KEY (`graffitiId`) REFERENCES `Graffiti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DefaultColorGraffiti` ADD CONSTRAINT `DefaultColorGraffiti_graffitiId_fkey` FOREIGN KEY (`graffitiId`) REFERENCES `Graffiti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeGraffiti` ADD CONSTRAINT `LikeGraffiti_graffitiId_fkey` FOREIGN KEY (`graffitiId`) REFERENCES `Graffiti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeGraffiti` ADD CONSTRAINT `LikeGraffiti_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customization` ADD CONSTRAINT `Customization_sneakerId_fkey` FOREIGN KEY (`sneakerId`) REFERENCES `Sneaker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customization` ADD CONSTRAINT `Customization_graffitiId_fkey` FOREIGN KEY (`graffitiId`) REFERENCES `Graffiti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customization` ADD CONSTRAINT `Customization_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorCustomization` ADD CONSTRAINT `ColorCustomization_customizationId_fkey` FOREIGN KEY (`customizationId`) REFERENCES `Customization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CustomToTheme` ADD CONSTRAINT `_CustomToTheme_A_fkey` FOREIGN KEY (`A`) REFERENCES `Custom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CustomToTheme` ADD CONSTRAINT `_CustomToTheme_B_fkey` FOREIGN KEY (`B`) REFERENCES `Theme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
