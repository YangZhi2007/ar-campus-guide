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
    if (!answersList) return;

    if (answersData.length === 0) {
        answersList.innerHTML = '<div class="empty-state">暂无回答</div>';
        return;
    }

    const html = answersData.map(answer => `
        <div class="answer-item">
            <div class="answer-header">
                <div class="answer-question">${answer.question}</div>
                <div class="answer-meta">
                    <span>${answer.time}</span>
                    <span>•</span>
                    <span>${answer.likes} 赞</span>
                    <span>•</span>
                    <span>${answer.views} 浏览</span>
                </div>
            </div>
            <div class="answer-content">${answer.answer}</div>
            <div class="answer-actions">
                <a href="#" class="action-link">编辑</a>
                <a href="#" class="action-link">删除</a>
            </div>
        </div>
    `).join('');

    answersList.innerHTML = html;
}

// 页面加载完成后渲染回答列表
document.addEventListener('DOMContentLoaded', function() {
    renderAnswers();
});
