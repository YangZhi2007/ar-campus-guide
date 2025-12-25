# AR/VR校园导览项目指南

## 项目概述

本项目是一个基于AR/VR技术的校园导览系统，支持全景漫游和AR标记识别，纯前端实现，无需后端，易出效果。

## 技术栈

- 前端：HTML5, CSS3, JavaScript, A-Frame, AR.js
- 工具：HBuilderX, VSCode

## 项目结构

```
ar-campus-guide/
├── index.html              // 核心首页（导航入口）
├── school-category.html     // 学校分类页面
├── school-detail.html       // 学校详情页面
├── forum.html             // 问答论坛页面
├── forum-publish.html      // 发布问题页面
├── forum-detail.html      // 问题详情页面
├── login.html            // 登录页面
├── user-center.html       // 用户中心页面
├── settings.html          // 设置页面
├── my-questions.html     // 我的提问页面
├── my-answers.html       // 我的回答页面
├── my-favorites.html     // 我的收藏页面
├── ar-navigation.html      // AR导航页面
├── vr-panorama.html      // VR全景漫游页面
├── splash.html            // 启动页面
├── convert_improved.html   // 数据转换工具
├── assets/               // 资源文件夹
│   ├── banner/          // 轮播图
│   ├── icon/            // 图标
│   ├── info/            // 点位介绍
│   ├── marker/          // AR标记图
│   ├── models/          // 3D模型
│   ├── panorama/        // 全景图
│   └── school/          // 学校图片
├── components/           // 组件文件夹
│   └── footer-nav.html   // 统一底部导航栏
├── css/                 // 样式文件夹
│   ├── global.css       // 全局样式
│   ├── index.css        // 首页样式
│   ├── school.css       // 学校相关样式
│   ├── forum.css        // 论坛样式
│   ├── login.css        // 登录样式
│   ├── search.css       // 搜索样式
│   ├── settings.css     // 设置样式
│   ├── user-center.css  // 用户中心样式
│   └── splash.css       // 启动页样式
└── js/                  // JavaScript文件夹
    ├── banner.js        // 轮播图脚本
    ├── school-data.js    // 学校数据
    ├── national-universities-data.js    // 全国高校数据
    ├── national-universities-loader-optimized.js  // 数据加载器
    ├── school.js        // 学校页面脚本
    ├── forum.js        // 论坛脚本
    ├── login.js        // 登录脚本
    ├── search.js       // 搜索脚本
    ├── settings.js     // 设置脚本
    ├── theme.js        // 主题切换脚本
    ├── user-center.js  // 用户中心脚本
    ├── navigation.js    // 导航脚本
    └── my-*.js        // 用户中心相关脚本
```

## 功能模块

### 1. 启动模块
- ✅ APP启动加载动画
- ✅ 应用功能介绍（3页轮播）
- ✅ 滑动/点击切换功能

### 2. 登录模块
- ✅ 首页访问拦截
- ✅ 账号密码登录
- ✅ 密码显示/隐藏切换
- ✅ 本地登录状态持久化

### 3. 首页模块
- ✅ 热门学校轮播图（自动+手动切换）
- ✅ 核心细分板块
- ✅ 全国学校分类内置AR/VR功能入口

### 4. 导航模块
- ✅ 顶部导航栏（logo+搜索框+暗夜模式切换按钮）
- ✅ 底部导航栏（首页、学校、论坛、我的）
- ✅ 当前页面高亮

### 5. 主题切换
- ✅ 默认简约蓝白模式
- ✅ 暗夜模式一键切换
- ✅ 全页面样式同步适配

### 6. 学校分类模块
- ✅ 按地区筛选
- ✅ 按类型筛选
- ✅ 学校列表展示
- ✅ 学校详情查看

### 7. AR/VR功能
- ✅ AR导航页面
- ✅ VR全景漫游页面
- ✅ 标记识别和导航

### 8. 论坛模块
- ✅ 问题列表展示
- ✅ 问题发布
- ✅ 问题详情查看
- ✅ 回答列表展示

### 9. 用户中心模块
- ✅ 个人信息展示/编辑
- ✅ 我的提问列表
- ✅ 我的回答列表
- ✅ 我的收藏列表
- ✅ 设置页面

## 数据管理

### 全国高校数据
- 数据来源：全国高等学校名单.json
- 数据文件：js/national-universities-data.js
- 数据加载器：js/national-universities-loader-optimized.js
- 使用convert_improved.html工具进行数据转换

### 学校数据
- 示例数据：js/school-data.js
- 包含部分重点学校详细信息

## 开发规范

### 代码规范
- 使用2空格缩进
- 使用JSDoc风格注释
- 变量使用驼峰命名法
- 函数名使用动词+名词形式

### 文件命名规范
- HTML文件：使用小写字母和连字符（如school-category.html）
- CSS文件：使用小写字母和连字符（如school-category.css）
- JS文件：使用小写字母和连字符（如school-category.js）

### 样式规范
- 使用BEM命名法（块__元素--修饰符）
- 避免使用!important
- 使用CSS变量定义主题色

## 使用说明

### 环境准备
1. 安装VS Code插件「Live Server」
2. 确保所有资源文件已正确放置在assets目录中
3. 在浏览器中允许摄像头权限

### 启动项目
1. 双击运行start-final.bat
2. 在浏览器中访问 http://localhost:8080

### 数据转换
1. 在浏览器中打开convert_improved.html
2. 上传全国高等学校名单.json文件
3. 点击"开始转换"按钮
4. 下载生成的national-universities-data.js文件
5. 将下载的文件保存到js/目录中

### 测试
1. 测试所有页面功能是否正常
2. 测试AR/VR功能是否可用
3. 测试主题切换是否正常
4. 测试响应式设计

## 注意事项

1. 所有AR/VR页面需要使用本地服务器打开，避免跨域问题
2. 确保所有资源文件已正确放置在assets目录中
3. 测试时请允许浏览器访问摄像头权限
4. 建议使用Chrome浏览器进行测试
5. 修改代码后请刷新浏览器查看效果

## 常见问题

**Q: 如何添加新的学校数据？**
A: 使用convert_improved.html工具转换全国高等学校名单.json，然后保存到js/national-universities-data.js

**Q: 如何修改页面样式？**
A: 编辑对应的CSS文件，修改样式后刷新浏览器即可

**Q: 如何添加新功能？**
A: 在对应的HTML文件中添加HTML结构，在对应的JS文件中添加逻辑

**Q: 如何调试问题？**
A: 使用浏览器开发者工具（F12）查看控制台输出和网络请求

## 更新日志

### 2025-06-25
- 优化项目结构
- 删除冗余文件
- 创建统一项目文档
- 完善代码规范
