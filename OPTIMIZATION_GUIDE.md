# 项目优化指南

本文档列出了在不影响项目正常运行的情况下，可以删除的文件以减少打包大小。

## 1. 删除重复的注册页面文件

项目中存在多个注册页面文件，但只有register.html被实际引用：
- [x] 保留: register.html (被login.html引用)
- [ ] 删除: register_final.html
- [ ] 删除: register_fixed.html
- [ ] 删除: register_new.html
- [ ] 删除: register_simple.html
- [ ] 删除: register_text.html

## 2. 删除重复的convert文件

项目中存在两个convert文件，但只有convert_improved.html在文档中被推荐使用：
- [ ] 删除: convert.html
- [x] 保留: convert_improved.html (在PROJECT_GUIDE.md中被推荐使用)

## 3. 删除重复的全国高校数据加载器

项目中存在两个全国高校数据加载器，已统一使用优化版本：
- [x] 保留: national-universities-loader-optimized.js (已被ar-page.html, school-category.html, school-detail.html引用)
- [ ] 删除: national-universities-loader.js (已无引用)

## 4. 删除不必要的文档文件

以下文档文件不会影响app的功能，但在打包时可以考虑排除：
- [ ] 删除: 3D_README.md
- [ ] 删除: HTML修复指南.md
- [x] 保留: PROJECT_GUIDE.md (包含项目重要信息)
- [x] 保留: README.md (项目主要说明文档)
- [ ] 删除: SCHOOL_DATA_README.md
- [ ] 删除: 项目开发指南.md

## 5. 删除开发工具文件

以下文件可能是开发工具，在生产环境中不需要：
- [ ] 删除: convert.js
- [ ] 删除: convert_node.js
- [ ] 删除: server-v2.ps1
- [ ] 删除: start-final.bat

## 6. 删除未使用的资源文件

- [ ] 检查并删除: images/logo.png (文件大小为0B，可能是空文件)
- [ ] 检查并删除: assets目录下未使用的资源文件

## 注意事项

1. 在删除任何文件之前，请确保已备份项目
2. 删除文件后，请测试项目所有功能是否正常运行
3. 如果使用版本控制系统(如Git)，建议在删除前创建一个新分支

## 优化效果预估

删除上述文件后，预计可以减少约1-2MB的项目大小，具体取决于实际删除的文件数量和大小。
