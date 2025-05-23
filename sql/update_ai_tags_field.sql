-- 更新ai_tags表结构以支持长描述
USE `3d_modeling_db`;

-- 修改name字段为TEXT类型，支持长描述
ALTER TABLE `ai_tags` 
MODIFY COLUMN `name` TEXT NOT NULL;

-- 删除原有的唯一索引（因为TEXT字段不能完全建立唯一索引）
DROP INDEX `unique_name` ON `ai_tags`;

-- 为TEXT字段创建前缀索引（取前255个字符）
CREATE INDEX `idx_name_prefix` ON `ai_tags` (`name`(255));

-- 显示修改后的表结构
DESCRIBE `ai_tags`; 