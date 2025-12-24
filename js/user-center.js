// 用户中心功能

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
    } else {
        notLoggedInDiv.style.display = 'block';
        loggedInDiv.style.display = 'none';
    }
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

// 页面加载完成后检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});
