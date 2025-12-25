// 我的收藏功能

// 模拟收藏数据
const favoritesData = [
    {
        id: 1,
        schoolName: '北京大学',
        location: '北京市海淀区',
        type: '本科',
        department: '教育部',
        addedTime: '2025-01-15 10:30'
    },
    {
        id: 2,
        schoolName: '清华大学',
        location: '北京市海淀区',
        type: '本科',
        department: '教育部',
        addedTime: '2025-01-14 15:45'
    },
    {
        id: 3,
        schoolName: '复旦大学',
        location: '上海市杨浦区',
        type: '本科',
        department: '教育部',
        addedTime: '2025-01-13 09:20'
    }
];

// 渲染收藏列表
function renderFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    if (!favoritesList) return;

    if (favoritesData.length === 0) {
        favoritesList.innerHTML = '<div class="empty-state">暂无收藏</div>';
        return;
    }

    const html = favoritesData.map(favorite => `
        <div class="favorite-item">
            <div class="favorite-header">
                <div class="favorite-school">${favorite.schoolName}</div>
                <div class="favorite-info">
                    <span>${favorite.type}</span>
                    <span>•</span>
                    <span>${favorite.department}</span>
                    <span>•</span>
                    <span>${favorite.addedTime}</span>
                </div>
            </div>
            <div class="favorite-actions">
                <a href="#" class="action-link" onclick="viewSchool('${favorite.schoolName}')">查看</a>
                <a href="#" class="action-link" onclick="removeFavorite(${favorite.id})">取消收藏</a>
            </div>
        </div>
    `).join('');

    favoritesList.innerHTML = html;
}

// 查看学校详情
function viewSchool(schoolName) {
    alert('查看学校：' + schoolName);
    // 这里应该跳转到学校详情页面
}

// 取消收藏
function removeFavorite(id) {
    if (confirm('确定要取消收藏吗？')) {
        const index = favoritesData.findIndex(f => f.id === id);
        if (index !== -1) {
            favoritesData.splice(index, 1);
            renderFavorites();
            alert('已取消收藏！');
        }
    }
}

// 页面加载完成后渲染收藏列表
document.addEventListener('DOMContentLoaded', function() {
    renderFavorites();
});
