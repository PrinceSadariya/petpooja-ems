-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2025 at 07:55 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `petpooja_ems`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `status`, `created_at`, `modified_at`) VALUES
('3a47d511-de78-11ef-a4d1-f80dac07f4c0', 'R&D', 1, '2025-01-29 19:35:38', '2025-01-29 19:35:38'),
('3b4adb5f-df27-11ef-a4d1-f80dac07f4c0', 'HR', 1, '2025-01-30 16:28:19', '2025-01-30 16:28:48'),
('6c2982cb-df34-11ef-a4d1-f80dac07f4c0', 'Sales', 1, '2025-01-30 18:02:45', '2025-01-30 18:02:55'),
('79917796-df34-11ef-a4d1-f80dac07f4c0', 'Admin', 1, '2025-01-30 18:03:07', '2025-01-30 18:03:07');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `department_id` char(36) NOT NULL,
  `dob` date NOT NULL,
  `phone` varchar(15) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `salary` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `department_id`, `dob`, `phone`, `photo`, `email`, `salary`, `status`, `created_at`, `modified_at`) VALUES
('03117424-df36-11ef-a4d1-f80dac07f4c0', 'Dhruv Patel', '6c2982cb-df34-11ef-a4d1-f80dac07f4c0', '2002-05-22', '7678987654', '', 'dhruv2002@test.com', 70000, 1, '2025-01-30 18:14:07', '2025-01-30 18:14:07'),
('2b3d2868-deb2-11ef-a4d1-f80dac07f4c0', 'Prince Sadariya', '3a47d511-de78-11ef-a4d1-f80dac07f4c0', '2002-05-22', '6564672123', '', 'prince@gmail.com', 1000, 1, '2025-01-30 02:30:23', '2025-01-30 02:30:23'),
('91afb5e4-df35-11ef-a4d1-f80dac07f4c0', 'Raj Kapoor', '6c2982cb-df34-11ef-a4d1-f80dac07f4c0', '2010-05-05', '9876543456', '', 'Raj123@test.com', 90400, 1, '2025-01-30 18:10:57', '2025-01-30 18:10:57'),
('cc7e33bd-df1a-11ef-a4d1-f80dac07f4c0', 'Jay Joshi', '3a47d511-de78-11ef-a4d1-f80dac07f4c0', '2002-05-22', '9512782356', '', 'jay@gmail.com', 35000, 1, '2025-01-30 14:59:19', '2025-01-30 14:59:19'),
('f677c072-df34-11ef-a4d1-f80dac07f4c0', 'Jon doe', '79917796-df34-11ef-a4d1-f80dac07f4c0', '1997-05-16', '9780876543', '1738260397028-26349.webp', 'jondoe123@test.com', 10000, 1, '2025-01-30 18:06:37', '2025-01-30 18:06:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `emp_dept_fk` (`department_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `emp_dept_fk` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
