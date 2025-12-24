// OrbitControls占位符
// 实际应用中应该从Three.js官方示例中获取

THREE.OrbitControls = function(camera, domElement) {
    this.enableDamping = false;
    this.dampingFactor = 0;
    this.minDistance = 0;
    this.maxDistance = 0;
    this.maxPolarAngle = 0;
    this.update = function() {};
    this.dispose = function() {};

    console.warn('OrbitControls为占位符，请下载完整版本');
};
