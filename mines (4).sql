-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2023 at 07:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mines`
--

-- --------------------------------------------------------

--
-- Table structure for table `daily_report`
--

CREATE TABLE `daily_report` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `mine_no` int(11) NOT NULL,
  `vehicle` int(11) UNSIGNED NOT NULL,
  `trip_type` int(11) UNSIGNED NOT NULL,
  `with_lead` enum('Yes','No') NOT NULL DEFAULT 'No',
  `trips` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL,
  `remarks` text DEFAULT NULL,
  `userid` int(11) UNSIGNED NOT NULL,
  `status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1: Active , 2: Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `daily_report`
--

INSERT INTO `daily_report` (`id`, `role_id`, `mine_no`, `vehicle`, `trip_type`, `with_lead`, `trips`, `quantity`, `rate`, `amount`, `date`, `remarks`, `userid`, `status`) VALUES
(1, 2, 2, 16, 3, 'No', 3, 18, 2871, 155034, '2023-07-14', ' ', 1, '1'),
(2, 2, 12, 17, 15, 'No', 2, 20, 4499, 179960, '2023-07-09', ' ', 1, '1'),
(3, 2, 1, 11, 19, 'No', 3, 19, 3788, 215916, '2023-07-29', ' ', 1, '1'),
(4, 2, 17, 7, 11, 'No', 3, 17, 4722, 240822, '2023-07-01', ' ', 1, '1'),
(5, 2, 7, 20, 16, 'No', 1, 18, 3051, 54918, '2023-07-23', ' ', 1, '1'),
(6, 2, 13, 14, 9, 'No', 5, 19, 3606, 342570, '2023-07-08', ' ', 1, '1'),
(7, 2, 9, 1, 12, 'No', 3, 5, 3959, 59385, '2023-07-21', ' ', 1, '1'),
(8, 2, 7, 8, 17, 'No', 1, 10, 2098, 20980, '2023-07-25', ' ', 1, '1'),
(9, 2, 14, 7, 9, 'No', 5, 17, 1710, 145350, '2023-07-04', ' ', 1, '1'),
(10, 2, 4, 17, 19, 'No', 5, 6, 4339, 130170, '2023-07-23', ' ', 1, '1'),
(11, 2, 6, 7, 15, 'No', 1, 2, 4709, 9418, '2023-07-14', ' ', 1, '1'),
(12, 2, 8, 7, 18, 'No', 2, 6, 5860, 70320, '2023-07-02', ' ', 1, '1'),
(13, 2, 6, 4, 12, 'No', 4, 9, 4387, 157932, '2023-07-06', ' ', 1, '1'),
(14, 2, 15, 17, 19, 'No', 3, 14, 5678, 238476, '2023-07-07', ' ', 1, '1'),
(15, 2, 15, 4, 15, 'No', 5, 5, 5587, 139675, '2023-07-21', ' ', 1, '1'),
(16, 2, 3, 7, 14, 'No', 1, 14, 1619, 22666, '2023-07-23', ' ', 1, '1'),
(17, 2, 3, 14, 2, 'No', 1, 9, 3169, 28521, '2023-07-08', ' ', 1, '1'),
(18, 2, 10, 11, 19, 'No', 3, 14, 4838, 203196, '2023-07-07', ' ', 1, '1'),
(19, 2, 18, 20, 1, 'No', 4, 4, 1050, 16800, '2023-07-28', ' ', 1, '1'),
(20, 2, 1, 13, 3, 'No', 4, 6, 5447, 130728, '2023-07-07', ' ', 1, '1'),
(21, 2, 1, 1, 15, 'No', 4, 2, 5079, 40632, '2023-07-21', ' ', 1, '1'),
(22, 2, 2, 19, 9, 'No', 5, 12, 3348, 200880, '2023-07-21', ' ', 1, '2'),
(23, 2, 9, 8, 4, 'No', 5, 17, 3151, 267835, '2023-07-08', ' ', 1, '1'),
(24, 2, 19, 4, 10, 'No', 1, 6, 1150, 6900, '2023-07-05', ' ', 1, '1'),
(25, 2, 11, 1, 10, 'No', 3, 19, 4006, 228342, '2023-07-15', ' ', 1, '1'),
(26, 2, 8, 7, 3, 'No', 5, 7, 1476, 51660, '2023-07-05', ' ', 1, '1'),
(27, 2, 15, 4, 12, 'No', 5, 4, 2671, 53420, '2023-07-23', ' ', 1, '1'),
(28, 2, 9, 5, 11, 'No', 5, 8, 2099, 83960, '2023-07-11', ' ', 1, '1'),
(29, 2, 14, 7, 17, 'No', 1, 10, 4966, 49660, '2023-07-03', ' ', 1, '1'),
(30, 2, 7, 5, 6, 'No', 3, 14, 3385, 142170, '2023-07-03', ' ', 1, '1'),
(31, 2, 12, 6, 18, 'No', 5, 4, 2793, 55860, '2023-07-25', ' ', 1, '1'),
(32, 2, 10, 7, 10, 'No', 3, 14, 2635, 110670, '2023-07-16', ' ', 1, '1'),
(33, 2, 4, 7, 18, 'No', 4, 13, 3665, 190580, '2023-07-27', ' ', 1, '1'),
(34, 2, 16, 18, 8, 'No', 3, 19, 3694, 210558, '2023-07-04', ' ', 1, '1'),
(35, 2, 6, 17, 11, 'No', 4, 7, 4028, 112784, '2023-07-04', ' ', 1, '1'),
(36, 2, 17, 17, 16, 'No', 4, 11, 3668, 161392, '2023-07-21', ' ', 1, '1'),
(37, 2, 1, 9, 15, 'No', 1, 18, 4865, 87570, '2023-07-23', ' ', 1, '1'),
(38, 2, 10, 14, 11, 'No', 2, 9, 1453, 26154, '2023-07-22', ' ', 1, '1'),
(39, 2, 7, 19, 3, 'No', 4, 10, 3931, 157240, '2023-07-06', ' ', 1, '1'),
(40, 2, 14, 18, 20, 'No', 1, 3, 2161, 6483, '2023-07-06', ' ', 1, '1'),
(41, 2, 1, 11, 11, 'No', 1, 8, 3081, 24648, '2023-07-11', ' ', 1, '1'),
(42, 2, 2, 20, 13, 'No', 2, 5, 1905, 19050, '2023-07-27', ' ', 1, '1'),
(43, 2, 14, 8, 4, 'No', 5, 10, 5582, 279100, '2023-07-27', ' ', 1, '1'),
(44, 2, 5, 5, 11, 'No', 5, 9, 5624, 253080, '2023-07-26', ' ', 1, '1'),
(45, 2, 6, 8, 4, 'No', 1, 11, 3234, 35574, '2023-07-07', ' ', 1, '1'),
(46, 2, 7, 15, 2, 'No', 3, 9, 3112, 84024, '2023-07-18', ' ', 1, '1'),
(47, 2, 16, 6, 4, 'No', 5, 4, 1626, 32520, '2023-07-30', ' ', 1, '1'),
(48, 2, 2, 15, 17, 'No', 5, 11, 1657, 91135, '2023-07-14', ' ', 1, '1'),
(49, 2, 18, 16, 3, 'No', 4, 15, 5997, 359820, '2023-07-25', ' ', 1, '1'),
(50, 2, 3, 17, 5, 'No', 3, 8, 2776, 66624, '2023-07-15', ' ', 1, '1'),
(51, 2, 7, 5, 16, 'No', 1, 8, 2208, 17664, '2023-07-25', ' ', 1, '1'),
(52, 2, 16, 14, 19, 'No', 2, 8, 5831, 93296, '2023-07-29', ' ', 1, '1'),
(53, 2, 1, 18, 19, 'No', 4, 6, 2536, 60864, '2023-07-08', ' ', 1, '1'),
(54, 2, 18, 16, 13, 'No', 3, 8, 1416, 33984, '2023-07-17', ' ', 1, '1'),
(55, 2, 4, 18, 1, 'No', 5, 19, 4394, 417430, '2023-07-30', ' ', 1, '1'),
(56, 2, 17, 9, 2, 'No', 3, 14, 2785, 116970, '2023-07-17', ' ', 1, '1'),
(57, 2, 12, 18, 14, 'No', 1, 19, 2603, 49457, '2023-07-24', ' ', 1, '1'),
(58, 2, 6, 15, 18, 'No', 3, 2, 1854, 11124, '2023-07-23', ' ', 1, '1'),
(59, 2, 13, 14, 14, 'No', 2, 13, 1539, 40014, '2023-07-22', ' ', 1, '1'),
(60, 2, 17, 6, 7, 'No', 5, 7, 4141, 144935, '2023-07-24', ' ', 1, '1'),
(61, 2, 7, 12, 13, 'No', 3, 6, 3019, 54342, '2023-07-03', ' ', 1, '1'),
(62, 2, 1, 5, 12, 'No', 5, 3, 4635, 69525, '2023-07-25', ' ', 1, '1'),
(63, 2, 9, 7, 11, 'No', 5, 16, 1145, 91600, '2023-07-22', ' ', 1, '1'),
(64, 2, 2, 8, 20, 'No', 5, 11, 1774, 97570, '2023-07-21', ' ', 1, '1'),
(65, 2, 3, 7, 13, 'No', 3, 13, 2297, 89583, '2023-07-24', ' ', 1, '1'),
(66, 2, 18, 15, 4, 'No', 2, 2, 4216, 16864, '2023-07-03', ' ', 1, '1'),
(67, 2, 14, 18, 20, 'No', 2, 6, 1349, 16188, '2023-07-17', ' ', 1, '1'),
(68, 2, 12, 8, 15, 'No', 4, 6, 1247, 29928, '2023-07-27', ' ', 1, '1'),
(69, 2, 12, 17, 20, 'No', 1, 5, 3805, 19025, '2023-07-04', ' ', 1, '1'),
(70, 2, 13, 2, 14, 'No', 5, 18, 3967, 357030, '2023-07-30', ' ', 1, '1'),
(71, 2, 3, 15, 2, 'No', 4, 15, 3144, 188640, '2023-07-22', ' ', 1, '1'),
(72, 2, 15, 7, 18, 'No', 3, 11, 3648, 120384, '2023-07-20', ' ', 1, '1'),
(73, 2, 8, 18, 5, 'No', 5, 9, 4464, 200880, '2023-07-19', ' ', 1, '1'),
(74, 2, 18, 3, 8, 'No', 2, 2, 4528, 18112, '2023-07-29', ' ', 1, '1'),
(75, 2, 19, 16, 4, 'No', 3, 20, 5493, 329580, '2023-07-03', ' ', 1, '1'),
(76, 2, 7, 15, 18, 'No', 3, 13, 3638, 141882, '2023-07-04', ' ', 1, '1'),
(77, 2, 17, 7, 5, 'No', 1, 10, 4086, 40860, '2023-07-17', ' ', 1, '1'),
(78, 2, 4, 17, 17, 'No', 2, 8, 3405, 54480, '2023-07-20', ' ', 1, '1'),
(79, 2, 14, 11, 20, 'No', 2, 10, 5854, 117080, '2023-07-09', ' ', 1, '1'),
(80, 2, 10, 5, 16, 'No', 4, 16, 1241, 79424, '2023-07-25', ' ', 1, '1'),
(81, 2, 1, 20, 18, 'No', 2, 20, 4710, 188400, '2023-07-07', ' ', 1, '1'),
(82, 2, 11, 18, 18, 'No', 3, 7, 5887, 123627, '2023-07-30', ' ', 1, '1'),
(83, 2, 10, 11, 8, 'No', 5, 11, 4499, 247445, '2023-07-30', ' ', 1, '1'),
(84, 2, 5, 15, 7, 'No', 3, 8, 3910, 93840, '2023-07-03', ' ', 1, '1'),
(85, 2, 18, 15, 7, 'No', 1, 12, 2642, 31704, '2023-07-17', ' ', 1, '1'),
(86, 2, 14, 17, 2, 'No', 4, 14, 1624, 90944, '2023-07-29', ' ', 1, '1'),
(87, 2, 19, 4, 15, 'No', 4, 19, 2888, 219488, '2023-07-17', ' ', 1, '1'),
(88, 2, 6, 10, 18, 'No', 5, 16, 1395, 111600, '2023-07-15', ' ', 1, '1'),
(89, 2, 13, 6, 9, 'No', 3, 14, 4463, 187446, '2023-07-21', ' ', 1, '1'),
(90, 2, 1, 4, 2, 'No', 3, 14, 4868, 204456, '2023-07-23', ' ', 1, '1'),
(91, 2, 9, 7, 16, 'No', 5, 10, 5352, 267600, '2023-07-08', ' ', 1, '1'),
(92, 2, 15, 5, 16, 'No', 2, 11, 3702, 81444, '2023-07-07', ' ', 1, '1'),
(93, 2, 1, 3, 7, 'No', 4, 15, 4890, 293400, '2023-07-12', ' ', 1, '1'),
(94, 2, 8, 17, 7, 'No', 3, 15, 4398, 197910, '2023-07-25', ' ', 1, '1'),
(95, 2, 10, 6, 6, 'No', 4, 5, 5943, 118860, '2023-07-25', ' ', 1, '1'),
(96, 2, 11, 3, 13, 'No', 5, 5, 2137, 53425, '2023-07-07', ' ', 1, '1'),
(97, 2, 10, 13, 19, 'No', 1, 14, 2292, 32088, '2023-07-19', ' ', 1, '1'),
(98, 2, 4, 17, 14, 'No', 4, 16, 4123, 263872, '2023-07-30', ' ', 1, '1'),
(99, 2, 1, 5, 10, 'No', 4, 3, 2928, 35136, '2023-07-03', ' ', 1, '1'),
(100, 2, 14, 10, 7, 'No', 1, 1, 4067, 4067, '2023-07-05', ' ', 1, '1'),
(102, 2, 11, 13, 17, 'No', 2, 7865, 35445, 557549850, '2023-11-01', 'FDSFSG', 3, '1'),
(103, 2, 7, 9, 17, 'No', 2, 8, 322, 5152, '2023-11-02', 'zaxscdvfbgb', 3, '1'),
(120, 2, 7, 8, 9, 'No', 2, 5, 3, 30, '2023-11-01', 'asdfgng', 3, '1'),
(121, 2, 7, 8, 9, 'No', 2, 5, 3, 30, '2023-11-01', 'asdfgng', 3, '1'),
(122, 2, 2, 5, 23, 'No', 2, 5, 1000, 10000, '2023-07-12', ' ', 3, '1'),
(123, 8, 12, 16, 12, 'No', 2, 2, 2, 8, '2023-11-01', 'wertyui', 3, '1'),
(124, 15, 23, 25, 31, 'No', 7, 8, 6, 336, '2023-11-08', 'CGFBCVBCGNCC', 3, '1'),
(125, 2, 16, 19, 1, 'No', 1, 12, 12, 144, '2023-11-03', 'qwertyu', 3, '1');

-- --------------------------------------------------------

--
-- Table structure for table `mine`
--

CREATE TABLE `mine` (
  `id` int(11) NOT NULL,
  `mine_name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `status` enum('1','2') NOT NULL COMMENT '1: Active , 2: Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mine`
--

INSERT INTO `mine` (`id`, `mine_name`, `code`, `status`) VALUES
(1, 'Himalayan Gem Quarry', 'HGQ123', '1'),
(2, 'Rajasthan Marble Mines', 'RMM456', '1'),
(3, 'Goa Iron Ore Pit', 'GIOP789', '1'),
(4, 'Bengal Coalfields', 'BCF234', '1'),
(5, 'Karnataka Gold Reserve', 'KGR567', '1'),
(6, 'Andhra Pradesh Diamond Mine', 'APDM890', '1'),
(7, 'Odisha Bauxite Fields', 'OBF123', '1'),
(8, 'Madhya Pradesh Copper Mine', 'MPCM456', '1'),
(9, 'Tamil Nadu Granite Quarry', 'TNGQ789', '1'),
(10, 'Kerala Spice Mining Co.', 'KSMC234', '1'),
(11, 'Gujarat Salt Plains', 'GSP567', '1'),
(12, 'Maharashtra Limestone Quarry', 'MLQ890', '1'),
(13, 'Telangana Turquoise Pit', 'TTP123', '1'),
(14, 'Uttar Pradesh Uranium Mine', 'UPUM456', '1'),
(15, 'Jharkhand Sapphire Fields', 'JSF789', '1'),
(16, 'Assam Oil Sands', 'AOS234', '1'),
(17, 'Punjab Sandstone Quarry', 'PSQ567', '1'),
(18, 'Haryana Coal Mine', 'HCM890', '1'),
(19, 'Bihar Gemstone Pit', 'BGP123', '1'),
(20, 'Ashapura', 'ASP123', '1'),
(21, 'qwert', 'qy23', '1'),
(22, 'Ashapura', 'ASP12', '1'),
(23, 'Promod Mine', 'PMMOdi', '1');

-- --------------------------------------------------------

--
-- Table structure for table `trip_type`
--

CREATE TABLE `trip_type` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1: Active , 2: Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trip_type`
--

INSERT INTO `trip_type` (`id`, `type`, `created`, `updated`, `status`) VALUES
(1, 'Soft', '2023-11-09 09:43:44', NULL, '1'),
(2, 'Hard', '2023-11-09 09:43:44', NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(35) NOT NULL,
  `mobile` varchar(13) NOT NULL,
  `role` int(11) NOT NULL,
  `code` int(12) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `updated` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1: Active , 2: Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `username`, `password`, `mobile`, `role`, `code`, `reset_token`, `created`, `updated`, `status`) VALUES
(1, 'pramod', 'yadav', 'pesbest25@gmail.com', 'promod', '7b7f71bff78951c020e9c647a32bb839', '+919925132988', 2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4OTg3OTA5LCJleHAiOjE2OTg5OTE1MDl9.ePCttDfqFg34JlNqqpqtSW4sLyp-wo774wDGuMBWIgQ', '2023-10-11 16:28:50', '2023-11-03 10:35:09', '1'),
(2, 'rahul', 'gusai', 'rahulab9717@gmail.com', 'rahul', '7b7f71bff78951c020e9c647a32bb839', '+919925132988', 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk5MDA5NDk1LCJleHAiOjE2OTkwMTMwOTV9.rWZUKJmC2i0aMKRvX1MTJr5835DnK-1AWrbS8ZNjVWY', '2023-10-11 16:29:26', '2023-11-07 14:50:53', '1'),
(3, 'rahul', 'gusai', 'rahul.gusai.7998@gmail.com', 'rahul09', '10b8e822d03fb4fd946188e852a4c3e2', '+919925132988', 2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk5MTAwNDU0LCJleHAiOjE2OTkxMDQwNTR9.VS7ddWnY6L6XwI-k1yciAEDNLAHDDZzuwLduN8vH_ZM', '2023-10-11 17:35:41', '2023-11-04 17:50:54', '1'),
(4, 'mahima', 'joshi', 'mahimayogeshjoshi3105@gmail.com', 'mahima', '10b8e822d03fb4fd946188e852a4c3e2', '+919925632988', 1, 1, NULL, '2023-10-20 14:53:39', NULL, '1'),
(5, 'pt', 'tanna', 'pkt@protonmail.com', 'pkt', '10b8e822d03fb4fd946188e852a4c3e2', '-919925632988', 1, 1, NULL, '2023-10-20 15:35:59', NULL, '1'),
(6, 'pt', 'tanna', 'pkt1@protonmail.com', 'pkt2', '10b8e822d03fb4fd946188e852a4c3e2', '-919925.32988', 1, 1, NULL, '2023-10-20 15:37:59', NULL, '1'),
(7, 'Hemanshu', 'Parmar', 'hjparmar11@gmail.com', 'hjparmar', '0b3bc9ce555f07d127c6da44337e364f', '+911234567890', 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjk5MzM2Mzk5LCJleHAiOjE2OTkzMzk5OTl9.uMd8lkuZw8K3exJjHs-Kwvhb_7LyOYmk5W2fNQao2VU', '2023-11-03 10:27:15', '2023-11-07 11:23:19', '1'),
(8, 'Hemanshu', 'Parmar', 'hemanshup2002@gmail.com', 'hjp', '10b8e822d03fb4fd946188e852a4c3e2', '+911234567890', 1, 1, NULL, '2023-11-03 17:26:58', NULL, '1'),
(13, 'Pramod', 'Yadav', 'pyadav@gmail.com', 'pro_mod', '10b8e822d03fb4fd946188e852a4c3e2', '+911234567890', 2, 1, NULL, '2023-11-04 16:31:40', NULL, '1'),
(14, 'Pt', 'Tanna', 'pkt41@protonmail.com', 'pket2', '10b8e822d03fb4fd946188e852a4c3e2', '+919925312988', 1, 1, NULL, '2023-11-08 10:35:52', NULL, '1'),
(15, 'Pt', 'Tanna', 'pkt421@protonmail.com', 'pk2et2', '10b8e822d03fb4fd946188e852a4c3e2', '+919925312988', 1, 1, NULL, '2023-11-08 10:38:10', NULL, '1'),
(16, 'Pt', 'Tanna', 'pkt2421@protonmail.com', 'pk22et2', '10b8e822d03fb4fd946188e852a4c3e2', '+919925312988', 1, 1, NULL, '2023-11-08 10:38:29', NULL, '1'),
(17, 'Pt', 'Tanna', 'pkt24321@protonmail.com', 'pk232et2', '10b8e822d03fb4fd946188e852a4c3e2', '+919925312988', 2, 1, NULL, '2023-11-08 14:43:07', NULL, '1'),
(18, 'Pt', 'Tanna', 'pkt2432x1@protonmail.com', 'pk232det2', '10b8e822d03fb4fd946188e852a4c3e2', '+919925312988', 2, 1, NULL, '2023-11-08 14:43:38', NULL, '1'),
(19, 'Admin', 'Admin', 'admin@admin.com', 'admin', '0e7517141fb53f21ee439b355b5a1d0a', '+911234567890', 1, 1, NULL, '2023-11-08 14:57:30', '2023-11-08 14:58:32', '1'),
(20, 'Chandni', 'Gadhvi', 'chandni.gadhvi@aeonx.digital', 'chandni', '7b7f71bff78951c020e9c647a32bb839', '+917575091812', 2, 1, NULL, '2023-11-08 16:32:37', NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `users_role`
--

CREATE TABLE `users_role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1:Active , 2: Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_role`
--

INSERT INTO `users_role` (`id`, `role_name`, `code`, `created`, `updated`, `status`) VALUES
(1, 'admin', 'admin', '2023-11-09 09:39:47', NULL, '2'),
(2, 'User1', 'us1', '2023-11-09 09:40:17', NULL, '1'),
(3, 'User2', 'us2', '2023-11-09 09:40:32', NULL, '1'),
(19, 'mineuser', '001', '2023-11-10 07:59:16', NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1: Active , 2: Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `created`, `updated`, `status`) VALUES
(1, 'Dump Trucks', '2023-10-11 09:43:25', '2023-11-06 10:41:03', '1'),
(2, 'Excavators', '2023-10-11 09:43:25', NULL, '1'),
(3, 'Bulldozers', '2023-10-11 09:43:25', NULL, '1'),
(4, 'Loaders', '2023-10-11 09:43:25', NULL, '1'),
(5, 'Drilling Rigs', '2023-10-11 09:43:25', '2023-11-06 10:41:18', '2'),
(6, 'Haul Trucks', '2023-10-11 09:43:25', NULL, '1'),
(7, 'Graders', '2023-10-11 09:43:25', NULL, '1'),
(8, 'Water Trucks', '2023-10-11 09:43:25', NULL, '1'),
(9, 'Utility Vehicles', '2023-10-11 09:43:25', NULL, '1'),
(10, 'Personnel Carriers', '2023-10-11 09:43:25', NULL, '1'),
(11, 'Dragline Excavators', '2023-10-11 09:43:25', NULL, '1'),
(12, 'Articulated Trucks', '2023-10-11 09:43:25', NULL, '1'),
(13, 'Shuttle Cars', '2023-10-11 09:43:25', NULL, '1'),
(14, 'Continuous Miners', '2023-10-11 09:43:25', NULL, '1'),
(15, 'Longwall Mining Equipment', '2023-10-11 09:43:25', NULL, '1'),
(16, 'Scrap', '2023-10-11 09:43:25', '2023-11-06 09:21:11', '1'),
(17, 'Rock Trucks', '2023-10-11 09:43:25', '2023-11-06 10:02:41', '2'),
(18, 'Raise Bore Drills', '2023-10-11 09:43:25', '2023-11-06 09:18:53', '2'),
(19, 'Concrete Sprayers', '2023-10-11 09:43:25', '2023-11-06 09:17:47', '2'),
(20, 'Utility Tractors', '2023-10-11 09:43:25', '2023-11-06 09:14:21', '2'),
(21, 'Dump Truck', '2023-11-06 07:44:20', '2023-11-06 09:10:10', '2'),
(22, 'BMW', '2023-11-06 07:49:25', '2023-11-06 09:07:26', '2'),
(23, 'trailer', '2023-11-06 07:50:00', '2023-11-06 09:05:39', '2'),
(25, 'Mercedes19', '2023-11-08 09:30:14', '2023-11-08 11:05:07', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daily_report`
--
ALTER TABLE `daily_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vehicle` (`vehicle`),
  ADD KEY `fk_triptype` (`trip_type`),
  ADD KEY `fk_user` (`userid`),
  ADD KEY `fk_role` (`role_id`),
  ADD KEY `fk_mine` (`mine_no`);

--
-- Indexes for table `mine`
--
ALTER TABLE `mine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_type`
--
ALTER TABLE `trip_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rolename` (`role`);

--
-- Indexes for table `users_role`
--
ALTER TABLE `users_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daily_report`
--
ALTER TABLE `daily_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `mine`
--
ALTER TABLE `mine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `trip_type`
--
ALTER TABLE `trip_type`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users_role`
--
ALTER TABLE `users_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daily_report`
--
ALTER TABLE `daily_report`
  ADD CONSTRAINT `fk_mine` FOREIGN KEY (`mine_no`) REFERENCES `mine` (`id`),
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`role_id`) REFERENCES `users_role` (`id`),
  ADD CONSTRAINT `fk_triptype` FOREIGN KEY (`trip_type`) REFERENCES `trip_type` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_vehicle` FOREIGN KEY (`vehicle`) REFERENCES `vehicles` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_rolename` FOREIGN KEY (`role`) REFERENCES `users_role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
