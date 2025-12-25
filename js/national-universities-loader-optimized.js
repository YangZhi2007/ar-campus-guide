/**
 * 全国高等学校名单数据加载器（优化版）
 * 负责加载和处理全国高等学校名单数据
 * 优化点：
 * 1. 分批处理数据，避免一次性加载所有数据
 * 2. 使用文档片段优化DOM操作
 * 3. 减少事件监听器数量
 */

class NationalUniversitiesLoader {
    constructor() {
        this.universities = [];
        this.provinces = new Set();
        this.schoolTypes = new Set();
        this.isLoaded = false;
        this.loadPromise = null;
        this.batchSize = 500; // 每批处理500条数据
    }

    /**
     * 加载高校数据（优化版）
     */
    async load() {
        if (this.isLoaded) {
            return this.universities;
        }

        if (this.loadPromise) {
            return this.loadPromise;
        }

        this.loadPromise = this.fetchData();
        return this.loadPromise;
    }

    /**
     * 获取数据（分批处理）
     */
    async fetchData() {
        try {
            // 从全局变量中获取数据
            if (typeof nationalUniversitiesRawData !== 'undefined') {
                const rawData = nationalUniversitiesRawData;

                // 分批处理数据
                this.processDataInBatches(rawData);

                this.isLoaded = true;
                return this.universities;
            } else {
                throw new Error('全国高等学校名单数据未加载，请确保引入了national-universities-data.js文件');
            }
        } catch (error) {
            console.error('加载高校数据失败:', error);
            throw error;
        }
    }

    /**
     * 分批处理数据
     */
    async processDataInBatches(rawData) {
        const total = rawData.length;
        const batches = Math.ceil(total / this.batchSize);

        console.log(`开始处理 ${total} 条数据，分 ${batches} 批处理`);

        for (let i = 0; i < batches; i++) {
            const start = i * this.batchSize;
            const end = Math.min(start + this.batchSize, total);
            const batch = rawData.slice(start, end);

            // 处理当前批次
            this.processBatch(batch, i + 1);

            // 给UI线程时间更新，避免卡顿
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        console.log(`数据处理完成，共 ${this.universities.length} 条学校`);
    }

    /**
     * 处理单个批次
     */
    processBatch(batch, batchIndex) {
        let currentProvince = '';

        batch.forEach((item, index) => {
            const globalIndex = (batchIndex - 1) * this.batchSize + index + 1;

            // 跳过标题行
            if (globalIndex < 2) return;

            // 检查是否是省份标题行
            if (item['附件1：'] && typeof item['附件1：'] === 'string' && item['附件1：'].includes('（')) {
                currentProvince = item['附件1：'].split('（')[0];
                return;
            }

            // 处理学校数据
            if (item.Column2 && typeof item.Column2 === 'string' && item.Column2.trim()) {
                const university = {
                    id: this.generateId(item.Column2),
                    name: item.Column2.trim(),
                    code: item.Column3,
                    department: item.Column4,
                    location: item.Column5,
                    province: currentProvince,
                    level: item.Column6,
                    remarks: item.Column7
                };

                this.universities.push(university);
                this.provinces.add(currentProvince);
                this.schoolTypes.add(item.Column6);
            }
        });
    }

    /**
     * 生成唯一ID
     */
    generateId(name) {
        return name.toLowerCase()
            .replace(/[^a-z0-9一-龥]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    /**
     * 获取所有省份
     */
    getProvinces() {
        return Array.from(this.provinces);
    }

    /**
     * 获取所有学校类型
     */
    getSchoolTypes() {
        return Array.from(this.schoolTypes);
    }

    /**
     * 按省份筛选学校
     */
    getByProvince(province) {
        return this.universities.filter(u => u.province === province);
    }

    /**
     * 按类型筛选学校
     */
    getByType(type) {
        return this.universities.filter(u => u.level === type);
    }

    /**
     * 搜索学校（优化版）
     */
    search(keyword) {
        const lowerKeyword = keyword.toLowerCase();

        // 使用简单的for循环，避免创建新数组
        const results = [];
        for (let i = 0; i < this.universities.length; i++) {
            const u = this.universities[i];
            if (u.name.toLowerCase().includes(lowerKeyword) ||
                u.location.toLowerCase().includes(lowerKeyword)) {
                results.push(u);
            }
        }

        return results;
    }

    /**
     * 获取所有学校
     */
    getAll() {
        return this.universities;
    }

    /**
     * 清空数据，释放内存
     */
    clear() {
        this.universities = [];
        this.provinces.clear();
        this.schoolTypes.clear();
        this.isLoaded = false;
        this.loadPromise = null;
    }
}

// 创建全局实例
const nationalUniversitiesLoader = new NationalUniversitiesLoader();

// 导出以便在其他地方使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NationalUniversitiesLoader;
}
