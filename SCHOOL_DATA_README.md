# 学校数据使用指南

## 概述

本项目使用全国高等学校名单数据来支持学校分类和搜索功能。数据存储在`js/school-data.js`文件中。

## 数据结构

### 学校数据结构

```javascript
{
    id: 'school_id',           // 学校唯一标识
    name: '学校名称',          // 学校名称
    location: '详细地址',      // 学校详细地址
    province: '省份',         // 所在省份
    city: '城市',             // 所在城市
    type: '985',              // 学校类型（985/211/双一流/普通本科/高职高专）
    level: '本科',            // 学历层次（本科/专科）
    tags: ['985', '211'],     // 学校标签
    description: '学校简介',   // 学校描述
    stats: {
        students: '3万+',     // 学生人数
        teachers: '3000+',    // 教师人数
        area: '270万㎡'       // 校园面积
    },
    facilities: [             // 学校设施
        {
            id: 'library',
            name: '图书馆',
            icon: './assets/icon/library.png'
        }
    ]
}
```

## Excel文件转换

### 方法一：使用在线工具

1. 访问在线Excel转JSON工具，如：
   - https://beautifytools.com/excel-to-json-converter.php
   - https://products.aspose.app/cells/zh/conversion/excel-to-json

2. 上传`全国高等学校名单.xls`文件

3. 转换后下载JSON文件

4. 将JSON数据格式化为项目所需的数据结构

### 方法二：使用Python脚本

```python
import pandas as pd
import json

# 读取Excel文件
df = pd.read_excel('全国高等学校名单.xls')

# 转换为JSON
data = df.to_dict('records')

# 保存为JSON文件
with open('school-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
```

### 方法三：使用Node.js脚本

```javascript
const xlsx = require('xlsx');
const fs = require('fs');

// 读取Excel文件
const workbook = xlsx.readFile('全国高等学校名单.xls');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 转换为JSON
const data = xlsx.utils.sheet_to_json(worksheet);

// 保存为JSON文件
fs.writeFileSync('school-data.json', JSON.stringify(data, null, 2), 'utf-8');
```

## 数据格式化

将Excel数据转换为项目所需格式：

```javascript
// 原始Excel数据示例
{
    "学校名称": "北京大学",
    "所在地": "北京市海淀区",
    "办学层次": "本科",
    "学校类型": "985工程"
}

// 转换后格式
{
    id: 'peking',
    name: '北京大学',
    location: '北京市海淀区',
    province: '北京',
    city: '北京',
    type: '985',
    level: '本科',
    tags: ['985', '211', '双一流'],
    description: '北京大学创办于1898年...',
    stats: {
        students: '3万+',
        teachers: '3000+',
        area: '270万㎡'
    },
    facilities: [
        { id: 'library', name: '图书馆', icon: './assets/icon/library.png' },
        { id: 'gym', name: '体育馆', icon: './assets/icon/gym.png' },
        { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.png' },
        { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.png' },
        { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.png' },
        { id: 'gate', name: '校门', icon: './assets/icon/gate.png' }
    ]
}
```

## 添加新数据

1. 将转换后的数据添加到`js/school-data.js`文件中的`nationalUniversities`数组

2. 确保每个学校都有唯一的`id`

3. 为每个学校添加必要的图片资源到`assets/school/`目录

4. 更新`provinceData`数组以包含所有省份

5. 更新`schoolTypeData`数组以包含所有学校类型

## 数据验证

在添加新数据后，请验证：

1. 所有学校都有唯一ID
2. 所有必填字段都已填写
3. 图片资源存在且路径正确
4. 省份和类型数据完整
5. 数据格式正确

## 注意事项

1. 浏览器无法直接读取Excel文件，必须先转换为JSON格式
2. 数据文件较大时，考虑使用分页加载或懒加载
3. 图片资源应进行压缩优化
4. 敏感信息不应包含在数据中
5. 定期更新数据以保持准确性

## 常见问题

**Q: 如何批量添加学校图片？**
A: 可以使用脚本批量下载或生成图片，确保文件名与学校ID对应。

**Q: 数据量太大怎么办？**
A: 考虑使用服务器端API，实现分页加载和搜索功能。

**Q: 如何更新数据？**
A: 修改`school-data.js`文件，重新部署即可。

**Q: 数据格式错误怎么办？**
A: 使用JSON验证工具检查格式，确保符合项目要求。
