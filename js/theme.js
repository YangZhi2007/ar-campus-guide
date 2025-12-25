// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // 如果页面有主题切换按钮，添加点击事件
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
});

// 切换主题
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// 设置主题
function setTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);

    // 更新主题图标
    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
        if (theme === 'dark') {
            themeBtn.innerHTML = `<svg class="theme-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" fill="#60A5FA"/></svg>`;
        } else {
            themeBtn.innerHTML = `<svg class="theme-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="#4A6DE5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#4A6DE5" stroke-width="2" stroke-linecap="round"/></svg>`;
        }
    }
}

// 为所有页面添加主题切换按钮
function addThemeToggle() {
    // 检查是否已有主题切换按钮
    if (document.getElementById('themeBtn')) return;

    // 创建主题切换按钮
    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeBtn';
    themeBtn.className = 'theme-btn';
    themeBtn.innerHTML = `<svg class="theme-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="#4A6DE5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#4A6DE5" stroke-width="2" stroke-linecap="round"/></svg>`;

    // 添加到页面右上角
    themeBtn.style.position = 'fixed';
    themeBtn.style.top = '20px';
    themeBtn.style.right = '20px';
    themeBtn.style.zIndex = '999';

    document.body.appendChild(themeBtn);

    // 添加点击事件
    themeBtn.addEventListener('click', toggleTheme);
}
