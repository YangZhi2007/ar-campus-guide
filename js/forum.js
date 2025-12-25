// 论坛数据
const forumData = {
    questions: [
        {
            id: 1,
            title: '北京大学图书馆开放时间是什么时候？',
            content: '想了解一下北京大学图书馆的开放时间，周末也开放吗？需要预约吗？',
            author: {
                id: 'user1',
                name: '校园探索者',
                avatar: './assets/icon/user-avatar.svg'
            },
            school: '北京大学',
            tags: ['图书馆', '开放时间'],
            views: 325,
            answers: 5,
            createTime: '2023-10-15 10:30',
            answersList: [
                {
                    id: 1,
                    author: {
                        id: 'user2',
                        name: '北大学生',
                        avatar: './assets/icon/user-avatar.svg'
                    },
                    content: '北京大学图书馆周一至周日7:00-22:00开放，需要刷校园卡进入。校外人员需要提前预约。',
                    createTime: '2023-10-15 11:20',
                    likes: 15
                },
                {
                    id: 2,
                    author: {
                        id: 'user3',
                        name: '图书馆管理员',
                        avatar: './assets/icon/user-avatar.svg'
                    },
                    content: '补充一下，校外人员预约可以通过北京大学图书馆官网或微信公众号进行，每天限流100人。',
                    createTime: '2023-10-15 14:30',
                    likes: 8
                }
            ]
        },
        {
            id: 2,
            title: '清华大学食堂哪个最好吃？',
            content: '计划去清华大学参观，想了解一下哪个食堂比较推荐？有什么特色菜吗？',
            author: {
                id: 'user4',
                name: '美食爱好者',
                avatar: './assets/icon/user-avatar.svg'
            },
            school: '清华大学',
            tags: ['食堂', '美食'],
            views: 528,
            answers: 12,
            createTime: '2023-10-14 15:45',
            answersList: [
                {
                    id: 1,
                    author: {
                        id: 'user5',
                        name: '清华吃货',
                        avatar: './assets/icon/user-avatar.svg'
                    },
                    content: '推荐桃李园食堂，环境好，菜品丰富，特别是烤鸭和麻辣香锅很受欢迎。',
                    createTime: '2023-10-14 16:30',
                    likes: 25
                }
            ]
        },
        {
            id: 3,
            title: '复旦大学校园参观需要预约吗？',
            content: '周末想去复旦大学参观，需要提前预约吗？有什么注意事项？',
            author: {
                id: 'user6',
                name: '大学游览者',
                avatar: './assets/icon/user-avatar.svg'
            },
            school: '复旦大学',
            tags: ['参观', '预约'],
            views: 198,
            answers: 3,
            createTime: '2023-10-13 09:15',
            answersList: []
        }
    ],
    hotTags: [
        { name: '开放时间', count: 128 },
        { name: '食堂', count: 95 },
        { name: '参观', count: 87 },
        { name: '预约', count: 76 },
        { name: '图书馆', count: 65 },
        { name: '宿舍', count: 54 },
        { name: '交通', count: 48 },
        { name: '校园卡', count: 42 }
    ]
};

// 初始化论坛首页
function initForum() {
    renderQuestionList();
    renderHotTags();
}

// 渲染问题列表
function renderQuestionList() {
    const questionListContainer = document.getElementById('questionList');
    if (!questionListContainer) return;

    questionListContainer.innerHTML = forumData.questions.map(question => `
        <div class="question-item" onclick="viewQuestionDetail(${question.id})">
            <div class="question-header">
                <h3 class="question-title">${question.title}</h3>
                <span class="question-school">${question.school}</span>
            </div>
            <div class="question-content">${question.content}</div>
            <div class="question-tags">
                ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="question-footer">
                <div class="question-author">
                    <img src="${question.author.avatar}" alt="${question.author.name}" class="author-avatar">
                    <span class="author-name">${question.author.name}</span>
                </div>
                <div class="question-stats">
                    <span class="stat-item"><svg class="stat-icon" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#4A6DE5"/></svg>${question.views}</span>
                    <span class="stat-item"><svg class="stat-icon" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill="#4A6DE5"/></svg>${question.answers}</span>
                    <span class="stat-item">${question.createTime}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染热门标签
function renderHotTags() {
    const hotTagsContainer = document.getElementById('hotTags');
    if (!hotTagsContainer) return;

    hotTagsContainer.innerHTML = forumData.hotTags.map(tag => `
        <span class="hot-tag" onclick="searchByTag('${tag.name}')">${tag.name} (${tag.count})</span>
    `).join('');
}

// 查看问题详情
function viewQuestionDetail(questionId) {
    window.location.href = `forum-detail.html?id=${questionId}`;
}

// 按标签搜索
function searchByTag(tagName) {
    const filteredQuestions = forumData.questions.filter(question => 
        question.tags.includes(tagName)
    );

    const questionListContainer = document.getElementById('questionList');
    if (questionListContainer) {
        if (filteredQuestions.length === 0) {
            questionListContainer.innerHTML = '<div class="empty-result">暂无相关话题</div>';
        } else {
            questionListContainer.innerHTML = filteredQuestions.map(question => `
                <div class="question-item" onclick="viewQuestionDetail(${question.id})">
                    <div class="question-header">
                        <h3 class="question-title">${question.title}</h3>
                        <span class="question-school">${question.school}</span>
                    </div>
                    <div class="question-content">${question.content}</div>
                    <div class="question-tags">
                        ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="question-footer">
                        <div class="question-author">
                            <img src="${question.author.avatar}" alt="${question.author.name}" class="author-avatar">
                            <span class="author-name">${question.author.name}</span>
                        </div>
                        <div class="question-stats">
                            <span class="stat-item"><svg class="stat-icon" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#4A6DE5"/></svg>${question.views}</span>
                            <span class="stat-item"><svg class="stat-icon" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill="#4A6DE5"/></svg>${question.answers}</span>
                            <span class="stat-item">${question.createTime}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// 初始化问题详情页
function initQuestionDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = parseInt(urlParams.get('id'));

    if (!questionId) {
        window.location.href = 'forum.html';
        return;
    }

    const question = forumData.questions.find(q => q.id === questionId);
    if (!question) {
        window.location.href = 'forum.html';
        return;
    }

    renderQuestionDetail(question);
}

// 渲染问题详情
function renderQuestionDetail(question) {
    const questionDetailContainer = document.getElementById('questionDetail');
    if (!questionDetailContainer) return;

    questionDetailContainer.innerHTML = `
        <div class="question-detail-header">
            <h1 class="question-detail-title">${question.title}</h1>
            <div class="question-detail-meta">
                <span class="question-school">${question.school}</span>
                <span class="question-create-time">${question.createTime}</span>
            </div>
        </div>

        <div class="question-detail-content">
            <div class="question-detail-author">
                <img src="${question.author.avatar}" alt="${question.author.name}" class="author-avatar">
                <span class="author-name">${question.author.name}</span>
            </div>
            <div class="question-text">${question.content}</div>
            <div class="question-tags">
                ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>

        <div class="answers-section">
            <h2 class="section-title">回答 (${question.answers})</h2>
            ${question.answersList.length > 0 ? 
                question.answersList.map(answer => `
                    <div class="answer-item">
                        <div class="answer-author">
                            <img src="${answer.author.avatar}" alt="${answer.author.name}" class="author-avatar">
                            <span class="author-name">${answer.author.name}</span>
                            <span class="answer-time">${answer.createTime}</span>
                        </div>
                        <div class="answer-content">${answer.content}</div>
                        <div class="answer-actions">
                            <button class="action-btn like-btn" onclick="likeAnswer(${answer.id})">
                                <svg class="action-icon" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#4A6DE5"/></svg>
                                <span>${answer.likes}</span>
                            </button>
                        </div>
                    </div>
                `).join('') :
                '<div class="empty-answer">暂无回答，快来抢沙发吧！</div>'
            }
        </div>
    `;
}

// 点赞回答
function likeAnswer(answerId) {
    // 这里只是模拟点赞功能，实际项目中需要与后端交互
    const likeBtn = document.querySelector(`.like-btn[onclick="likeAnswer(${answerId})"]`);
    if (likeBtn) {
        const likeCount = likeBtn.querySelector('span');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        likeBtn.classList.add('liked');
    }
}

// 初始化提问发布页
function initPublishQuestion() {
    const publishForm = document.getElementById('publishForm');
    if (publishForm) {
        publishForm.addEventListener('submit', function(e) {
            e.preventDefault();
            publishQuestion();
        });
    }
}

// 发布问题
function publishQuestion() {
    const title = document.getElementById('questionTitle').value.trim();
    const content = document.getElementById('questionContent').value.trim();
    const school = document.getElementById('questionSchool').value.trim();
    const tags = document.getElementById('questionTags').value.trim().split(/[,，]/).filter(tag => tag.trim());

    if (!title || !content) {
        alert('请填写标题和内容');
        return;
    }

    // 模拟发布问题
    const newQuestion = {
        id: forumData.questions.length + 1,
        title: title,
        content: content,
        author: {
            id: 'currentUser',
            name: '当前用户',
            avatar: './assets/icon/user-avatar.svg'
        },
        school: school || '未指定学校',
        tags: tags.length > 0 ? tags : ['其他'],
        views: 0,
        answers: 0,
        createTime: new Date().toLocaleString('zh-CN'),
        answersList: []
    };

    // 添加到问题列表
    forumData.questions.unshift(newQuestion);

    // 跳转到问题详情页
    window.location.href = `forum-detail.html?id=${newQuestion.id}`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'forum.html') {
        initForum();
    } else if (currentPage === 'forum-detail.html') {
        initQuestionDetail();
    } else if (currentPage === 'forum-publish.html') {
        initPublishQuestion();
    }
});
