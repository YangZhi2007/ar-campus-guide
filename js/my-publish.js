// 我的发布功能

// 模拟发布数据
const publishData = [
    {
        id: 1,
        title: '北京大学图书馆开放时间',
        school: '北京大学',
        content: '北京大学图书馆的开放时间是什么时候？周末和节假日是否开放？',
        time: '2025-01-15 11:30',
        views: 156,
        status: 'public'
    },
    {
        id: 2,
        title: '清华大学食堂推荐',
        school: '清华大学',
        content: '清华大学哪个食堂比较好？有什么特色菜推荐吗？',
        time: '2025-01-14 16:20',
        views: 289,
        status: 'private'
    },
    {
        id: 3,
        title: '复旦大学社团活动',
        school: '复旦大学',
        content: '复旦大学有哪些有趣的社团活动可以参加？',
        time: '2025-01-13 10:45',
        views: 98,
        status: 'public'
    }
];

// 渲染发布列表
function renderPublishList() {
    const publishList = document.getElementById('publishList');
    const publishCount = document.getElementById('publishCount');
    if (!publishList) {
        console.log('publishList not found');
        return;
    }

    // 更新发布数量
    if (publishCount) {
        publishCount.textContent = `${publishData.length} 条发布`;
    }

    if (publishData.length === 0) {
        publishList.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                </svg>
                <h3 class="empty-state-title">暂无发布</h3>
                <p class="empty-state-desc">您还没有发布任何内容，快去分享吧！</p>
                <a href="forum.html" class="empty-state-btn">浏览论坛</a>
            </div>
        `;
        return;
    }

    const html = publishData.map(item => {
        // 根据状态确定显示文本
        let statusClass = 'private';
        let statusText = '私密';
        if (item.status === 'public') {
            statusClass = 'public';
            statusText = '公开';
        }

        return `
            <div class="publish-card">
                <div class="publish-card-header">
                    <h3 class="publish-card-title">${item.title}</h3>
                    <span class="publish-card-status ${statusClass}">${statusText}</span>
                </div>
                <div class="publish-card-content">${item.content}</div>
                <div class="publish-card-meta">
                    <span>${item.time}</span>
                    <span>•</span>
                    <span>${item.school}</span>
                    <span>•</span>
                    <span>${item.views} 浏览</span>
                </div>
                <div class="publish-card-actions">
                    <button class="action-btn primary" onclick="viewPublish(${item.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                        </svg>
                        查看详情
                    </button>
                    <button class="action-btn secondary" onclick="togglePrivacy(${item.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53-4.12-3.28-7.79-7-8.94V6.45l7-3.11v8.45z" fill="currentColor"/>
                        </svg>
                        ${item.status === 'public' ? '设为私密' : '设为公开'}
                    </button>
                    <button class="action-btn secondary" onclick="deletePublish(${item.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                        </svg>
                        删除
                    </button>
                </div>
            </div>
        `;
    }).join('');

    publishList.innerHTML = html;
}

// 查看发布详情
function viewPublish(id) {
    alert('查看发布详情：' + id);
    // 这里应该跳转到发布详情页面
}

// 切换私密/公开状态
function togglePrivacy(id) {
    const index = publishData.findIndex(item => item.id === id);
    if (index !== -1) {
        // 切换状态
        publishData[index].status = publishData[index].status === 'public' ? 'private' : 'public';
        // 重新渲染列表
        renderPublishList();
        // 显示提示
        const status = publishData[index].status === 'public' ? '公开' : '私密';
        alert(`已设置为${status}！`);
    }
}

// 删除发布
function deletePublish(id) {
    if (confirm('确定要删除这条发布吗？')) {
        const index = publishData.findIndex(item => item.id === id);
        if (index !== -1) {
            publishData.splice(index, 1);
            renderPublishList();
            alert('发布已删除！');
        }
    }
}

// 页面加载完成后渲染发布列表
document.addEventListener('DOMContentLoaded', function() {
    renderPublishList();
});