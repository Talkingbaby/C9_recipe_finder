-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Sep 01, 2016 at 01:53 AM
-- Server version: 5.5.49-log
-- PHP Version: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipefinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE IF NOT EXISTS `equipment` (
  `id` int(10) NOT NULL COMMENT 'primary key',
  `name` varchar(20) NOT NULL,
  `image` varchar(50) NOT NULL,
  `recipe_master_id` int(10) NOT NULL,
  `recipe_steps_id` int(10) DEFAULT NULL,
  `spoonacular_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT 'ingredient name',
  `image` varchar(50) NOT NULL COMMENT 'image link',
  `recipe_steps_id` varchar(45) DEFAULT NULL,
  `spoonacular_id` int(10) DEFAULT NULL,
  `amount` int(3) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_master`
--

CREATE TABLE IF NOT EXISTS `recipe_master` (
  `id` int(10) unsigned NOT NULL COMMENT 'primary key',
  `source` enum('spoonacular','yummly','recipefinder') NOT NULL COMMENT 'api or recipefinder db',
  `spoonacular_recipe_id` int(8) DEFAULT NULL COMMENT 'recipe id of source table',
  `tags` varchar(45) NOT NULL COMMENT 'comma separated query terms',
  `ready_in_minutes` int(3) DEFAULT NULL,
  `ingredient_count` int(3) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `dietary_concerns` varchar(90) DEFAULT NULL,
  `image_baseuri` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `recipe_type` varchar(45) DEFAULT NULL,
  `credit_text` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recipe_master`
--

INSERT INTO `recipe_master` (`id`, `source`, `spoonacular_recipe_id`, `tags`, `ready_in_minutes`, `ingredient_count`, `title`, `dietary_concerns`, `image_baseuri`, `image`, `recipe_type`, `credit_text`) VALUES
(1, 'spoonacular', 660109, 'vegan', 45, 9, 'Simple lentil soup', 'vegetarian, vegan, glutenFree, dairyFree, veryHealthy', 'https://spoonacular.com/recipeImages/', 'Simple-lentil-soup-660109.jpg', 'main course', 'Foodista.com – The Cooking Encyclopedia Every');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_steps`
--

CREATE TABLE IF NOT EXISTS `recipe_steps` (
  `id` int(10) NOT NULL COMMENT 'primary key',
  `recipe_master_id` int(10) NOT NULL COMMENT 'foreign key to recipe_master',
  `step_number` int(3) NOT NULL,
  `step_instruction` text NOT NULL COMMENT 'step text'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recipe_steps`
--

INSERT INTO `recipe_steps` (`id`, `recipe_master_id`, `step_number`, `step_instruction`) VALUES
(1, 1, 1, 'Optional sort your lentils to make sure there arent any small stones left. Rinse the lentils and let them soak for a couple of hours in lukewarm water before cooking.Put all the ingredients together in a saucepan and cook for 45mn to 1 hour over medium heat, until the lentils are cooked.If you use a pressure cooker, the soup will be ready in 20 minutes.I serve mine with a handful of plum black olives, such as Volos.Find more recipes on my blog httpalalemon.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_master_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_master`
--
ALTER TABLE `recipe_master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`spoonacular_recipe_id`);

--
-- Indexes for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_master_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'primary key';
--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `recipe_master`
--
ALTER TABLE `recipe_master`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `recipe_steps`
--
ALTER TABLE `recipe_steps`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'primary key',AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
