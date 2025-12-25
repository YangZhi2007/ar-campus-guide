// 设置页面功能

// 初始化深色模式状态
function initDarkMode() {
    const isDark = localStorage.getItem('settingsDarkMode') === 'true';
    const toggle = document.getElementById('darkModeToggle');
    if (isDark) {
        toggle.classList.add('active');
        document.body.classList.add('user-theme-dark');
    }
}

// 切换深色模式
function toggleDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    toggle.classList.toggle('active');
    const isDark = toggle.classList.contains('active');
    localStorage.setItem('settingsDarkMode', isDark);

    if (isDark) {
        document.body.classList.add('user-theme-dark');
    } else {
        document.body.classList.remove('user-theme-dark');
    }
}

// 修改字体大小
function changeFontSize() {
    const select = document.getElementById('fontSizeSelect');
    const fontSize = select.value;
    localStorage.setItem('settingsFontSize', fontSize);
    document.documentElement.style.fontSize = fontSize + 'px';
}

// 初始化字体大小
function initFontSize() {
    const savedFontSize = localStorage.getItem('settingsFontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize + 'px';
        document.getElementById('fontSizeSelect').value = savedFontSize;
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

// 清除缓存
function clearCache() {
    if (confirm('确定要清除所有缓存吗？')) {
        localStorage.clear();
        alert('缓存已清除！');
    }
}

// 保存设置
function saveSettings() {
    alert('设置已保存！');
    window.location.href = 'user-center.html';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initFontSize();
});
