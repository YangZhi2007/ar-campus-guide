// 各种状态的图标（全局变量）
const statusIcons = {
    success: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21l7.07-7.07 1.41 1.41L21 7.07l-1.41-1.41L9 16.17z" fill="#4CAF50"/>',
    error: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2H9v2h2v-2zm-4 0h6v2H9v-2h6v2zm0 2H9v2h10v-2H9z" fill="#F44336"/>',
    warning: '<path d="M1 21h22L12 8 1 21l1.41-1.41L12 11.17 10.59 1 21 1.41-1.41L1 21zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3z" fill="#FF9800"/>',
    info: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2H9v2h2v-2zm-4 0h6v2H9v-2h6v2zm0 2H9v2h10v-2H9z" fill="#2196F3"/>'
};

// 显示状态信息函数（全局函数）
function showStatus(type, message, icon) {
    const statusElement = document.getElementById('statusMessage');
    if (!statusElement) return;

    statusElement.className = 'status-message ' + type;
    statusElement.innerHTML = `<svg class="status-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${icon}</svg><span>${message}</span>`;
    statusElement.style.display = 'flex';

    // 3秒后自动隐藏
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 3000);
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    // 初始化密码显示状态
    let isPasswordVisible = false;

    // 密码显示/隐藏切换
    document.getElementById('togglePassword').addEventListener('click', function() {
        isPasswordVisible = !isPasswordVisible;
        const passwordInput = document.getElementById('password');
        const eyeIcon = this.querySelector('.eye-icon path');

        if (isPasswordVisible) {
            passwordInput.type = 'text';
            // 切换到闭眼图标
            eyeIcon.setAttribute('d', 'M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-2.24-5-5-2.24-5-5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3zm-3.1-9H8.9c-.06-1.71.5-3.29 1.5-4.5.5-1.21 1.5-2.79 1.5-4.5V4h10v.5z');
        } else {
            passwordInput.type = 'password';
            // 切换到睁眼图标
            eyeIcon.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c0-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3z');
        }
    });

    // 将showStatus函数暴露到全局作用域
    window.showLoginStatus = showStatus;

    // 检查URL参数中的状态信息
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');

    if (status && message) {
        showStatus(status, decodeURIComponent(message), statusIcons[status] || statusIcons.info);
    }

    // 检查本地存储的登录状态
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
    }
});

// 显示错误信息
function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const wrapper = inputElement.parentElement;

    // 添加错误样式
    inputElement.style.borderColor = '#ff4d4f';

    // 创建或更新错误提示
    let errorElement = wrapper.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        wrapper.appendChild(errorElement);
    }

    errorElement.textContent = message;
}

// 清除所有错误提示
function clearErrors() {
    const inputs = document.querySelectorAll('.input-wrapper input');
    inputs.forEach(input => {
        input.style.borderColor = 'var(--border-color)';
        const wrapper = input.parentElement;
        const errorElement = wrapper.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    });
}

// 登录按钮点击事件
document.getElementById('loginBtn').addEventListener('click', function() {
    // 清除之前的错误提示
    clearErrors();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    // 用户名验证
    if (!username) {
        showError('username', '请输入用户名');
        isValid = false;
    } else if (username.length < 3) {
        showError('username', '用户名至少3个字符');
        isValid = false;
    }

    // 密码验证
    if (!password) {
        showError('password', '请输入密码');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', '密码至少6个字符');
        isValid = false;
    }

    // 表单验证通过
    if (isValid) {
        // 显示加载状态
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.disabled = true;
        loginBtn.textContent = '登录中...';

        // 模拟登录请求（实际需要对接后端API）
        setTimeout(() => {
            // 模拟登录验证
            const isValidUser = username.length >= 3 && username.length <= 20;
            const isValidPassword = password.length >= 6 && password.length <= 20;

            if (isValidUser && isValidPassword) {
                // 保存登录状态
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', username);
                localStorage.setItem('userToken', 'simulated_token_' + Date.now());

                // 显示登录成功提示
                showStatus('success', '登录成功，正在跳转...', statusIcons.success);

                // 延迟跳转，让用户看到成功提示
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // 显示登录失败提示
                showStatus('error', '用户名或密码错误，请重试', statusIcons.error);

                // 恢复登录按钮状态
                loginBtn.disabled = false;
                loginBtn.textContent = '登录';
            }
        }, 1000);
    }
});

// 输入框回车登录
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginBtn').click();
    }
});
