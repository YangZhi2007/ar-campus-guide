/**
 * 简单的3D模型生成脚本
 * 用于在没有COLMAP的情况下生成基础模型
 */

const fs = require('fs');
const path = require('path');

// 定义点位数据
const spots = [
    {
        id: 'gate',
        name: '校门',
        color: 0x4a6de5,
        dimensions: { width: 20, height: 10, depth: 5 }
    },
    {
        id: 'building',
        name: '主教学楼',
        color: 0x2196f3,
        dimensions: { width: 30, height: 20, depth: 15 }
    },
    {
        id: 'library',
        name: '图书馆',
        color: 0x34a853,
        dimensions: { width: 25, height: 15, depth: 20 }
    },
    {
        id: 'gym',
        name: '体育馆',
        color: 0xff9800,
        dimensions: { width: 40, height: 12, depth: 30 }
    },
    {
        id: 'canteen',
        name: '食堂',
        color: 0xf44336,
        dimensions: { width: 20, height: 8, depth: 15 }
    }
];

// 创建占位符文件
spots.forEach(spot => {
    const modelPath = path.join(__dirname, `${spot.id}.gltf`);

    // 创建一个简单的占位符文件
    // 实际应用中应该生成真实的GLTF文件
    const placeholder = `// 占位符文件 - ${spot.name}
// 实际应用中应该使用COLMAP和Blender生成真实的3D模型
// 模型尺寸: ${spot.dimensions.width} x ${spot.dimensions.height} x ${spot.dimensions.depth}
// 颜色: ${spot.color.toString(16)}
`;

    fs.writeFileSync(modelPath, placeholder);
    console.log(`创建占位符文件: ${modelPath}`);
});

console.log('模型占位符文件创建完成！');
