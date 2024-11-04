/*
  Warnings:

  - You are about to drop the `_sneakertotag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Theme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_sneakertotag` DROP FOREIGN KEY `_SneakerToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_sneakertotag` DROP FOREIGN KEY `_SneakerToTag_B_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_sneakerId_fkey`;

-- DropForeignKey
ALTER TABLE `sneaker` DROP FOREIGN KEY `Sneaker_categoryId_fkey`;

-- AlterTable
ALTER TABLE `theme` ADD COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_sneakertotag`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `image`;

-- DropTable
DROP TABLE `tag`;

-- CreateTable
CREATE TABLE `ImageSneaker` (
    `id` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,
    `secureUrl` VARCHAR(191) NOT NULL,
    `sneakerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategorySneaker` (
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
CREATE TABLE `TagSneaker` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `popularity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikeSneaker` (
    `id` VARCHAR(191) NOT NULL,
    `sneakerId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageTheme` (
    `id` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,
    `secureUrl` VARCHAR(191) NOT NULL,
    `themeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ImageTheme_themeId_key`(`themeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryTheme` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `popularity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikeTheme` (
    `id` VARCHAR(191) NOT NULL,
    `themeId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SneakerToTagSneaker` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SneakerToTagSneaker_AB_unique`(`A`, `B`),
    INDEX `_SneakerToTagSneaker_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sneaker` ADD CONSTRAINT `Sneaker_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategorySneaker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageSneaker` ADD CONSTRAINT `ImageSneaker_sneakerId_fkey` FOREIGN KEY (`sneakerId`) REFERENCES `Sneaker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeSneaker` ADD CONSTRAINT `LikeSneaker_sneakerId_fkey` FOREIGN KEY (`sneakerId`) REFERENCES `Sneaker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeSneaker` ADD CONSTRAINT `LikeSneaker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Theme` ADD CONSTRAINT `Theme_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategoryTheme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageTheme` ADD CONSTRAINT `ImageTheme_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeTheme` ADD CONSTRAINT `LikeTheme_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeTheme` ADD CONSTRAINT `LikeTheme_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SneakerToTagSneaker` ADD CONSTRAINT `_SneakerToTagSneaker_A_fkey` FOREIGN KEY (`A`) REFERENCES `Sneaker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SneakerToTagSneaker` ADD CONSTRAINT `_SneakerToTagSneaker_B_fkey` FOREIGN KEY (`B`) REFERENCES `TagSneaker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
