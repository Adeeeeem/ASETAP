-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2019 at 03:06 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asetap`
--

-- --------------------------------------------------------

--
-- Table structure for table `budget`
--

CREATE TABLE `budget` (
  `id_sport` int(10) NOT NULL,
  `proposed` int(7) NOT NULL DEFAULT '0',
  `agreed` int(7) NOT NULL DEFAULT '0',
  `year` int(4) NOT NULL,
  `done` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `etap`
--

CREATE TABLE `etap` (
  `matricule_etap` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `etap`
--

INSERT INTO `etap` (`matricule_etap`) VALUES
('1'),
('10'),
('2'),
('3'),
('4'),
('5'),
('6'),
('7'),
('8'),
('9');

-- --------------------------------------------------------

--
-- Table structure for table `kid1`
--

CREATE TABLE `kid1` (
  `login_user` varchar(15) NOT NULL,
  `fname_kid1` varchar(15) NOT NULL,
  `lname_kid1` varchar(15) NOT NULL,
  `gender_kid1` enum('KM','KF') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kid2`
--

CREATE TABLE `kid2` (
  `login_user` varchar(15) NOT NULL,
  `fname_kid2` varchar(15) NOT NULL,
  `lname_kid2` varchar(15) NOT NULL,
  `gender_kid2` enum('KM','KF') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sport`
--

CREATE TABLE `sport` (
  `id_sport` int(10) NOT NULL,
  `name_sport` varchar(50) NOT NULL,
  `available_sport` varchar(15) NOT NULL,
  `start_sport` time NOT NULL,
  `end_sport` time NOT NULL,
  `address_sport` varchar(50) NOT NULL,
  `tag_sport` enum('M','F','KM','KF') NOT NULL,
  `convinced_sport` enum('0','1') NOT NULL,
  `price_sport` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sport`
--

INSERT INTO `sport` (`id_sport`, `name_sport`, `available_sport`, `start_sport`, `end_sport`, `address_sport`, `tag_sport`, `convinced_sport`, `price_sport`) VALUES
(1, 'Basket Ball Hommes', '35', '11:00:00', '12:00:00', 'CitÃ© National Sportive', 'M', '1', 45),
(2, 'Hand Ball Hommes', '35', '11:30:00', '13:00:00', 'CitÃ© National Sportive', 'M', '1', 35),
(3, 'Volley Ball Hommes', '35', '11:30:00', '13:00:00', 'Salle Mohamed Zouaoui (EspÃ©rance)', 'M', '1', 40),
(4, 'Volley Ball Dames', '35', '12:30:00', '14:00:00', 'Salle Mohamed Zouaoui (EspÃ©rance)', 'F', '1', 40),
(5, 'Foot Ball Hommes A', '35', '11:30:00', '13:00:00', 'Olympysky Lac II', 'M', '1', 35),
(6, 'Foot Ball Hommes B', '35', '11:30:00', '13:00:00', 'Olympysky Lac II', 'M', '1', 35),
(7, 'Foot Ball Enfant', '47', '09:00:00', '09:30:00', 'Arianna', 'KM', '0', 25),
(8, 'Academy Basket Ball', '47', '09:00:00', '10:30:00', 'Arianna', 'KF', '0', 25);

-- --------------------------------------------------------

--
-- Table structure for table `spouse`
--

CREATE TABLE `spouse` (
  `login_user` varchar(15) NOT NULL,
  `fname_spouse` varchar(15) NOT NULL,
  `lname_spouse` varchar(15) NOT NULL,
  `gender_spouse` enum('M','F') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `login` varchar(15) NOT NULL,
  `type` enum('user','spouse','kid1','kid2') NOT NULL,
  `id_sport` int(10) NOT NULL,
  `period` varchar(10) NOT NULL,
  `period_start` date NOT NULL,
  `period_end` date DEFAULT NULL,
  `suspended` enum('0','1') NOT NULL DEFAULT '0',
  `price` int(6) NOT NULL DEFAULT '0',
  `paid` enum('Y','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `login_user` varchar(15) NOT NULL,
  `matricule_user` varchar(10) NOT NULL,
  `fname_user` varchar(15) NOT NULL,
  `lname_user` varchar(15) NOT NULL,
  `password_user` varchar(25) NOT NULL,
  `gender_user` enum('M','F') NOT NULL,
  `email_user` varchar(50) NOT NULL,
  `type_user` enum('user','etap','asetap') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budget`
--
ALTER TABLE `budget`
  ADD PRIMARY KEY (`year`,`id_sport`),
  ADD KEY `id_sport` (`id_sport`);

--
-- Indexes for table `etap`
--
ALTER TABLE `etap`
  ADD PRIMARY KEY (`matricule_etap`);

--
-- Indexes for table `kid1`
--
ALTER TABLE `kid1`
  ADD PRIMARY KEY (`login_user`);

--
-- Indexes for table `kid2`
--
ALTER TABLE `kid2`
  ADD PRIMARY KEY (`login_user`);

--
-- Indexes for table `sport`
--
ALTER TABLE `sport`
  ADD PRIMARY KEY (`id_sport`);

--
-- Indexes for table `spouse`
--
ALTER TABLE `spouse`
  ADD PRIMARY KEY (`login_user`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`login`,`type`,`id_sport`,`period_start`),
  ADD KEY `id_sport` (`id_sport`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`login_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sport`
--
ALTER TABLE `sport`
  MODIFY `id_sport` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `budget`
--
ALTER TABLE `budget`
  ADD CONSTRAINT `budget_ibfk_1` FOREIGN KEY (`id_sport`) REFERENCES `sport` (`id_sport`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kid1`
--
ALTER TABLE `kid1`
  ADD CONSTRAINT `kid1_ibfk_1` FOREIGN KEY (`login_user`) REFERENCES `user` (`login_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kid2`
--
ALTER TABLE `kid2`
  ADD CONSTRAINT `kid2_ibfk_1` FOREIGN KEY (`login_user`) REFERENCES `user` (`login_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `spouse`
--
ALTER TABLE `spouse`
  ADD CONSTRAINT `spouse_ibfk_1` FOREIGN KEY (`login_user`) REFERENCES `user` (`login_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `training`
--
ALTER TABLE `training`
  ADD CONSTRAINT `training_ibfk_1` FOREIGN KEY (`login`) REFERENCES `user` (`login_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `training_ibfk_2` FOREIGN KEY (`id_sport`) REFERENCES `sport` (`id_sport`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
