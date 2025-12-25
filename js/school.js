// 使用全国高等学校名单数据
let schoolData = [];

// 从school-data.js加载数据
async function loadSchoolData() {
    try {
        // 先加载全国高等学校名单数据
        if (typeof nationalUniversitiesLoader !== 'undefined') {
            const nationalData = await nationalUniversitiesLoader.load();
            
            // 转换数据格式
            schoolData = nationalData.map(school => ({
                id: school.id,
                name: school.name,
                location: school.location,
                province: school.province,
                city: school.location,
                type: school.level === '本科' ? '本科' : '专科',
                level: school.level,
                tags: [school.level],
                description: `${school.name}是一所位于${school.location}的${school.level}院校，主管部门为${school.department}。`,
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRBNkRFNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmZmZmIj7kuozkuIrkv6Hmga/ogIHlmL48L3RleHQ+PC9zdmc+',
                stats: {
                    students: '暂无数据',
                    teachers: '暂无数据',
                    area: '暂无数据'
                },
                facilities: [
                    { id: 'library', name: '图书馆', icon: './assets/icon/library.svg' },
                    { id: 'gym', name: '体育馆', icon: './assets/icon/gym.svg' },
                    { id: 'dorm', name: '宿舍区', icon: './assets/icon/dorm.svg' },
                    { id: 'canteen', name: '食堂', icon: './assets/icon/canteen.svg' },
                    { id: 'teaching', name: '教学楼', icon: './assets/icon/teaching.svg' },
                    { id: 'gate', name: '校门', icon: './assets/icon/gate.svg' }
                ]
            }));
        }
        
        // 如果有school-data.js中的数据，可以合并
        if (typeof nationalUniversities !== 'undefined') {
            const additionalSchools = nationalUniversities.map(school => ({
                ...school,
                image: school.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRBNkRFNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmZmZmIj7kuozkuIrkv6Hmga/ogIHlmL48L3RleHQ+PC9zdmc+'
            }));
            
            // 合并数据，避免重复
            const existingIds = new Set(schoolData.map(s => s.id));
            additionalSchools.forEach(school => {
                if (!existingIds.has(school.id)) {
                    schoolData.push(school);
                }
            });
        }
    } catch (error) {
        console.error('加载学校数据失败:', error);
    }
}

// 地区数据 - 使用全国省份数据
let regionData = [];

// 从全国高等学校名单加载数据
async function loadRegionData() {
    try {
        if (typeof nationalUniversitiesLoader !== 'undefined') {
            await nationalUniversitiesLoader.load();
            const provinces = nationalUniversitiesLoader.getProvinces();
            
            // 转换为标准格式
            regionData = [
                { id: 'all', name: '全部' },
                ...provinces.map(province => ({
                    id: province,
                    name: province
                }))
            ];
        }
        
        // 如果有school-data.js中的数据，可以合并
        if (typeof provinceData !== 'undefined') {
            const existingIds = new Set(regionData.map(r => r.id));
            provinceData.forEach(province => {
                if (!existingIds.has(province.id)) {
                    regionData.push(province);
                }
            });
        }
    } catch (error) {
        console.error('加载地区数据失败:', error);
    }
}

// 学校类型数据 - 使用全国学校类型数据
let typeData = [];

// 从全国高等学校名单加载数据
async function loadTypeData() {
    try {
        if (typeof nationalUniversitiesLoader !== 'undefined') {
            await nationalUniversitiesLoader.load();
            const schoolTypes = nationalUniversitiesLoader.getSchoolTypes();
            
            // 转换为标准格式
            typeData = [
                { id: 'all', name: '全部' },
                ...schoolTypes.map(type => ({
                    id: type,
                    name: type
                }))
            ];
        }
        
        // 如果有school-data.js中的数据，可以合并
        if (typeof schoolTypeData !== 'undefined') {
            const existingIds = new Set(typeData.map(t => t.id));
            schoolTypeData.forEach(type => {
                if (!existingIds.has(type.id)) {
                    typeData.push(type);
                }
            });
        }
    } catch (error) {
        console.error('加载学校类型数据失败:', error);
    }
}

// 初始化学校分类页
async function initSchoolCategory() {
    // 显示加载提示
    const schoolListContainer = document.getElementById('schoolList');
    if (schoolListContainer) {
        schoolListContainer.innerHTML = '<div class="loading">加载中...</div>';
    }
    
    try {
        // 加载数据
        await loadSchoolData();
        await loadRegionData();
        await loadTypeData();
    
        // 检查是否有搜索参数
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        
        if (searchQuery) {
            // 执行搜索
            const searchResults = searchSchools(searchQuery.toLowerCase());
            renderSchoolList(searchResults);
            // 显示搜索结果提示
            showSearchResultsInfo(searchQuery, searchResults.length);
        } else {
            // 显示所有学校
            renderFilterOptions();
            renderSchoolList(schoolData);
            bindFilterEvents();
        }
    } catch (error) {
        console.error('初始化学校分类页失败:', error);
        if (schoolListContainer) {
            schoolListContainer.innerHTML = '<div class="error">加载失败，请刷新页面重试</div>';
        }
    }
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
        const regionName = regionData.find(r => r.id === activeRegion)?.name || '';
        if (regionName) {
            filteredSchools = filteredSchools.filter(school => {
                return school.province === regionName || school.location.includes(regionName);
            });
        }
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
async function initSchoolDetail() {
    // 显示加载提示
    const schoolInfo = document.getElementById('schoolInfo');
    if (schoolInfo) {
        schoolInfo.innerHTML = '<div class="loading">加载中...</div>';
    }
    
    try {
        // 加载数据
        await loadSchoolData();
    
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
    } catch (error) {
        console.error('初始化学校详情页失败:', error);
        if (schoolInfo) {
            schoolInfo.innerHTML = '<div class="error">加载失败，请刷新页面重试</div>';
        }
    }
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

// 搜索学校
function searchSchools(query) {
    if (!query || query.trim() === '') return schoolData;
    
    return schoolData.filter(school => {
        const nameMatch = school.name.toLowerCase().includes(query);
        const locationMatch = school.location && school.location.toLowerCase().includes(query);
        const tagsMatch = school.tags && school.tags.some(tag => tag.toLowerCase().includes(query));
        const descriptionMatch = school.description && school.description.toLowerCase().includes(query);
        return nameMatch || locationMatch || tagsMatch || descriptionMatch;
    });
}

// 显示搜索结果信息
function showSearchResultsInfo(query, count) {
    const schoolListContainer = document.getElementById('schoolList');
    if (!schoolListContainer) return;
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'search-results-info';
    infoDiv.innerHTML = `
        <div class="search-query">搜索结果："<span>${query}</span>"</div>
        <div class="search-count">找到 ${count} 所学校</div>
        <button class="clear-search-btn" onclick="clearSearch()">清除搜索</button>
    `;
    
    schoolListContainer.insertBefore(infoDiv, schoolListContainer.firstChild);
}

// 清除搜索
function clearSearch() {
    window.location.href = 'school-category.html';
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
