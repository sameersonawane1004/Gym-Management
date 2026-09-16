-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_membershipId_fkey`;

-- DropIndex
DROP INDEX `Payment_membershipId_fkey` ON `payment`;

-- AlterTable
ALTER TABLE `payment` MODIFY `membershipId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_membershipId_fkey` FOREIGN KEY (`membershipId`) REFERENCES `Membership`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
