-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `Article_userID_fkey`;

-- DropForeignKey
ALTER TABLE `categoriearticle` DROP FOREIGN KEY `CategorieArticle_categorieID_fkey`;

-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `Commentaire_articleID_fkey`;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_articleID_fkey` FOREIGN KEY (`articleID`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategorieArticle` ADD CONSTRAINT `CategorieArticle_categorieID_fkey` FOREIGN KEY (`categorieID`) REFERENCES `Categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
