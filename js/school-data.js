// 全国高等学校名单数据
// 注意：由于浏览器无法直接读取Excel文件，这里提供示例数据结构
// 实际使用时，需要将Excel文件转换为JSON格式或使用服务器端API

const nationalUniversities = [
    {
        id: 'peking',
        name: '北京大学',
        location: '北京市海淀区',
        province: '北京',
        city: '北京',
        type: '985',
        level: '本科',
        tags: ['985', '211', '双一流'],
        description: '北京大学创办于1898年，是中国近代第一所国立综合性大学，被公认为中国最高学府。',
        stats: {
            students: '3万+',
            teachers: '3000+',
            area: '270万㎡'
        },
        facilities: [
            { id: 'library', name: '图书馆', icon: './assets/icon/library.svg' },
            { id: 'gym', name: '体育馆', icon: './assets/icon/gym.svg' },
            { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.svg' },
            { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.svg' },
            { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.svg' },
            { id: 'gate', name: '校门', icon: './assets/icon/gate.svg' }
        ]
    },
    {
        id: 'tsinghua',
        name: '清华大学',
        location: '北京市海淀区',
        province: '北京',
        city: '北京',
        type: '985',
        level: '本科',
        tags: ['985', '211', '双一流'],
        description: '清华大学的前身清华学堂始建于1911年，是中国高层次人才培养和科学技术研究的重要基地。',
        stats: {
            students: '5万+',
            teachers: '3500+',
            area: '442万㎡'
        },
        facilities: [
            { id: 'library', name: '图书馆', icon: './assets/icon/library.svg' },
            { id: 'gym', name: '体育馆', icon: './assets/icon/gym.svg' },
            { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.svg' },
            { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.svg' },
            { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.svg' },
            { id: 'gate', name: '校门', icon: './assets/icon/gate.svg' }
        ]
    },
    {
        id: 'fudan',
        name: '复旦大学',
        location: '上海市杨浦区',
        province: '上海',
        city: '上海',
        type: '985',
        level: '本科',
        tags: ['985', '211', '双一流'],
        description: '复旦大学创建于1905年，是中国人自主创办的第一所高等院校，校名"复旦"二字选自《尚书大传·虞夏传》。',
        stats: {
            students: '3.5万+',
            teachers: '2800+',
            area: '244万㎡'
        },
        facilities: [
            { id: 'library', name: '图书馆', icon: './assets/icon/library.svg' },
            { id: 'gym', name: '体育馆', icon: './assets/icon/gym.svg' },
            { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.svg' },
            { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.svg' },
            { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.svg' },
            { id: 'gate', name: '校门', icon: './assets/icon/gate.svg' }
        ]
    },
    {
        id: 'shanghai_jiaotong',
        name: '上海交通大学',
        location: '上海市闵行区',
        province: '上海',
        city: '上海',
        type: '985',
        level: '本科',
        tags: ['985', '211', '双一流'],
        description: '上海交通大学是我国历史最悠久、享誉海内外的著名高等学府之一，是教育部直属并与上海市共建的全国重点大学。',
        stats: {
            students: '4.5万+',
            teachers: '3000+',
            area: '300万㎡'
        },
        facilities: [
            { id: 'library', name: '图书馆', icon: './assets/icon/library.svg' },
            { id: 'gym', name: '体育馆', icon: './assets/icon/gym.svg' },
            { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.svg' },
            { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.svg' },
            { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.svg' },
            { id: 'gate', name: '校门', icon: './assets/icon/gate.svg' }
        ]
    },
    {
        id: 'zhejiang',
        name: '浙江大学',
        location: '浙江省杭州市',
        province: '浙江',
        city: '杭州',
        type: '985',
        level: '本科',
        tags: ['985', '211', '双一流'],
        description: '浙江大学是一所历史悠久、声誉卓著的高等学府，坐落于中国历史文化名城、风景旅游胜地杭州。',
        stats: {
            students: '5.5万+',
            teachers: '3500+',
            area: '450万㎡'
        },
        facilities: [
            { id: 'library', name: '图书馆', icon: './assets/icon/library.svg' },
            { id: 'gym', name: '体育馆', icon: './assets/icon/gym.svg' },
            { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.svg' },
            { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.svg' },
            { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.svg' },
            { id: 'gate', name: '校门', icon: './assets/icon/gate.svg' }
        ]
    },
    {
        id: 'nanjing',
        name: '南京大学',
        location: '江苏省南京市',
        province: '江苏',
        city: '南京',
        type: '985',
        level: '本科',
        tags: ['985', '211', '双一流'],
        description: '南京大学是一所源远流长的高等学府，追溯学脉古源自三国吴永安元年，现代校史肇始于1902年筹办的三江师范学堂。',
        stats: {
            students: '3.5万+',
            teachers: '3000+',
            area: '280万㎡'
        },
        facilities: [
            { id: 'library', name: '图书馆', icon: './assets/icon/library.svg' },
            { id: 'gym', name: '体育馆', icon: './assets/icon/gym.svg' },
            { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.svg' },
            { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.svg' },
            { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.svg' },
            { id: 'gate', name: '校门', icon: './assets/icon/gate.svg' }
        ]
    }
];

// 省份数据
const provinceData = [
    { id: 'all', name: '全部地区' },
    { id: 'beijing', name: '北京' },
    { id: 'tianjin', name: '天津' },
    { id: 'hebei', name: '河北' },
    { id: 'shanxi', name: '山西' },
    { id: 'neimenggu', name: '内蒙古' },
    { id: 'liaoning', name: '辽宁' },
    { id: 'jilin', name: '吉林' },
    { id: 'heilongjiang', name: '黑龙江' },
    { id: 'shanghai', name: '上海' },
    { id: 'jiangsu', name: '江苏' },
    { id: 'zhejiang', name: '浙江' },
    { id: 'anhui', name: '安徽' },
    { id: 'fujian', name: '福建' },
    { id: 'jiangxi', name: '江西' },
    { id: 'shandong', name: '山东' },
    { id: 'henan', name: '河南' },
    { id: 'hubei', name: '湖北' },
    { id: 'hunan', name: '湖南' },
    { id: 'guangdong', name: '广东' },
    { id: 'guangxi', name: '广西' },
    { id: 'hainan', name: '海南' },
    { id: 'chongqing', name: '重庆' },
    { id: 'sichuan', name: '四川' },
    { id: 'guizhou', name: '贵州' },
    { id: 'yunnan', name: '云南' },
    { id: 'xizang', name: '西藏' },
    { id: 'shaanxi', name: '陕西' },
    { id: 'gansu', name: '甘肃' },
    { id: 'qinghai', name: '青海' },
    { id: 'ningxia', name: '宁夏' },
    { id: 'xinjiang', name: '新疆' }
];

// 学校类型数据
const schoolTypeData = [
    { id: 'all', name: '全部类型' },
    { id: '985', name: '985工程' },
    { id: '211', name: '211工程' },
    { id: 'double', name: '双一流' },
    { id: 'general', name: '普通本科' },
    { id: 'vocational', name: '高职高专' }
];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        nationalUniversities,
        provinceData,
        schoolTypeData
    };
}
