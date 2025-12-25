const fs = require('fs');
const path = require('path');

// 读取JSON文件
console.log('正在读取JSON文件...');
const jsonPath = path.join(__dirname, '全国高等学校名单.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(jsonData);

console.log(`成功读取 ${data.length} 条数据`);

// 创建JS文件内容
const jsContent = `/**
 * 全国高等学校名单数据
 * 数据来源：全国高等学校名单.json
 * 更新时间：2025年6月20日
 * 
 * 此文件包含全国所有普通高等学校的数据
 */

const nationalUniversitiesRawData = ${JSON.stringify(data, null, 2)};
`;

// 写入JS文件
const jsPath = path.join(__dirname, 'js', 'national-universities-data.js');
fs.writeFileSync(jsPath, jsContent, 'utf8');

console.log('转换完成！');
console.log(`文件已保存到: ${jsPath}`);
console.log(`共转换 ${data.length} 条学校数据`);
