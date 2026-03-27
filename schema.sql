-- 1. Création de la base de données (si elle n'existe pas)
CREATE DATABASE IF NOT EXISTS `tp5_nuxt_db`;

-- 2. Sélection de la base pour les commandes suivantes
USE `tp5_nuxt_db`;

-- 3. Création de la table 'users'
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `login` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL
);
