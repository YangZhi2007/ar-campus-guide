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
    if (!questionsList) return;

    if (questionsData.length === 0) {
        questionsList.innerHTML = '<div class="empty-state">暂无提问</div>';
        return;
    }

    const html = questionsData.map(question => `
        <div class="question-item">
            <div class="question-header">
                <div class="question-title">${question.title}</div>
                <div class="question-meta">
                    <span>${question.time}</span>
                    <span>•</span>
                    <span>${question.school}</span>
                    <span>•</span>
                    <span>${question.answers} 回答</span>
                    <span>•</span>
                    <span>${question.views} 浏览</span>
                </div>
            </div>
            <div class="question-content">${question.content}</div>
            <div class="question-actions">
                <a href="#" class="action-link" onclick="viewQuestion(${question.id})">查看详情</a>
                <a href="#" class="action-link" onclick="editQuestion(${question.id})">编辑</a>
                <a href="#" class="action-link" onclick="deleteQuestion(${question.id})">删除</a>
            </div>
        </div>
    `).join('');

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
