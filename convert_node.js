const fs = require('fs');

// 读取JSON文件
console.log('正在读取JSON文件...');
const jsonData = fs.readFileSync('全国高等学校名单.json', 'utf-8');
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
console.log('正在写入JS文件...');
fs.writeFileSync('js/national-universities-data.js', jsContent, 'utf-8');
console.log('转换完成！');