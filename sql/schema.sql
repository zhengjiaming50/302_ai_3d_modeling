-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS `3d_modeling_db`;
USE `3d_modeling_db`;

-- 图片表
CREATE TABLE IF NOT EXISTS `images` (
  `id` VARCHAR(36) NOT NULL,
  `file_name` VARCHAR(255) NOT NULL,
  `file_url` TEXT NOT NULL,
  `mime_type` VARCHAR(100) DEFAULT 'image/png',
  `size` INT UNSIGNED,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 模型表
CREATE TABLE IF NOT EXISTS `models` (
  `id` VARCHAR(36) NOT NULL,
  `file_name` VARCHAR(255) NOT NULL,
  `file_url` TEXT NOT NULL,
  `local_file_path` VARCHAR(500) DEFAULT NULL,
  `format` VARCHAR(50) DEFAULT 'glb',
  `size` INT UNSIGNED,
  `parameters` TEXT,
  `image_id` VARCHAR(36),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- AI标签表
CREATE TABLE IF NOT EXISTS `ai_tags` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `category` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 图片-标签关联表
CREATE TABLE IF NOT EXISTS `ai_tag_images` (
  `id` VARCHAR(36) NOT NULL,
  `image_id` VARCHAR(36) NOT NULL,
  `tag_id` VARCHAR(36) NOT NULL,
  `confidence` FLOAT DEFAULT 0.0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_image_tag` (`image_id`, `tag_id`),
  FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES `ai_tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 自定义图片标签表
CREATE TABLE IF NOT EXISTS `image_tags` (
  `id` VARCHAR(36) NOT NULL,
  `image_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 图片对比结果表
CREATE TABLE IF NOT EXISTS `comparisons` (
  `id` VARCHAR(36) NOT NULL,
  `uploaded_image_id` VARCHAR(36) NOT NULL,
  `matched_model_id` VARCHAR(36) NOT NULL,
  `similarity_score` FLOAT DEFAULT 0.0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`uploaded_image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`matched_model_id`) REFERENCES `models` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 