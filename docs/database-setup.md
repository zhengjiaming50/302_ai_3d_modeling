# MySQL数据库安装与配置指南

本文档将指导您如何安装MySQL和MySQL Workbench 8.0 CE图形化工具，以支持3D建模系统对比分析功能。

## 安装MySQL与MySQL Workbench

### Windows系统

1. 访问MySQL官方网站 [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/) 下载MySQL安装程序
2. 运行安装程序，选择"Custom"安装类型
3. 重点选择安装以下组件：
   - MySQL Server 8.0.x
   - **MySQL Workbench 8.0 CE** (图形化管理工具)
4. 安装过程中，设置root用户密码（请记住此密码）
5. 完成安装并确保MySQL服务已启动

## 使用MySQL Workbench创建数据库

1. 启动MySQL Workbench 8.0 CE
2. 在主页面点击已创建的本地连接(通常命名为"Local instance MySQL80")
3. 输入您在安装时设置的root密码

### 创建数据库

1. 在查询编辑器中执行以下SQL语句创建数据库：
   ```sql
   CREATE DATABASE ai_3d_modeling CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
   点击闪电图标执行该语句

2. 在导航器的"SCHEMAS"面板中右键点击并选择"Refresh All"，您将看到新创建的`ai_3d_modeling`数据库

### 创建数据库用户（可选，推荐用于生产环境）

1. 在左侧导航器中展开"Administration"，点击"Users and Privileges"
2. 点击"Add Account"按钮
3. 设置以下信息：
   - Login Name: `ai_3d_user`
   - Authentication Type: `Standard`
   - Limit to Hosts Matching: `localhost`
   - Password: 输入安全密码
4. 切换到"Schema Privileges"选项卡
5. 点击"Add Entry..."，选择"Selected schema"并选择`ai_3d_modeling`
6. 勾选"ALL"权限，然后点击"Apply"

## 导入数据库表结构

1. 在Workbench中，确保已选择`ai_3d_modeling`数据库(在SCHEMAS列表中双击)
2. 选择菜单 File > Open SQL Script...
3. 浏览并选择项目中的`sql/schema.sql`文件
4. 点击查询编辑器工具栏中的闪电图标(Execute)执行整个脚本
5. 脚本执行完成后，在导航器的"SCHEMAS"面板中展开`ai_3d_modeling`数据库和"Tables"节点，确认所有表都已创建

## 配置项目环境

1. 在项目根目录创建`.env.local`文件（如果不存在）

2. 添加以下数据库配置：
   ```
   DB_HOST=localhost
   DB_USER=root   # 或使用您创建的用户名
   DB_PASSWORD=your_password
   DB_NAME=ai_3d_modeling
   ```

## 验证数据库结构

1. 在MySQL Workbench中，展开`ai_3d_modeling`数据库和"Tables"节点
2. 应该看到以下表：
   - images
   - models
   - ai_tags
   - ai_tag_images
   - image_tags
   - comparisons
3. 可以右键点击任意表，选择"Table Inspector"查看表结构
4. 或选择"Select Rows - Limit 1000"查看表数据

## 使用Workbench管理数据

MySQL Workbench提供了丰富的功能来管理您的数据库：

1. **编辑数据**：右键点击表并选择"Select Rows"可以浏览和编辑数据
2. **创建关系图**：选择Database > Reverse Engineer可以生成数据库ER图
3. **导出数据**：右键点击表，选择"Table Data Export Wizard"导出数据
4. **导入数据**：右键点击表，选择"Table Data Import Wizard"导入数据
5. **执行查询**：使用查询编辑器执行自定义SQL查询

## 故障排除

1. 如果无法连接到MySQL服务器：
   - 确认MySQL服务是否正在运行(在Windows服务管理中查看)
   - 检查Workbench连接设置中的主机名和端口(默认为localhost:3306)

2. 如果表创建失败：
   - 检查SQL脚本是否有语法错误
   - 确认您有足够的权限创建表
   - 查看Workbench输出面板中的错误信息

3. 如果遇到字符集或排序规则问题：
   - 确保在创建数据库时使用了`CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci` 