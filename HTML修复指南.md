# HTML文件转义错误修复指南

本指南列出了项目中发现的HTML转义错误及其修复方法。

## 需要修复的文件及错误位置

### 1. index.html
**错误位置：**
- 第227行：`window.location.href='ar-navigation.html?spot=gate'`
- 第228行：`window.location.href='vr-panorama.html?spot=gate'`
- 第237行：`window.location.href='ar-navigation.html?spot=building'`
- 第238行：`window.location.href='vr-panorama.html?spot=building'`
- 第247行：`window.location.href='ar-navigation.html?spot=library'`
- 第248行：`window.location.href='vr-panorama.html?spot=library'`

**修复方法：**
将所有`window.location.href='xxx'`修改为`window.location.href='xxx'`

### 2. school-category.html
**错误位置：**
- 第14行：`window.location.href='index.html"`

**修复方法：**
将`window.location.href='index.html"`修改为`window.location.href='index.html'`

### 3. user-center.html
**错误位置：**
- 第31行：`window.location.href='login.html"`
- 第64行：`window.location.href='my-questions.html"`
- 第73行：`window.location.href='my-answers.html"`
- 第82行：`window.location.href='my-favorites.html"`
- 第91行：`window.location.href='settings.html"`

**修复方法：**
将所有`window.location.href='xxx"`修改为`window.location.href='xxx'`

### 4. forum.html
**错误位置：**
- 第23行：`window.location.href='forum-publish.html"`

**修复方法：**
将`window.location.href='forum-publish.html"`修改为`window.location.href='forum-publish.html'`

## 通用修复建议

1. 在onclick属性中使用单引号时，确保正确闭合
2. 推荐使用双引号包裹整个onclick属性值，内部使用单引号
3. 例如：`onclick="window.location.href='page.html'"`

## 测试步骤

1. 修复所有转义错误
2. 按项目结构摆放好所有文件
3. 用VS Code打开项目根目录（ar-campus-guide）
4. 安装VS Code插件「Live Server」
5. 右键点击splash.html → 「Open with Live Server」
6. 依次测试：
   - 启动页→登录→首页（看图片是否加载）
   - VR/AR页面（看地图是否加载，允许摄像头权限）