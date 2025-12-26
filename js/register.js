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
    let isConfirmPasswordVisible = false;

    // 密码显示/隐藏切换
    document.getElementById('togglePassword').addEventListener('click', function() {
        isPasswordVisible = !isPasswordVisible;
        const passwordInput = document.getElementById('password');
        const eyeIcon = this.querySelector('.eye-icon path');

        if (isPasswordVisible) {
            passwordInput.type = 'text';
            // 切换到闭眼图标
            eyeIcon.setAttribute('d', 'M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3z');
        } else {
            passwordInput.type = 'password';
            // 切换到睁眼图标
            eyeIcon.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-4.39 0-8-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3z');
        }
    });

    // 确认密码显示/隐藏切换
    document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
        isConfirmPasswordVisible = !isConfirmPasswordVisible;
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const eyeIcon = this.querySelector('.eye-icon path');

        if (isConfirmPasswordVisible) {
            confirmPasswordInput.type = 'text';
            // 切换到闭眼图标
            eyeIcon.setAttribute('d', 'M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3z');
        } else {
            confirmPasswordInput.type = 'password';
            // 切换到睁眼图标
            eyeIcon.setAttribute('d', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-4.39 0-8-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3z');
        }
    });

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

// 邮箱验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 注册按钮点击事件
document.getElementById('registerBtn').addEventListener('click', function() {
    // 清除之前的错误提示
    clearErrors();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    let isValid = true;

    // 用户名验证
    if (!username) {
        showError('username', '请输入用户名');
        isValid = false;
    } else if (username.length < 3) {
        showError('username', '用户名至少3个字符');
        isValid = false;
    } else if (username.length > 20) {
        showError('username', '用户名最多20个字符');
        isValid = false;
    }

    // 邮箱验证
    if (!email) {
        showError('email', '请输入邮箱');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', '请输入有效的邮箱地址');
        isValid = false;
    }

    // 密码验证
    if (!password) {
        showError('password', '请输入密码');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', '密码至少6个字符');
        isValid = false;
    } else if (password.length > 20) {
        showError('password', '密码最多20个字符');
        isValid = false;
    }

    // 确认密码验证
    if (!confirmPassword) {
        showError('confirmPassword', '请确认密码');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', '两次输入的密码不一致');
        isValid = false;
    }

    // 表单验证通过
    if (isValid) {
        // 显示加载状态
        const registerBtn = document.getElementById('registerBtn');
        registerBtn.disabled = true;
        registerBtn.textContent = '注册中...';

        // 模拟注册请求（实际需要对接后端API）
        setTimeout(() => {
            // 模拟注册验证
            // 在实际应用中，这里应该调用后端API进行注册
            // 这里我们模拟注册成功

            // 显示注册成功提示
            showStatus('success', '注册成功，正在跳转到登录页面...', statusIcons.success);

            // 延迟跳转到登录页面，让用户看到成功提示
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }, 1000);
    }
});

// 输入框回车注册
document.getElementById('confirmPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('registerBtn').click();
    }
});
