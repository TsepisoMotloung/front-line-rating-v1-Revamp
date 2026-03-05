-- Make questionId optional in Response table
ALTER TABLE `Response` MODIFY `questionId` VARCHAR(191);

-- Add allianceQuestionId column to Response table
ALTER TABLE `Response` ADD COLUMN `allianceQuestionId` VARCHAR(191);

-- Add index for allianceQuestionId
ALTER TABLE `Response` ADD KEY `Response_allianceQuestionId_idx`(`allianceQuestionId`);

-- Add foreign key constraint for allianceQuestionId
ALTER TABLE `Response` ADD CONSTRAINT `Response_allianceQuestionId_fkey` FOREIGN KEY (`allianceQuestionId`) REFERENCES `AllianceInsuranceQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
