// 学校数据
const schoolData = [
    {
        id: 'peking',
        name: '北京大学',
        location: '北京市海淀区',
        image: './assets/school/peking.jpg',
        tags: ['985', '211', '双一流'],
        description: '北京大学创办于1898年，是中国近代第一所国立综合性大学，被公认为中国最高学府。',
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
    },
    {
        id: 'tsinghua',
        name: '清华大学',
        location: '北京市海淀区',
        image: './assets/school/tsinghua.jpg',
        tags: ['985', '211', '双一流'],
        description: '清华大学的前身清华学堂始建于1911年，是中国高层次人才培养和科学技术研究的重要基地。',
        stats: {
            students: '5万+',
            teachers: '3500+',
            area: '442万㎡'
        },
        facilities: [
            { id: 'library', name: '图书馆', icon: './assets/icon/library.png' },
            { id: 'gym', name: '体育馆', icon: './assets/icon/gym.png' },
            { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.png' },
            { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.png' },
            { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.png' },
            { id: 'gate', name: '校门', icon: './assets/icon/gate.png' }
        ]
    },
    {
        id: 'fudan',
        name: '复旦大学',
        location: '上海市杨浦区',
        image: './assets/school/fudan.jpg',
        tags: ['985', '211', '双一流'],
        description: '复旦大学创建于1905年，是中国人自主创办的第一所高等院校，校名"复旦"二字选自《尚书大传·虞夏传》。',
        stats: {
            students: '3.5万+',
            teachers: '2800+',
            area: '244万㎡'
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
];

// 地区数据
const regionData = [
    { id: 'all', name: '全部地区' },
    { id: 'beijing', name: '北京' },
    { id: 'shanghai', name: '上海' },
    { id: 'guangdong', name: '广东' },
    { id: 'jiangsu', name: '江苏' },
    { id: 'zhejiang', name: '浙江' },
    { id: 'hubei', name: '湖北' },
    { id: 'sichuan', name: '四川' }
];

// 学校类型数据
const typeData = [
    { id: 'all', name: '全部类型' },
    { id: '985', name: '985工程' },
    { id: '211', name: '211工程' },
    { id: 'double', name: '双一流' },
    { id: 'general', name: '普通本科' },
    { id: 'vocational', name: '高职高专' }
];

// 初始化学校分类页
function initSchoolCategory() {
    renderFilterOptions();
    renderSchoolList(schoolData);
    bindFilterEvents();
}

// 渲染筛选选项
function renderFilterOptions() {
    // 渲染地区筛选
    const regionContainer = document.getElementById('regionFilter');
    if (regionContainer) {
        regionContainer.innerHTML = regionData.map(region => 
            `<div class="filter-option ${region.id === 'all' ? 'active' : ''}" data-type="region" data-id="${region.id}">${region.name}</div>`
        ).join('');
    }

    // 渲染类型筛选
    const typeContainer = document.getElementById('typeFilter');
    if (typeContainer) {
        typeContainer.innerHTML = typeData.map(type => 
            `<div class="filter-option ${type.id === 'all' ? 'active' : ''}" data-type="type" data-id="${type.id}">${type.name}</div>`
        ).join('');
    }
}

// 渲染学校列表
function renderSchoolList(schools) {
    const schoolListContainer = document.getElementById('schoolList');
    if (!schoolListContainer) return;

    if (schools.length === 0) {
        schoolListContainer.innerHTML = '<div class="empty-result">暂无符合条件的学校</div>';
        return;
    }

    schoolListContainer.innerHTML = schools.map(school => `
        <div class="school-card" data-id="${school.id}">
            <img src="${school.image}" alt="${school.name}" class="school-image">
            <div class="school-info">
                <div>
                    <h3 class="school-name">${school.name}</h3>
                    <p class="school-location">${school.location}</p>
                    <div class="school-tags">
                        ${school.tags.map(tag => `<span class="school-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="school-actions">
                    <button class="school-btn" onclick="viewSchoolDetail('${school.id}')">查看详情</button>
                    <button class="school-btn" onclick="navigateToSchool('${school.id}')">AR导航</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 绑定筛选事件
function bindFilterEvents() {
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            const type = this.dataset.type;
            const id = this.dataset.id;

            // 更新选中状态
            document.querySelectorAll(`.filter-option[data-type="${type}"]`).forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');

            // 筛选学校
            filterSchools();
        });
    });
}

// 筛选学校
function filterSchools() {
    const activeRegion = document.querySelector('.filter-option[data-type="region"].active').dataset.id;
    const activeType = document.querySelector('.filter-option[data-type="type"].active').dataset.id;

    let filteredSchools = schoolData;

    // 按地区筛选
    if (activeRegion !== 'all') {
        filteredSchools = filteredSchools.filter(school => {
            const location = school.location;
            switch(activeRegion) {
                case 'beijing': return location.includes('北京');
                case 'shanghai': return location.includes('上海');
                case 'guangdong': return location.includes('广东');
                case 'jiangsu': return location.includes('江苏');
                case 'zhejiang': return location.includes('浙江');
                case 'hubei': return location.includes('湖北');
                case 'sichuan': return location.includes('四川');
                default: return true;
            }
        });
    }

    // 按类型筛选
    if (activeType !== 'all') {
        filteredSchools = filteredSchools.filter(school => {
            return school.tags.includes(activeType);
        });
    }

    renderSchoolList(filteredSchools);
}

// 查看学校详情
function viewSchoolDetail(schoolId) {
    window.location.href = `school-detail.html?school=${schoolId}`;
}

// 导航到学校
function navigateToSchool(schoolId) {
    window.location.href = `ar-page.html?school=${schoolId}`;
}

// 初始化学校详情页
function initSchoolDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const schoolId = urlParams.get('school');

    if (!schoolId) {
        window.location.href = 'school-category.html';
        return;
    }

    const school = schoolData.find(s => s.id === schoolId);
    if (!school) {
        window.location.href = 'school-category.html';
        return;
    }

    renderSchoolDetail(school);
}

// 渲染学校详情
function renderSchoolDetail(school) {
    // 渲染学校头部
    const schoolHeader = document.querySelector('.school-header');
    if (schoolHeader) {
        schoolHeader.innerHTML = `
            <img src="${school.image}" alt="${school.name}" class="school-header-img">
            <div class="school-header-overlay">
                <h1 class="school-title">${school.name}</h1>
                <p class="school-subtitle">${school.location}</p>
            </div>
        `;
    }

    // 渲染学校信息
    const schoolInfo = document.getElementById('schoolInfo');
    if (schoolInfo) {
        schoolInfo.innerHTML = `
            <h2 class="section-title">学校简介</h2>
            <p class="school-description">${school.description}</p>

            <div class="school-stats">
                <div class="stat-item">
                    <span class="stat-value">${school.stats.students}</span>
                    <span class="stat-label">在校学生</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${school.stats.teachers}</span>
                    <span class="stat-label">教职工</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${school.stats.area}</span>
                    <span class="stat-label">校园面积</span>
                </div>
            </div>
        `;
    }

    // 渲染设施列表
    const facilitiesList = document.getElementById('facilitiesList');
    if (facilitiesList) {
        facilitiesList.innerHTML = school.facilities.map(facility => `
            <div class="facility-item" onclick="viewFacility('${school.id}', '${facility.id}')">
                <img src="${facility.icon}" alt="${facility.name}" class="facility-icon">
                <span class="facility-name">${facility.name}</span>
            </div>
        `).join('');
    }
}

// 查看设施详情
function viewFacility(schoolId, facilityId) {
    window.location.href = `ar-page.html?school=${schoolId}&facility=${facilityId}`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'school-category.html') {
        initSchoolCategory();
    } else if (currentPage === 'school-detail.html') {
        initSchoolDetail();
    }
});
