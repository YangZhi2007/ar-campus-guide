// 我的提问功能

// 模拟提问数据
const questionsData = [
    {
        id: 1,
        title: '北京大学的校园环境怎么样？',
        content: '想了解一下北京大学的校园环境，包括建筑风格、绿化情况、学习氛围等。',
        school: '北京大学',
        time: '2025-01-15 10:30',
        answers: 3,
        views: 156
    },
    {
        id: 2,
        title: '清华大学有哪些专业？',
        content: '想了解清华大学的优势专业，特别是工科和理科方面的专业设置。',
        school: '清华大学',
        time: '2025-01-14 15:20',
        answers: 8,
        views: 289
    },
    {
        id: 3,
        title: '复旦大学的宿舍条件如何？',
        content: '想了解复旦大学宿舍的配置、价格以及申请流程。',
        school: '复旦大学',
        time: '2025-01-13 09:45',
        answers: 5,
        views: 98
    }
];

// 渲染提问列表
function renderQuestions() {
    const questionsList = document.getElementById('questionsList');
    const questionsCount = document.getElementById('questionsCount');
    if (!questionsList) return;

    // 更新提问数量
    if (questionsCount) {
        questionsCount.textContent = `${questionsData.length} 条提问`;
    }

    if (questionsData.length === 0) {
        questionsList.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill="currentColor"/>
                </svg>
                <h3 class="empty-state-title">暂无提问</h3>
                <p class="empty-state-desc">您还没有发布任何提问，快去提问吧！</p>
                <a href="forum-publish.html" class="empty-state-btn">发布提问</a>
            </div>
        `;
        return;
    }

    const html = questionsData.map(question => {
        // 根据回答数量确定状态
        let statusClass = 'pending';
        let statusText = '待回答';
        if (question.answers > 0) {
            statusClass = 'answered';
            statusText = '已回答';
        }

        return `
            <div class="question-card">
                <div class="question-card-header">
                    <h3 class="question-card-title">${question.title}</h3>
                    <span class="question-card-status ${statusClass}">${statusText}</span>
                </div>
                <div class="question-card-content">${question.content}</div>
                <div class="question-card-meta">
                    <span>${question.time}</span>
                    <span>•</span>
                    <span>${question.school}</span>
                    <span>•</span>
                    <span>${question.answers} 回答</span>
                    <span>•</span>
                    <span>${question.views} 浏览</span>
                </div>
                <div class="question-card-actions">
                    <button class="action-btn primary" onclick="viewQuestion(${question.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                        </svg>
                        查看详情
                    </button>
                    <button class="action-btn secondary" onclick="editQuestion(${question.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                        </svg>
                        编辑
                    </button>
                    <button class="action-btn secondary" onclick="deleteQuestion(${question.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                        </svg>
                        删除
                    </button>
                </div>
            </div>
        `;
    }).join('');

    questionsList.innerHTML = html;
}

// 查看提问详情
function viewQuestion(id) {
    alert('查看提问详情：' + id);
    // 这里应该跳转到提问详情页面
}

// 编辑提问
function editQuestion(id) {
    alert('编辑提问：' + id);
    // 这里应该打开编辑弹窗
}

// 删除提问
function deleteQuestion(id) {
    if (confirm('确定要删除这个提问吗？')) {
        const index = questionsData.findIndex(q => q.id === id);
        if (index !== -1) {
            questionsData.splice(index, 1);
            renderQuestions();
            alert('提问已删除！');
        }
    }
}

// 页面加载完成后渲染提问列表
document.addEventListener('DOMContentLoaded', function() {
    renderQuestions();
});
