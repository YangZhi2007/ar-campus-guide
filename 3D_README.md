# 3D校园导览页面使用说明

## 功能介绍
3D校园导览页面是进阶级方案的核心功能，通过Three.js加载3D模型，实现校园的交互式浏览。

## 技术实现
- 前端：Three.js加载GLTF模型，实现视角旋转、缩放和交互
- 后端：Node.js+Express提供点位和模型数据API

## 使用步骤
1. 启动后端服务器：
   ```bash
   cd ar-campus-backend
   npm install
   npm start
   ```

2. 准备3D模型：
   - 使用COLMAP从照片生成点云
   - 使用Blender简化模型并导出GLTF格式
   - 将模型文件放入assets/models文件夹

3. 下载Three.js库：
   - 从 https://threejs.org/ 下载three.min.js
   - 下载GLTFLoader.js、OrbitControls.js、DragControls.js
   - 将所有库文件放入assets/lib文件夹

4. 访问3D页面：
   - 在浏览器中打开3d-page.html
   - 页面会自动加载所有3D模型

## 交互功能
- 鼠标拖拽：旋转视角
- 滚轮：缩放场景
- 点击模型：显示点位信息
- 自动旋转：开启/关闭自动旋转
- 重置视角：回到初始视角
- 线框模式：切换模型显示模式

## 注意事项
- 确保后端服务器运行在3000端口
- 模型文件大小控制在5MB以内
- 模型面数控制在5000以内
- 使用LOD优化提高性能
