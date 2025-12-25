// 搜索功能
class SearchManager {
    constructor() {
        this.searchInput = null;
        this.searchResults = null;
        this.searchResultsContainer = null;
        this.isSearching = false;
        this.init();
    }

    init() {
        // 获取搜索输入框
        this.searchInput = document.querySelector('.search-input');
        if (!this.searchInput) return;

        // 创建搜索结果容器
        this.createSearchResultsContainer();

        // 添加事件监听
        this.searchInput.addEventListener('input', this.handleInput.bind(this));
        this.searchInput.addEventListener('focus', this.handleFocus.bind(this));
        this.searchInput.addEventListener('blur', this.handleBlur.bind(this));
        this.searchInput.addEventListener('keypress', this.handleKeyPress.bind(this));

        // 点击外部关闭搜索结果
        document.addEventListener('click', this.handleClickOutside.bind(this));
    }

    createSearchResultsContainer() {
        const container = document.createElement('div');
        container.className = 'search-results-container';
        container.style.display = 'none';

        // 插入到header-nav之后
        const headerNav = document.querySelector('.header-nav');
        if (headerNav) {
            headerNav.after(container);
        }

        this.searchResultsContainer = container;
    }

    handleInput(e) {
        const query = e.target.value.trim().toLowerCase();

        if (query.length === 0) {
            this.hideResults();
            return;
        }

        this.performSearch(query);
    }

    handleFocus() {
        const query = this.searchInput.value.trim().toLowerCase();
        if (query.length > 0) {
            this.performSearch(query);
        }
    }

    handleBlur(e) {
        // 延迟隐藏，允许点击搜索结果
        setTimeout(() => {
            this.hideResults();
        }, 200);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            const query = this.searchInput.value.trim();
            if (query) {
                this.goToSearchPage(query);
            }
        }
    }

    handleClickOutside(e) {
        if (this.searchResultsContainer && 
            !this.searchResultsContainer.contains(e.target) && 
            e.target !== this.searchInput) {
            this.hideResults();
        }
    }

    performSearch(query) {
        // 搜索学校
        const schoolResults = this.searchSchools(query);

        // 搜索论坛
        const forumResults = this.searchForum(query);

        // 搜索功能
        const featureResults = this.searchFeatures(query);

        // 组合结果
        const allResults = [
            { type: 'school', title: '学校', items: schoolResults },
            { type: 'forum', title: '论坛', items: forumResults },
            { type: 'feature', title: '功能', items: featureResults }
        ].filter(group => group.items.length > 0);

        this.displayResults(allResults);
    }

    searchSchools(query) {
        if (typeof nationalUniversities === 'undefined') return [];

        return nationalUniversities
            .filter(school => {
                const nameMatch = school.name.toLowerCase().includes(query);
                const locationMatch = school.location && school.location.toLowerCase().includes(query);
                const tagsMatch = school.tags && school.tags.some(tag => tag.toLowerCase().includes(query));
                return nameMatch || locationMatch || tagsMatch;
            })
            .slice(0, 5) // 限制显示数量
            .map(school => ({
                id: school.id,
                name: school.name,
                location: school.location,
                type: 'school',
                url: `school-detail.html?school=${school.id}`
            }));
    }

    searchForum(query) {
        if (typeof forumData === 'undefined' || !forumData.questions) return [];

        return forumData.questions
            .filter(question => {
                const titleMatch = question.title.toLowerCase().includes(query);
                const contentMatch = question.content.toLowerCase().includes(query);
                const tagsMatch = question.tags && question.tags.some(tag => tag.toLowerCase().includes(query));
                return titleMatch || contentMatch || tagsMatch;
            })
            .slice(0, 3)
            .map(question => ({
                id: question.id,
                name: question.title,
                type: 'forum',
                url: `forum-detail.html?question=${question.id}`
            }));
    }

    searchFeatures(query) {
        const features = [
            { id: 'ar', name: 'AR导览', url: 'ar-navigation.html', keywords: ['ar', '增强现实', '导览'] },
            { id: 'vr', name: 'VR校园', url: 'vr-page.html', keywords: ['vr', '虚拟现实', '全景'] },
            { id: 'forum', name: '问答论坛', url: 'forum.html', keywords: ['论坛', '问答', '交流'] },
            { id: 'category', name: '学校分类', url: 'school-category.html', keywords: ['分类', '学校', '列表'] }
        ];

        return features.filter(feature => {
            const nameMatch = feature.name.toLowerCase().includes(query);
            const keywordsMatch = feature.keywords.some(keyword => keyword.toLowerCase().includes(query));
            return nameMatch || keywordsMatch;
        });
    }

    displayResults(results) {
        if (results.length === 0) {
            this.searchResultsContainer.innerHTML = `
                <div class="search-no-results">
                    <svg class="no-results-icon" width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#9CA3AF"/>
                    </svg>
                    <p>未找到相关结果</p>
                    <button class="search-all-btn" onclick="window.location.href='school-category.html'">浏览所有学校</button>
                </div>
            `;
        } else {
            this.searchResultsContainer.innerHTML = results.map(group => `
                <div class="search-result-group">
                    <div class="search-result-group-title">${group.title}</div>
                    ${group.items.map(item => `
                        <div class="search-result-item" onclick="window.location.href='${item.url}'">
                            <div class="search-result-icon">
                                ${this.getResultIcon(item.type)}
                            </div>
                            <div class="search-result-content">
                                <div class="search-result-name">${item.name}</div>
                                ${item.location ? `<div class="search-result-location">${item.location}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('');
        }

        this.showResults();
    }

    getResultIcon(type) {
        const icons = {
            school: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" fill="#4A6DE5"/>
            </svg>`,
            forum: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill="#4A6DE5"/>
            </svg>`,
            feature: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4A6DE5"/>
            </svg>`
        };
        return icons[type] || icons.feature;
    }

    showResults() {
        this.searchResultsContainer.style.display = 'block';
        this.isSearching = true;
    }

    hideResults() {
        this.searchResultsContainer.style.display = 'none';
        this.isSearching = false;
    }

    goToSearchPage(query) {
        // 跳转到搜索结果页面
        window.location.href = `school-category.html?search=${encodeURIComponent(query)}`;
    }
}

// 页面加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', function() {
    new SearchManager();
});
