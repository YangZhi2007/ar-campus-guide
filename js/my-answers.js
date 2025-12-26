// 我的回答功能

// 模拟回答数据
const answersData = [
    {
        id: 1,
        question: '北京大学的校园环境怎么样？',
        answer: '北京大学位于北京市海淀区，校园环境优美，建筑风格融合了传统与现代元素。校园内有未名湖、博雅塔等标志性景点，学习氛围浓厚。',
        time: '2025-01-15 10:30',
        likes: 23,
        views: 156
    },
    {
        id: 2,
        question: '清华大学有哪些专业？',
        answer: '清华大学拥有工学、理学、文学、艺术、历史、哲学、经济学、管理学、法学、教育学和医学等多个学科门类，其中工科专业尤为突出。',
        time: '2025-01-14 15:20',
        likes: 45,
        views: 289
    },
    {
        id: 3,
        question: '复旦大学的宿舍条件如何？',
        answer: '复旦大学宿舍条件良好，大部分宿舍为4人间，配备空调、独立卫浴、书桌、衣柜等基本设施。',
        time: '2025-01-13 09:45',
        likes: 12,
        views: 98
    }
];

// 渲染回答列表
function renderAnswers() {
    const answersList = document.getElementById('answersList');
    const answersCount = document.getElementById('answersCount');
    if (!answersList) {
        console.log('answersList not found');
        return;
    }

    // 更新回答数量
    if (answersCount) {
        answersCount.textContent = `${answersData.length} 条回答`;
    }

    if (answersData.length === 0) {
        answersList.innerHTML = '<div class="empty-state">暂无回答</div>';
        return;
    }

    const html = answersData.map(answer => {
        // 根据点赞数确定状态
        let statusClass = 'pending';
        let statusText = '待采纳';
        if (answer.likes >= 20) {
            statusClass = 'accepted';
            statusText = '已采纳';
        }

        return `
            <div class="question-card">
                <div class="question-card-header">
                    <h3 class="question-card-title">${answer.question}</h3>
                    <span class="question-card-status ${statusClass}">${statusText}</span>
                </div>
                <div class="question-card-content">${answer.answer}</div>
                <div class="question-card-meta">
                    <span>${answer.time}</span>
                    <span>•</span>
                    <span>${answer.likes} 赞</span>
                    <span>•</span>
                    <span>${answer.views} 浏览</span>
                </div>
                <div class="question-card-actions">
                    <button class="action-btn primary" onclick="viewAnswer(${answer.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                        </svg>
                        查看详情
                    </button>
                    <button class="action-btn secondary" onclick="editAnswer(${answer.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                        </svg>
                        编辑
                    </button>
                    <button class="action-btn secondary" onclick="deleteAnswer(${answer.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                        </svg>
                        删除
                    </button>
                </div>
            </div>
        `;
    }).join('');

    answersList.innerHTML = html;
}

// 页面加载完成后渲染回答列表
document.addEventListener('DOMContentLoaded', function() {
    renderAnswers();
});

// 删除回答
function deleteAnswer(answerId) {
    if (confirm('确定要删除这条回答吗？')) {
        // 从数据中删除
        const index = answersData.findIndex(a => a.id === answerId);
        if (index !== -1) {
            answersData.splice(index, 1);
            // 重新渲染列表
            renderAnswers();
            // 显示成功提示
            alert('删除成功！');
        }
    }
}

// 查看回答详情
function viewAnswer(answerId) {
    const answer = answersData.find(a => a.id === answerId);
    if (answer) {
        // 跳转到问题详情页
        window.location.href = `forum-detail.html?id=${answer.questionId}`;
    }
}

// 编辑回答
function editAnswer(answerId) {
    const answer = answersData.find(a => a.id === answerId);
    if (answer) {
        // 跳转到编辑页面
        window.location.href = `edit-answer.html?id=${answerId}`;
    }
}
