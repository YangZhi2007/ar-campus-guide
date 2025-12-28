// 用户中心功能

// 用户中心主题切换
function toggleUserCenterTheme() {
    console.log('toggleUserCenterTheme called');
    const body = document.body;
    console.log('Current body classes:', body.className);
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // 更新主题图标
    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
        if (isDark) {
            themeBtn.innerHTML = `<svg class="theme-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" fill="#60A5FA"/></svg>`;
        } else {
            themeBtn.innerHTML = `<svg class="theme-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="#4A6DE5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#4A6DE5" stroke-width="2" stroke-linecap="round"/></svg>`;
        }
    }
}

// 初始化用户中心主题
function initUserCenterTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        // 更新主题图标
        const themeBtn = document.querySelector('.theme-btn');
        if (themeBtn) {
            themeBtn.innerHTML = `<svg class="theme-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" fill="#60A5FA"/></svg>`;
        }
    }
}

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const notLoggedInDiv = document.getElementById('notLoggedIn');
    const loggedInDiv = document.getElementById('loggedIn');

    if (isLoggedIn) {
        notLoggedInDiv.style.display = 'none';
        loggedInDiv.style.display = 'block';

        // 显示用户名
        const userName = localStorage.getItem('userName');
        if (userName) {
            document.getElementById('userName').textContent = userName;
        }

        // 更新统计数据（模拟数据，实际应从后端API获取）
        updateUserData();
    } else {
        notLoggedInDiv.style.display = 'block';
        loggedInDiv.style.display = 'none';
    }
}

// 更新用户数据
function updateUserData() {
    // 这里应该从后端API获取真实数据
    // 目前使用模拟数据
    const stats = {
        questions: 12,
        answers: 28,
        favorites: 156,
        views: 1245
    };

    // 更新统计数据显示
    document.querySelector('.stat-item:nth-child(1) .stat-value').textContent = stats.questions;
    document.querySelector('.stat-item:nth-child(2) .stat-value').textContent = stats.answers;
    document.querySelector('.stat-item:nth-child(3) .stat-value').textContent = stats.favorites;
}

// 修改用户名
function updateUserName() {
    const newName = prompt('请输入新的用户名：', localStorage.getItem('userName') || '');
    if (newName && newName.trim() !== '') {
        localStorage.setItem('userName', newName);
        document.getElementById('userName').textContent = newName;
        alert('用户名修改成功！');
    }
}

// 修改密码
function updatePassword() {
    const currentPassword = prompt('请输入当前密码：');
    const newPassword = prompt('请输入新密码：');
    
    if (currentPassword && newPassword && newPassword.trim() !== '') {
        // 这里应该调用后端API验证当前密码并更新新密码
        // 目前只做简单验证
        if (currentPassword === '123456') {  // 模拟验证
            localStorage.setItem('userPassword', newPassword);
            alert('密码修改成功！');
        } else {
            alert('当前密码错误！');
        }
    }
}

// 显示设置面板
function showSettings() {
    // 可以在这里添加更多设置选项
    alert('设置功能开发中...');
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');
        window.location.href = 'login.html';
    }
}

// 确认卸载
function confirmUninstall() {
    if (confirm('警告：此操作将清除所有本地数据并卸载应用！\n\n确定要继续吗？')) {
        if (confirm('再次确认：卸载后无法恢复数据！\n\n真的要卸载应用吗？')) {
            // 跳转到卸载页面
            window.location.href = 'uninstall.html';
        }
    }
}

// 页面加载完成后检查登录状态和初始化主题
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initUserCenterTheme();
    
    // 为主题按钮添加点击事件
    const themeBtn = document.getElementById('themeBtn');
    console.log('Theme button found:', themeBtn);
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleUserCenterTheme);
        console.log('Click event listener added');
    }
});
