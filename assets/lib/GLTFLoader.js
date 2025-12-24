// GLTFLoader占位符
// 实际应用中应该从Three.js官方示例中获取

THREE.GLTFLoader = function() {
    this.load = function(url, onLoad, onProgress, onError) {
        console.warn('GLTFLoader为占位符，请下载完整版本');
        if (onError) {
            setTimeout(() => {
                onError(new Error('GLTFLoader库为占位符，请下载完整版本'));
            }, 500);
        }
    };
};
