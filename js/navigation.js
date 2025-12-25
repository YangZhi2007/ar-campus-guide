// 导航栏交互功能

// 顶部导航栏滚动效果
function handleHeaderScroll() {
    const headerNav = document.querySelector('.header-nav');
    if (!headerNav) return;

    if (window.scrollY > 10) {
        headerNav.classList.add('scrolled');
    } else {
        headerNav.classList.remove('scrolled');
    }
}

// 更新底部导航栏激活状态
function updateFooterNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.footer-nav .nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        const page = item.getAttribute('data-page');
        // 根据页面类型判断
        if (page === 'index' && (currentPath === 'index.html' || currentPath === '' || currentPath === '/')) { 
        } else if (page === 'school' && currentPath.includes('school')) {
            item.classList.add('active');
        } else if (page === 'forum' && currentPath.includes('forum')) {
            item.classList.add('active');
        } else if (page === 'user' && currentPath.includes('user')) {
            item.classList.add('active');
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化顶部导航栏滚动效果
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // 初始化底部导航栏激活状态
    updateFooterNav();
});

// 页面切换时更新底部导航栏
window.addEventListener('popstate', updateFooterNav);
