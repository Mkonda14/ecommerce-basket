-- DropForeignKey
ALTER TABLE `sneaker` DROP FOREIGN KEY `Sneaker_categoryId_fkey`;

-- AddForeignKey
ALTER TABLE `Sneaker` ADD CONSTRAINT `Sneaker_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategorySneaker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
