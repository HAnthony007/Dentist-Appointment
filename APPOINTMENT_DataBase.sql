-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 26 mai 2024 à 22:11
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `APPOINTMENT`
--

-- --------------------------------------------------------

--
-- Structure de la table `CHAT`
--

CREATE TABLE `CHAT` (
  `chat_id` varchar(75) NOT NULL,
  `members` longtext NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `DOCTORS`
--

CREATE TABLE `DOCTORS` (
  `doctor_id` varchar(75) NOT NULL,
  `user_id` varchar(75) NOT NULL,
  `doctor_first_name` varchar(75) NOT NULL,
  `doctor_last_name` varchar(75) NOT NULL,
  `doctor_email` varchar(75) NOT NULL,
  `doctor_phone` varchar(10) NOT NULL,
  `doctor_website` varchar(75) DEFAULT NULL,
  `doctor_address` varchar(75) NOT NULL,
  `doctor_specialization` varchar(75) DEFAULT NULL,
  `doctor_experience` varchar(75) DEFAULT NULL,
  `doctor_fees_per_consulation` varchar(50) NOT NULL,
  `status` varchar(15) NOT NULL,
  `timings` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `LIST_APPOINTMENT`
--

CREATE TABLE `LIST_APPOINTMENT` (
  `appointment_id` varchar(75) NOT NULL,
  `user_id` varchar(75) NOT NULL,
  `doctor_id` varchar(75) NOT NULL,
  `treatment_id` int(11) NOT NULL,
  `user_info` longtext NOT NULL,
  `doctor_info` longtext NOT NULL,
  `status` varchar(25) NOT NULL,
  `begin_time` varchar(25) NOT NULL,
  `end_time` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `MESSAGE`
--

CREATE TABLE `MESSAGE` (
  `message_id` varchar(75) NOT NULL,
  `chat_id` varchar(75) NOT NULL,
  `sender_id` varchar(75) NOT NULL,
  `message` varchar(220) DEFAULT NULL,
  `sending_date` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `TREATMENT`
--

CREATE TABLE `TREATMENT` (
  `treatment_id` int(11) NOT NULL,
  `treatment_name` varchar(75) NOT NULL,
  `treatment_description` varchar(255) NOT NULL,
  `treatment_timings` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `TREATMENT`
--

INSERT INTO `TREATMENT` (`treatment_id`, `treatment_name`, `treatment_description`, `treatment_timings`) VALUES
(1, 'consultation', 'Initial consultation with the Dentist', '00:30'),
(2, 'cleaning', 'Professional teeth cleanning', '01:00'),
(3, 'filing', 'Treatment teeth cleanning', '00:45'),
(4, 'whitening', 'Professional teeth whitening', '01:00'),
(5, 'extraction', 'Tooth extraction', '00:45'),
(6, 'orthodontics', 'Orthodontic treatment to align teeth', '02:00');

-- --------------------------------------------------------

--
-- Structure de la table `USERS`
--

CREATE TABLE `USERS` (
  `user_id` varchar(75) NOT NULL,
  `user_first_name` varchar(75) DEFAULT NULL,
  `user_last_name` varchar(75) DEFAULT NULL,
  `user_email` varchar(75) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_phone` varchar(10) NOT NULL,
  `user_gender` varchar(10) NOT NULL,
  `user_notification` longtext DEFAULT '[]',
  `user_seen_notification` longtext DEFAULT '[]',
  `isAdmin` tinyint(1) DEFAULT 0,
  `isDoctor` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `USERS`
--

INSERT INTO `USERS` (`user_id`, `user_first_name`, `user_last_name`, `user_email`, `user_password`, `user_phone`, `user_gender`, `user_notification`, `user_seen_notification`, `isAdmin`, `isDoctor`) VALUES
('adminIda0accc28f6c28ff6bb780d4a8e6edfc6', 'Admin', 'admin user', 'admin@gmail.com', '123', '0332574691', 'autre', '[]', '[]', 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `CHAT`
--
ALTER TABLE `CHAT`
  ADD PRIMARY KEY (`chat_id`);

--
-- Index pour la table `DOCTORS`
--
ALTER TABLE `DOCTORS`
  ADD PRIMARY KEY (`doctor_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `doctor_email` (`doctor_email`),
  ADD UNIQUE KEY `doctor_website` (`doctor_website`);

--
-- Index pour la table `LIST_APPOINTMENT`
--
ALTER TABLE `LIST_APPOINTMENT`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `treatment_id` (`treatment_id`);

--
-- Index pour la table `MESSAGE`
--
ALTER TABLE `MESSAGE`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `chat_id` (`chat_id`);

--
-- Index pour la table `TREATMENT`
--
ALTER TABLE `TREATMENT`
  ADD PRIMARY KEY (`treatment_id`);

--
-- Index pour la table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `TREATMENT`
--
ALTER TABLE `TREATMENT`
  MODIFY `treatment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `DOCTORS`
--
ALTER TABLE `DOCTORS`
  ADD CONSTRAINT `DOCTORS_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`user_id`);

--
-- Contraintes pour la table `LIST_APPOINTMENT`
--
ALTER TABLE `LIST_APPOINTMENT`
  ADD CONSTRAINT `LIST_APPOINTMENT_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`user_id`),
  ADD CONSTRAINT `LIST_APPOINTMENT_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `DOCTORS` (`doctor_id`),
  ADD CONSTRAINT `LIST_APPOINTMENT_ibfk_3` FOREIGN KEY (`treatment_id`) REFERENCES `TREATMENT` (`treatment_id`);

--
-- Contraintes pour la table `MESSAGE`
--
ALTER TABLE `MESSAGE`
  ADD CONSTRAINT `MESSAGE_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `CHAT` (`chat_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
