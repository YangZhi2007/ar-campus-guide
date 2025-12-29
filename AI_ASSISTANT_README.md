
# AI智能问答助手组件

## 功能概述

AI智能问答助手是一个可自由拖动的窗口组件，为用户提供智能问答服务。它包含一个边缘吸附的长竖条和一个迷你窗口，支持文字输入和语音输入两种交互方式。

## 主要特性

1. **边缘吸附长竖条**
   - 尺寸：28px × 80px
   - 位置：屏幕左侧/右侧边缘，距离边缘4px
   - 支持点击展开和长按拖动
   - 滑动浏览时高度缩至20px，静止3秒后透明度降至40%

2. **迷你自由窗口**
   - 尺寸：宽度260px，高度自适应（120px-220px）
   - 磨砂玻璃背景，顶部20px拖动条
   - 包含输入区、快捷问句区、答案区和功能按钮区

3. **交互功能**
   - 点击竖条展开窗口
   - 长按竖条拖动到任意位置
   - 文字输入和语音输入
   - 快捷问句点击
   - 根据问题类型显示相应操作按钮
   - 10秒无操作自动收起

## 文件结构

```
ar-campus-guide/
├── css/
│   └── ai-assistant.css      # AI助手样式文件
├── js/
│   └── ai-assistant.js       # AI助手逻辑文件
└── components/
    └── ai-assistant.html     # AI助手组件引用文件
```

## 使用方法

### 方法一：在HTML页面中直接引入

在需要使用AI助手的页面中，添加以下代码：

```html
<!-- 引入样式和脚本 -->
<link rel="stylesheet" href="./css/ai-assistant.css">
<script src="./js/ai-assistant.js"></script>

<!-- 初始化AI助手 -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    window.aiAssistant = new AIAssistant({
      // 可选配置参数
      barWidth: 28,           // 竖条宽度
      barHeight: 80,          // 竖条高度
      barCollapsedHeight: 20, // 折叠时竖条高度
      barMargin: 4,           // 竖条距离边缘的距离
      windowWidth: 260,       // 窗口宽度
      windowMinHeight: 120,  // 窗口最小高度
      windowMaxHeight: 220,  // 窗口最大高度
      autoHideDelay: 10000   // 无操作自动隐藏延迟（毫秒）
    });
  });
</script>
```

### 方法二：使用组件文件

在页面中引入组件文件：

```html
<!-- 引入AI助手组件 -->
<div id="ai-assistant-container"></div>
<script>
  // 使用fetch加载组件
  fetch('./components/ai-assistant.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('ai-assistant-container').innerHTML = html;
    });
</script>
```

## 配置参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| barWidth | Number | 28 | 竖条宽度 |
| barHeight | Number | 80 | 竖条高度 |
| barCollapsedHeight | Number | 20 | 折叠时竖条高度 |
| barMargin | Number | 4 | 竖条距离边缘的距离 |
| windowWidth | Number | 260 | 窗口宽度 |
| windowMinHeight | Number | 120 | 窗口最小高度 |
| windowMaxHeight | Number | 220 | 窗口最大高度 |
| autoHideDelay | Number | 10000 | 无操作自动隐藏延迟（毫秒） |

## API方法

### 初始化

```javascript
const aiAssistant = new AIAssistant(options);
```

### 显示窗口

```javascript
aiAssistant.showWindow();
```

### 隐藏窗口

```javascript
aiAssistant.hideWindow();
```

### 提交问题

```javascript
aiAssistant.submitQuestion('图书馆几点开？');
```

### 销毁组件

```javascript
aiAssistant.destroy();
```

## 交互流程

1. **平时吸附状态**
   - 竖条贴靠屏幕边缘，低透明度，无操作时静默存在
   - 触发条件：① 点击竖条 ② 长按竖条拖动至屏幕中间

2. **触发展开**
   - 点击展开：快速点击竖条 → 窗口从竖条位置淡入展开
   - 拖动展开：长按竖条 → 拖动至目标位置 → 松手

3. **迷你窗口交互**
   - 语音输入：点击麦克风图标，说话后自动识别
   - 文字输入：点击输入框，输入完成后点击发送
   - 快捷问句：点击快捷标签直接提交问题

4. **收起机制**
   - 手动收起：点击窗口右上角「×」按钮或拖动窗口边缘回到屏幕两侧
   - 自动收起：窗口无操作10秒后或用户切换页面

## 浏览器兼容性

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- IE11: 不支持（需要polyfill）

## 注意事项

1. 语音识别功能需要浏览器支持Web Speech API
2. 磨砂玻璃效果在低版本安卓手机上会降级为纯色背景
3. 组件使用固定定位，确保不会被其他元素遮挡
4. 建议在页面加载完成后初始化组件

## 示例

查看 `index.html` 文件，了解如何在页面中集成AI助手组件。

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 实现边缘吸附竖条和迷你窗口
- 支持文字输入和语音输入
- 支持拖动和自动收起
