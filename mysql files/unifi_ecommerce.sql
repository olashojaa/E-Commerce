-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 01:00 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unifi_ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `carousels`
--

CREATE TABLE `carousels` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `Img` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carousels`
--

INSERT INTO `carousels` (`id`, `product_id`, `Img`, `created_at`) VALUES
(7, 21, 'http://localhost:8080/uploads/1701069399_ceaff0a4d81684f00b21.jpg', '2023-11-26 21:00:00'),
(8, 22, 'http://localhost:8080/uploads/1701069392_4da38bee78b79f1d59e1.jpg', '2023-11-26 21:00:00'),
(9, 24, 'http://localhost:8080/uploads/1701069799_ebf3c8b814f4f73175a3.webp', '2023-11-26 21:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `is_top` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `is_top`, `created_at`, `updated_at`) VALUES
(1, 'Electronic Device', 0, '0000-00-00 00:00:00', '2023-11-27 04:17:17'),
(2, 'Man Clothes', 0, '0000-00-00 00:00:00', '2023-11-27 04:17:22'),
(4, 'Child Toys', 1, '2023-11-23 16:27:17', '2023-11-27 04:23:31'),
(6, 'watches', 1, '2023-11-23 16:52:08', '2023-11-23 16:52:08');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `gaurd_name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `gaurd_name`, `created_at`) VALUES
(1, 'Update Carousel', '_CarouselUpdateComponent', '2023-11-24 21:00:00'),
(2, 'View Admin', '_AdminListComponent', '2023-11-24 21:00:00'),
(3, 'Add Admin', '_AdminAddComponent', '2023-11-24 21:00:00'),
(4, 'Update Admin', '_AdminUpdateComponent', '2023-11-24 21:00:00'),
(5, 'View Roles', '_RoleListComponent', '2023-11-24 21:00:00'),
(6, 'Add Role', '_RoleAddComponent', '2023-11-24 21:00:00'),
(7, 'Update Role', '_RoleUpdateComponent', '2023-11-24 21:00:00'),
(9, 'Add Carousel', '_CarouselAddComponent', '2023-11-25 21:00:00'),
(10, 'View Carousel', '_CarouselListComponent', '2023-11-25 21:00:00'),
(11, 'View Permission', '_PermissionListComponent', '2023-11-25 21:00:00'),
(12, 'Add Permission', '_PermissionAddComponent', '2023-11-25 21:00:00'),
(13, 'Update Permission', '_PermissionUpdateComponent', '2023-11-25 21:00:00'),
(14, 'View Products', '_ProductListComponent', '2023-11-25 21:00:00'),
(15, 'Add Product', '_ProductAddComponent', '2023-11-25 21:00:00'),
(16, 'Update Product', '_ProductUpdateComponent', '2023-11-25 21:00:00'),
(17, 'View Category', '_CategoryListComponent', '2023-11-25 21:00:00'),
(18, 'Add Category', '_CategoryAddComponent', '2023-11-25 21:00:00'),
(19, 'Update Category', '_CategoryUpdateComponent', '2023-11-25 21:00:00'),
(20, 'View Dashboard', '_DashboardComponent', '2023-11-25 21:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `short_description` varchar(500) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `Img` varchar(255) DEFAULT NULL,
  `is_top` tinyint(1) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `short_description`, `description`, `price`, `stock`, `Img`, `is_top`, `category_id`, `created_at`) VALUES
(21, 'Watch1', 'Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes', '<p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Brand</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Apple</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Style</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Trail</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">StrapColou</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">r: Yellow/beige</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Special feature</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: GPS</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Shape</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Rond</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Target audience</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Mannen</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Compatible devices</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Tablet, Smartphone</span></span></p><p></p><h1 style=\"text-align:start\"><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">About this item</span></span></h1><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">49 mm case made of high-quality titanium: robust, rust-resistant yet lightweight</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">The largest and brightest Apple Watch display for better readability in all conditions</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Up to 36 hours of battery life under normal use and an energy saving mode for even longer battery life</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Accurate dual-frequency GPS precisely determines your location for calculating distances, pace and routes</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Water resistant to 100 meters deep</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Much wider temperature range when wearing, for use in the harshest conditions</span></span></p></li></ul><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">With the adjustable action button, you can mark a waypoint, enable backtrack, start a new segment of your workout, turn on the flashlight, and more</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Advanced safety features including siren, backtrack, fall detection, SOS emergency notification and crash detection</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Improved Workout app with new metrics, new views and advanced ways to train</span></span></p></li></ul>', '450', 10, 'http://localhost:8080/uploads/1701068651_592beadaf4f361b9ff69.jpg', 1, 6, '2023-11-26 21:00:00'),
(22, 'watch2', 'Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes', '<p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Brand</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Apple</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Style</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Trail</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">StrapColou</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">r: Yellow/beige</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Special feature</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: GPS</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Shape</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Rond</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Target audience</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Mannen</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Compatible devices</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Tablet, Smartphone</span></span></p><p></p><h1 style=\"text-align:start\"><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">About this item</span></span></h1><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">49 mm case made of high-quality titanium: robust, rust-resistant yet lightweight</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">The largest and brightest Apple Watch display for better readability in all conditions</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Up to 36 hours of battery life under normal use and an energy saving mode for even longer battery life</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Accurate dual-frequency GPS precisely determines your location for calculating distances, pace and routes</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Water resistant to 100 meters deep</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Much wider temperature range when wearing, for use in the harshest conditions</span></span></p></li></ul><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">With the adjustable action button, you can mark a waypoint, enable backtrack, start a new segment of your workout, turn on the flashlight, and more</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Advanced safety features including siren, backtrack, fall detection, SOS emergency notification and crash detection</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Improved Workout app with new metrics, new views and advanced ways to train</span></span></p></li></ul>', '550', 44, 'http://localhost:8080/uploads/1701068905_89b8db3603e7a12a9a12.jpg', 1, 6, '2023-11-26 21:00:00'),
(23, 'watch 3', 'Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes', '<p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Brand</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Apple</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Style</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Trail</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">StrapColou</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">r: Yellow/beige</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Special feature</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: GPS</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Shape</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Rond</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Target audience</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Mannen</span></span></p><p><strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Compatible devices</span></span></strong><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">: Tablet, Smartphone</span></span></p><p></p><h1 style=\"text-align:start\"><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">About this item</span></span></h1><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">49 mm case made of high-quality titanium: robust, rust-resistant yet lightweight</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">The largest and brightest Apple Watch display for better readability in all conditions</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Up to 36 hours of battery life under normal use and an energy saving mode for even longer battery life</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Accurate dual-frequency GPS precisely determines your location for calculating distances, pace and routes</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Water resistant to 100 meters deep</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Much wider temperature range when wearing, for use in the harshest conditions</span></span></p></li></ul><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">With the adjustable action button, you can mark a waypoint, enable backtrack, start a new segment of your workout, turn on the flashlight, and more</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Advanced safety features including siren, backtrack, fall detection, SOS emergency notification and crash detection</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Improved Workout app with new metrics, new views and advanced ways to train</span></span></p></li></ul>', '330', 33, 'http://localhost:8080/uploads/1701069020_5125dec57fb8048d6c0f.webp', 1, 6, '2023-11-26 21:00:00'),
(24, 'Toy1', 'Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes', '<h1 style=\"text-align:start\"><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">About this item</span></span></h1><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">This educational toy includes LEGO DUPLO firefighter and cat figures, plus a DIY tree and multifunctional fire engine toy with flashing lights and siren (batteries included)</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Toddlers aged 2+ can push the handle and turn it to raise and turn the tray so they can make an attempt to save the cat</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">When children have rescued the toy cat animal figure, they can feed the animal some treats with the snack accessories with this set, and they can use the fire hose to give the cat some \'water\'</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">As they use their imagination and come up with rescue stories themselves, little heroes develop their fine motor skills and social and emotional intelligence</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Through a fun comic strip based on the playset, children are easily introduced to creative building and imaginative play</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">This educational truck and fire engine toy is a great gift idea for toddlers aged 2 and up who love vehicles and cute toy animal figures - surprise them with this fun building set for their birthday or any other occasion</span></span></p></li></ul>', '32', 11, 'http://localhost:8080/uploads/1701069742_048029a09478e94c370f.webp', 1, 4, '2023-11-26 21:00:00'),
(25, 'Toy2', 'Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes', '<h1 style=\"text-align:start\"><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">About this item</span></span></h1><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">This educational toy includes LEGO DUPLO firefighter and cat figures, plus a DIY tree and multifunctional fire engine toy with flashing lights and siren (batteries included)</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Toddlers aged 2+ can push the handle and turn it to raise and turn the tray so they can make an attempt to save the cat</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">When children have rescued the toy cat animal figure, they can feed the animal some treats with the snack accessories with this set, and they can use the fire hose to give the cat some \'water\'</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">As they use their imagination and come up with rescue stories themselves, little heroes develop their fine motor skills and social and emotional intelligence</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Through a fun comic strip based on the playset, children are easily introduced to creative building and imaginative play</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">This educational truck and fire engine toy is a great gift idea for toddlers aged 2 and up who love vehicles and cute toy animal figures - surprise them with this fun building set for their birthday or any other occasion</span></span></p></li></ul>', '322', 23, 'http://localhost:8080/uploads/1701069763_d8d630e061aedd840fae.jpg', 1, 4, '2023-11-26 21:00:00'),
(26, 'Toy3', 'Specially developed features and sensors and three new straps for outdoor enthusiasts, adventurers and endurance athletes', '<h1 style=\"text-align:start\"><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">About this item</span></span></h1><ul><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">This educational toy includes LEGO DUPLO firefighter and cat figures, plus a DIY tree and multifunctional fire engine toy with flashing lights and siren (batteries included)</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Toddlers aged 2+ can push the handle and turn it to raise and turn the tray so they can make an attempt to save the cat</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">When children have rescued the toy cat animal figure, they can feed the animal some treats with the snack accessories with this set, and they can use the fire hose to give the cat some \'water\'</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">As they use their imagination and come up with rescue stories themselves, little heroes develop their fine motor skills and social and emotional intelligence</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">Through a fun comic strip based on the playset, children are easily introduced to creative building and imaginative play</span></span></p></li><li><p><span style=\"color:rgb(15, 17, 17);\"><span style=\"background-color:rgb(255, 255, 255);\">This educational truck and fire engine toy is a great gift idea for toddlers aged 2 and up who love vehicles and cute toy animal figures - surprise them with this fun building set for their birthday or any other occasion</span></span></p></li></ul>', '3432', 422, 'http://localhost:8080/uploads/1701069785_28feb97591d556891359.webp', 1, 4, '2023-11-26 21:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`) VALUES
(14, 'Category Admin', '2023-11-25 21:00:00'),
(15, 'Super Admin', '2023-11-25 21:00:00'),
(16, 'Product Manager', '2023-11-26 21:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `role_id`, `permission_id`, `created_at`) VALUES
(31, 15, 1, '2023-11-25 21:00:00'),
(32, 15, 2, '2023-11-25 21:00:00'),
(33, 15, 3, '2023-11-25 21:00:00'),
(34, 15, 4, '2023-11-25 21:00:00'),
(35, 15, 5, '2023-11-25 21:00:00'),
(36, 15, 6, '2023-11-25 21:00:00'),
(37, 15, 7, '2023-11-25 21:00:00'),
(38, 15, 9, '2023-11-25 21:00:00'),
(39, 15, 10, '2023-11-25 21:00:00'),
(40, 15, 11, '2023-11-25 21:00:00'),
(41, 15, 12, '2023-11-25 21:00:00'),
(42, 15, 13, '2023-11-25 21:00:00'),
(43, 15, 14, '2023-11-25 21:00:00'),
(44, 15, 15, '2023-11-25 21:00:00'),
(45, 15, 16, '2023-11-25 21:00:00'),
(46, 15, 17, '2023-11-25 21:00:00'),
(47, 15, 18, '2023-11-25 21:00:00'),
(48, 15, 19, '2023-11-25 21:00:00'),
(49, 15, 20, '2023-11-25 21:00:00'),
(50, 16, 14, '2023-11-26 21:00:00'),
(51, 16, 15, '2023-11-26 21:00:00'),
(52, 16, 16, '2023-11-26 21:00:00'),
(61, 14, 17, '2023-11-26 21:00:00'),
(62, 14, 18, '2023-11-26 21:00:00'),
(63, 14, 19, '2023-11-26 21:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curdate(),
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`, `role_id`) VALUES
(3, 'admin', '$2y$10$vdgzEF4K56Kwh7eEhoDrg.V.eDWRoMGhwsysejukmRn/Wn0xQRKIC', 'ola.shojaa.1@gmail.com', '2023-11-25 21:00:00', 14),
(4, 'unifi', '$2y$10$aUMt8AokGOHiLz1ZE/z2he1rq.BIFC.AKKLG58wUgGDKvE/mfjjqO', 'olashojaa3@gmail.com', '2023-11-25 21:00:00', 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `carousels`
--
ALTER TABLE `carousels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carousels`
--
ALTER TABLE `carousels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `carousels`
--
ALTER TABLE `carousels`
  ADD CONSTRAINT `carousels_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
