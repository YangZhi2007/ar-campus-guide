// 卸载应用功能

// 清除所有本地存储数据
function clearAllData() {
    // 清除 localStorage
    localStorage.clear();
    
    // 清除 sessionStorage
    sessionStorage.clear();
    
    // 清除所有 cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
    
    // 清除 IndexedDB
    const databases = indexedDB.databases();
    databases.then((dbs) => {
        dbs.forEach((db) => {
            indexedDB.deleteDatabase(db.name);
        });
    });
}

// 更新进度条
function updateProgress(progress, text) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    
    if (progressText) {
        progressText.textContent = text;
    }
}

// 开始卸载
function startUninstall() {
    // 禁用按钮，防止重复点击
    const cancelBtn = document.querySelector('.cancel-btn');
    const confirmBtn = document.querySelector('.confirm-btn');
    
    if (cancelBtn) cancelBtn.disabled = true;
    if (confirmBtn) confirmBtn.disabled = true;
    
    // 模拟卸载过程
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        
        switch (progress) {
            case 10:
                updateProgress(progress, '正在清除 LocalStorage 数据...');
                break;
            case 20:
                localStorage.clear();
                updateProgress(progress, 'LocalStorage 数据已清除');
                break;
            case 30:
                updateProgress(progress, '正在清除 SessionStorage 数据...');
                break;
            case 40:
                sessionStorage.clear();
                updateProgress(progress, 'SessionStorage 数据已清除');
                break;
            case 50:
                updateProgress(progress, '正在清除 Cookies 数据...');
                break;
            case 60:
                const cookies = document.cookie.split(";");
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i];
                    const eqPos = cookie.indexOf("=");
                    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                }
                updateProgress(progress, 'Cookies 数据已清除');
                break;
            case 70:
                updateProgress(progress, '正在清除 IndexedDB 数据...');
                break;
            case 80:
                const databases = indexedDB.databases();
                databases.then((dbs) => {
                    dbs.forEach((db) => {
                        indexedDB.deleteDatabase(db.name);
                    });
                });
                updateProgress(progress, 'IndexedDB 数据已清除');
                break;
            case 90:
                updateProgress(progress, '正在完成卸载...');
                break;
            case 100:
                clearInterval(interval);
                updateProgress(progress, '卸载完成！');
                
                // 显示卸载完成消息
                setTimeout(() => {
                    // 清空页面内容
                    document.body.innerHTML = '';
                    document.body.style.backgroundColor = '#fff';
                    
                    // 尝试关闭窗口（适用于Webview环境）
                    try {
                        if (window.webkit && window.webkit.messageHandlers) {
                            // iOS WebView
                            window.webkit.messageHandlers.closeApp.postMessage('{}');
                        } else if (window.Android && window.Android.closeApp) {
                            // Android WebView
                            window.Android.closeApp();
                        } else if (window.close) {
                            // 普通浏览器环境
                            window.close();
                        }
                    } catch (e) {
                        console.log('无法关闭窗口：', e);
                    }
                }, 1000);
                break;
        }
    }, 500);
}