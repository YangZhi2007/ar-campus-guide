/**
 * 底部导航栏功能模块
 * 负责处理底部导航栏的激活状态和主题切换
 */

// 更新底部导航栏激活状态
function updateFooterNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    // 移除所有激活状态
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 设置当前页面的激活状态
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        const page = item.getAttribute('data-page');
        
        // 根据页面类型判断
        if (page === 'index' && (currentPath === 'index.html' || currentPath === '' || currentPath === '/')) {
            item.classList.add('active');
        } else if (page === 'school' && currentPath.includes('school')) {
            item.classList.add('active');
        } else if (page === 'forum' && currentPath.includes('forum')) {
            item.classList.add('active');
        } else if (page === 'user' && currentPath.includes('user')) {
            item.classList.add('active');
        }
    });
    
    // 更新导航指示器位置
    updateNavIndicator();
}

// 更新导航指示器位置
function updateNavIndicator() {
    const activeItem = document.querySelector('.nav-item.active');
    const indicator = document.querySelector('.nav-indicator');
    
    if (activeItem && indicator) {
        const itemRect = activeItem.getBoundingClientRect();
        const navRect = activeItem.parentElement.getBoundingClientRect();
        
        indicator.style.left = itemRect.left + 'px';
        indicator.style.width = itemRect.width + 'px';
        indicator.style.opacity = '1';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    updateFooterNav();
});

// 监听路径变化
window.addEventListener('popstate', updateFooterNav);

// 监听URL变化
window.addEventListener('hashchange', updateFooterNav);
