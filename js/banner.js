document.addEventListener('DOMContentLoaded', function() {
    const bannerSlider = document.getElementById('bannerSlider');
    const bannerItems = document.querySelectorAll('.banner-item');
    const dotsContainer = document.getElementById('bannerDots');

    // 创建轮播图指示点
    if (dotsContainer && bannerItems.length > 0) {
        // 清空指示点容器
        dotsContainer.innerHTML = '';

        // 为每个轮播项创建指示点
        bannerItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('banner-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                showSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    // 当前显示的轮播项索引
    let currentIndex = 0;

    // 显示指定索引的轮播项
    function showSlide(index) {
        // 隐藏所有轮播项
        bannerItems.forEach(item => item.classList.remove('active'));

        // 更新指示点
        document.querySelectorAll('.banner-dot').forEach(dot => dot.classList.remove('active'));

        // 显示当前轮播项
        bannerItems[index].classList.add('active');
        document.querySelectorAll('.banner-dot')[index].classList.add('active');

        // 更新当前索引
        currentIndex = index;
    }

    // 自动轮播
    function autoPlay() {
        currentIndex = (currentIndex + 1) % bannerItems.length;
        showSlide(currentIndex);
    }

    // 设置自动轮播定时器
    let autoPlayTimer = setInterval(autoPlay, 3000);

    // 鼠标悬停时暂停自动轮播
    bannerSlider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayTimer);
    });

    // 鼠标离开时恢复自动轮播
    bannerSlider.addEventListener('mouseleave', () => {
        autoPlayTimer = setInterval(autoPlay, 3000);
    });

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    bannerSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    bannerSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // 向左滑动，显示下一张
            currentIndex = (currentIndex + 1) % bannerItems.length;
            showSlide(currentIndex);
        } else if (touchEndX > touchStartX + 50) {
            // 向右滑动，显示上一张
            currentIndex = (currentIndex - 1 + bannerItems.length) % bannerItems.length;
            showSlide(currentIndex);
        }
    }
});
