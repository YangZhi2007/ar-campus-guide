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
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.footer-nav .nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath || 
            (currentPath.includes(href) && href !== '/') ||
            (currentPath.endsWith('/') && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
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
