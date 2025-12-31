
/**
 * AI智能问答助手 - 自由窗口组件
 * 实现边缘吸附竖条和迷你窗口的交互逻辑
 */

class AIAssistant {
  constructor(options = {}) {
    // 配置参数
    this.config = {
      barWidth: 10,
      barHeight: 80,
      barCollapsedHeight: 20,
      barMargin: 4,
      windowWidth: 260,
      windowMinHeight: 120,
      windowMaxHeight: 220,
      autoHideDelay: 10000, // 10秒无操作自动收起
      ...options
    };

    // 状态管理 - 从localStorage恢复或使用默认值
    const savedState = this.loadState();
    this.state = {
      isExpanded: savedState?.isExpanded || false,
      isDragging: false,
      isListening: false,
      position: savedState?.position || 'right', // 'left' 或 'right'
      lastActivity: Date.now(),
      scrollDirection: 'none',
      lastScrollY: 0,
      barCollapsed: savedState?.barCollapsed || false,
      // 保存聊天历史
      chatHistory: savedState?.chatHistory || [],
      // 保存窗口位置
      windowPosition: savedState?.windowPosition || null
    };

    // DOM元素引用
    this.elements = {};

    // 初始化
    this.init();
  }

  /**
   * 从localStorage加载状态
   */
  loadState() {
    try {
      const stateStr = localStorage.getItem('aiAssistantState');
      if (stateStr) {
        return JSON.parse(stateStr);
      }
    } catch (error) {
      console.error('Failed to load AI assistant state:', error);
    }
    return null;
  }

  /**
   * 保存状态到localStorage
   */
  saveState() {
    try {
      const stateToSave = {
        isExpanded: this.state.isExpanded,
        position: this.state.position,
        barCollapsed: this.state.barCollapsed,
        chatHistory: this.state.chatHistory,
        windowPosition: this.state.windowPosition
      };
      localStorage.setItem('aiAssistantState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save AI assistant state:', error);
    }
  }

  /**
   * 恢复聊天历史记录
   */
  restoreChatHistory() {
    if (!this.state.chatHistory || this.state.chatHistory.length === 0) {
      return;
    }
    
    // 显示最近的对话
    const recentHistory = this.state.chatHistory.slice(-10); // 只显示最近10条
    let historyHTML = '';
    
    recentHistory.forEach(item => {
      if (item.type === 'question') {
        historyHTML += `<div class="ai-assistant-question">${item.content}</div>`;
      } else if (item.type === 'answer') {
        historyHTML += `<div class="ai-assistant-answer-text">${item.content}</div>`;
      }
    });
    
    if (historyHTML) {
      this.elements.answerArea.innerHTML = historyHTML;
    }
  }

  /**
   * 初始化组件
   */
  init() {
    this.createElements();
    this.attachEventListeners();
    this.startAutoHideTimer();
    this.updateBarPosition();
    
    // 恢复聊天历史记录
    this.restoreChatHistory();
    
    // 如果之前是展开状态，则恢复展开状态
    if (this.state.isExpanded) {
      this.showWindow();
    }
  }

  /**
   * 创建DOM元素
   */
  createElements() {
    // 创建边缘吸附竖条
    this.elements.bar = document.createElement('div');
    this.elements.bar.className = 'ai-assistant-bar';
    this.elements.bar.innerHTML = `
      <svg class="ai-assistant-bar-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.5A1.5 1.5 0 0 0 2 6.5v8A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 12.5 5H11zm-5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
    `;

    // 创建迷你窗口
    this.elements.window = document.createElement('div');
    this.elements.window.className = 'ai-assistant-window';
    this.elements.window.innerHTML = `
      <div class="ai-assistant-drag-bar"></div>
      <div class="ai-assistant-close">
        <svg class="ai-assistant-close-icon" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4.6L3.7 2.3 2.3 3.7 4.6 6 2.3 8.3l1.4 1.4L6 7.4l2.3 2.3 1.4-1.4L7.4 6l2.3-2.3-1.4-1.4L6 4.6z"/>
        </svg>
      </div>
      <div class="ai-assistant-input-area">
        <svg class="ai-assistant-mic-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0V4zm4 10.93A7.001 7.001 0 0 0 17 8h-2a5 5 0 0 1-10 0H3a7.001 7.001 0 0 0 6 6.93V17H6v1h8v-1h-3v-2.07z"/>
        </svg>
        <input type="text" class="ai-assistant-input" placeholder="输入问题或点击语音">
      </div>
      <div class="ai-assistant-quick-questions">
        <div class="ai-assistant-quick-question">卫生间在哪</div>
        <div class="ai-assistant-quick-question">图书馆几点开</div>
        <div class="ai-assistant-quick-question">食堂位置</div>
      </div>
      <div class="ai-assistant-answer-area">
        <div class="ai-assistant-answer-text">您好！我是您的校园导览助手，请问有什么可以帮您？</div>
      </div>
      <div class="ai-assistant-actions">
        <button class="ai-assistant-action-btn" style="display: none;">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor"/>
          </svg>
          导航到这里
        </button>
        <button class="ai-assistant-action-btn" style="display: none;">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor"/>
          </svg>
          一键拨号
        </button>
        <button class="ai-assistant-action-btn" style="display: none;">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor"/>
          </svg>
          设置提醒
        </button>
      </div>
    `;

    // 添加到页面
    document.body.appendChild(this.elements.bar);
    document.body.appendChild(this.elements.window);

    // 缓存窗口内部元素引用
    this.elements.dragBar = this.elements.window.querySelector('.ai-assistant-drag-bar');
    this.elements.closeBtn = this.elements.window.querySelector('.ai-assistant-close');
    this.elements.micIcon = this.elements.window.querySelector('.ai-assistant-mic-icon');
    this.elements.input = this.elements.window.querySelector('.ai-assistant-input');
    this.elements.quickQuestions = this.elements.window.querySelectorAll('.ai-assistant-quick-question');
    this.elements.answerArea = this.elements.window.querySelector('.ai-assistant-answer-area');
    this.elements.actionButtons = this.elements.window.querySelectorAll('.ai-assistant-action-btn');
  }

  /**
   * 绑定事件监听器
   */
  attachEventListeners() {
    // 竖条点击事件
    this.elements.bar.addEventListener('click', (e) => {
      if (!this.state.isDragging) {
        this.toggleWindow();
      }
    });

    // 竖条拖动事件
    this.setupDraggable(this.elements.bar, {
      onDragStart: () => {
        this.state.isDragging = true;
        this.elements.bar.classList.add('active');
      },
      onDragEnd: (position) => {
        this.state.isDragging = false;
        this.elements.bar.classList.remove('active');
        this.updateBarPosition(position);
      }
    });

    // 窗口拖动条事件
    this.setupDraggable(this.elements.dragBar, {
      onDragStart: () => {
        this.state.isDragging = true;
      },
      onDragEnd: (position) => {
        this.state.isDragging = false;
        this.snapWindowToEdge(position);
      }
    });

    // 关闭按钮事件
    this.elements.closeBtn.addEventListener('click', () => {
      this.hideWindow();
    });

    // 输入框事件
    this.elements.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.submitQuestion(this.elements.input.value);
      }
    });

    this.elements.input.addEventListener('input', () => {
      this.updateActivity();
    });

    // 快捷问句点击事件
    this.elements.quickQuestions.forEach(question => {
      question.addEventListener('click', () => {
        this.submitQuestion(question.textContent);
      });
    });

    // 麦克风图标点击事件
    this.elements.micIcon.addEventListener('click', () => {
      this.toggleVoiceInput();
    });

    // 页面滚动事件
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // 点击窗口外部区域
    document.addEventListener('click', (e) => {
      if (this.state.isExpanded && 
          !this.elements.window.contains(e.target) && 
          !this.elements.bar.contains(e.target)) {
        this.hideWindow();
      }
    });

    // 页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state.isExpanded) {
        this.hideWindow();
      }
    });
  }

  /**
   * 设置可拖动元素
   */
  setupDraggable(element, options = {}) {
    let startX, startY, initialX, initialY;

    const handleDragStart = (e) => {
      // 触摸事件或鼠标事件
      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      const rect = element.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;

      if (typeof options.onDragStart === 'function') {
        options.onDragStart();
      }

      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    };

    const handleDragMove = (e) => {
      e.preventDefault();

      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      element.style.left = `${initialX + deltaX}px`;
      element.style.top = `${initialY + deltaY}px`;
    };

    const handleDragEnd = (e) => {
      const rect = element.getBoundingClientRect();
      const position = { x: rect.left, y: rect.top };

      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);

      if (typeof options.onDragEnd === 'function') {
        options.onDragEnd(position);
      }
    };

    element.addEventListener('mousedown', handleDragStart);
    element.addEventListener('touchstart', handleDragStart, { passive: false });
  }

  /**
   * 更新竖条位置
   */
  updateBarPosition(position) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 如果没有提供位置，使用默认位置
    if (!position) {
      position = {
        x: this.state.position === 'right' 
          ? screenWidth - this.config.barWidth - this.config.barMargin
          : this.config.barMargin,
        y: (screenHeight - this.config.barHeight) / 2
      };
    }

    // 确定竖条应该吸附在哪一侧
    const centerX = position.x + this.config.barWidth / 2;
    const shouldSnapRight = centerX > screenWidth / 2;
    this.state.position = shouldSnapRight ? 'right' : 'left';
    this.saveState();

    // 设置竖条位置
 
    if (shouldSnapRight) {
      this.elements.bar.style.right = `${this.config.barMargin}px`;
      this.elements.bar.style.left = 'auto';
    } else {
      this.elements.bar.style.left = `${this.config.barMargin}px`;
      this.elements.bar.style.right = 'auto';
    }
    this.elements.bar.style.top = `${position.y}px`;

    // 更新窗口位置
    if (this.state.isExpanded) {
      this.updateWindowPosition();
    }
  }

  /**
   * 更新窗口位置
   */
  updateWindowPosition() {
    const barRect = this.elements.bar.getBoundingClientRect();
    const windowWidth = this.config.windowWidth;
    const screenHeight = window.innerHeight;

    // 根据竖条位置设置窗口位置
    if (this.state.position === 'right') {
      this.elements.window.style.right = `${window.innerWidth - barRect.left}px`;
      this.elements.window.style.left = 'auto';
    } else {
      this.elements.window.style.left = `${barRect.right}px`;
      this.elements.window.style.right = 'auto';
    }

    // 确保窗口在屏幕可见范围内
    const windowTop = Math.max(0, Math.min(barRect.top, screenHeight - this.config.windowMaxHeight));
    this.elements.window.style.top = `${windowTop}px`;
  }

  /**
   * 将窗口吸附到边缘
   */
  snapWindowToEdge(position) {
    const screenWidth = window.innerWidth;
    const windowWidth = this.config.windowWidth;
    const screenHeight = window.innerHeight;

    // 确定窗口应该吸附在哪一侧
    const centerX = position.x + windowWidth / 2;
    const shouldSnapRight = centerX > screenWidth / 2;
    this.state.position = shouldSnapRight ? 'right' : 'left';
    this.saveState();

    // 设置窗口位置
    if (shouldSnapRight) {
      this.elements.window.style.right = `${screenWidth - position.x - windowWidth}px`;
      this.elements.window.style.left = 'auto';
    } else {
      this.elements.window.style.left = `${position.x}px`;
      this.elements.window.style.right = 'auto';
    }

    // 确保窗口在屏幕可见范围内
    const windowTop = Math.max(0, Math.min(position.y, screenHeight - this.config.windowMaxHeight));
    this.elements.window.style.top = `${windowTop}px`;

    // 更新竖条位置
     if (shouldSnapRight) {
      this.elements.bar.style.right = `${this.config.barMargin}px`;
      this.elements.bar.style.left = 'auto';
    } else {
      this.elements.bar.style.left = `${this.config.barMargin}px`;
      this.elements.bar.style.right = 'auto';
    }
    this.elements.bar.style.top = `${windowTop}px`;
  }

  /**
   * 切换窗口显示状态
   */
  toggleWindow() {
    if (this.state.isExpanded) {
      this.hideWindow();
    } else {
      this.showWindow();
    }
  }

  /**
   * 显示窗口
   */
  showWindow() {
    this.state.isExpanded = true;
    this.elements.window.classList.add('show');
    this.updateWindowPosition();
    this.updateActivity();
    this.saveState();
  }

  /**
   * 隐藏窗口
   */
  hideWindow() {
    this.state.isExpanded = false;
    this.elements.window.classList.remove('show');
    this.saveState();
  }

  /**
   * 提交问题
   */
  submitQuestion(question) {
    if (!question || question.trim() === '') return;

    // 保存问题到聊天历史
    this.state.chatHistory.push({
      type: 'question',
      content: question,
      timestamp: Date.now()
    });
    this.saveState();

    // 清空输入框
    this.elements.input.value = '';

    // 显示加载状态
    this.showLoading();

    // 模拟AI回答（实际项目中应该调用后端API）
    setTimeout(() => {
      this.hideLoading();
      this.showAnswer(this.generateMockAnswer(question));
    }, 1500);
  }

  /**
   * 显示加载状态
   */
  showLoading() {
    this.elements.answerArea.innerHTML = `
      <div class="ai-assistant-loading">
        <div class="ai-assistant-spinner"></div>
        <span>AI正在思考…</span>
      </div>
    `;
    this.updateActivity();
  }

  /**
   * 隐藏加载状态
   */
  hideLoading() {
    // 加载状态会在显示答案时被替换
  }

  /**
   * 显示答案
   */
  showAnswer(answer) {
    // 保存到聊天历史
    this.state.chatHistory.push({
      type: 'answer',
      content: answer,
      timestamp: Date.now()
    });
    // 限制历史记录数量，最多保存20条
    if (this.state.chatHistory.length > 20) {
      this.state.chatHistory = this.state.chatHistory.slice(-20);
    }
    this.saveState();
    
    // 显示最新的回答
    this.elements.answerArea.innerHTML = `<div class="ai-assistant-answer-text">${answer}</div>`;
    this.updateActivity();

    // 根据问题类型显示相应的操作按钮
    this.showActionButtons(answer);
  }

  /**
   * 显示操作按钮
   */
  showActionButtons(answer) {
    // 隐藏所有按钮
    this.elements.actionButtons.forEach(btn => btn.style.display = 'none');

    // 根据答案内容显示相应的按钮
    if (answer.includes('位置') || answer.includes('在哪')) {
      this.elements.actionButtons[0].style.display = 'flex'; // 导航按钮
    } else if (answer.includes('电话')) {
      this.elements.actionButtons[1].style.display = 'flex'; // 拨号按钮
    } else if (answer.includes('时间') || answer.includes('开放')) {
      this.elements.actionButtons[2].style.display = 'flex'; // 提醒按钮
    }
  }

  /**
   * 生成模拟答案（实际项目中应该调用后端API）
   */
  generateMockAnswer(question) {
    // 简单的关键词匹配生成答案
    if (question.includes('卫生间') || question.includes('厕所')) {
      return '卫生间位置：<strong>教学楼A栋1楼东侧</strong>，步行约2分钟。';
    } else if (question.includes('图书馆')) {
      return '图书馆开放时间：<strong>周一至周五 8:00-22:00</strong>，周末 9:00-21:00。位置：<strong>校园中心区</strong>。';
    } else if (question.includes('食堂')) {
      return '食堂位置：<strong>学生活动中心1-3楼</strong>，共有3个餐厅，提供不同风味的美食。';
    } else {
      return '抱歉，我暂时无法回答这个问题。您可以尝试询问关于<strong>位置、开放时间、联系方式</strong>等方面的问题。';
    }
  }

  /**
   * 切换语音输入状态
   */
  toggleVoiceInput() {
    if (this.state.isListening) {
      this.stopVoiceInput();
    } else {
      this.startVoiceInput();
    }
  }

  /**
   * 开始语音输入
   */
  startVoiceInput() {
    // 检查浏览器是否支持语音识别
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('您的浏览器不支持语音识别功能');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'zh-CN';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onstart = () => {
      this.state.isListening = true;
      this.elements.micIcon.style.fill = '#ff4444';
      this.updateActivity();
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.submitQuestion(transcript);
    };

    this.recognition.onerror = (event) => {
      console.error('语音识别错误:', event.error);
      this.stopVoiceInput();
    };

    this.recognition.onend = () => {
      this.stopVoiceInput();
    };

    this.recognition.start();
  }

  /**
   * 停止语音输入
   */
  stopVoiceInput() {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
    this.state.isListening = false;
    this.elements.micIcon.style.fill = '';
    this.updateActivity();
  }

  /**
   * 处理页面滚动
   */
  handleScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - this.state.lastScrollY;

    // 确定滚动方向
    if (scrollDelta > 0) {
      this.state.scrollDirection = 'down';
    } else if (scrollDelta < 0) {
      this.state.scrollDirection = 'up';
    }

    this.state.lastScrollY = currentScrollY;

    // 向下滚动时折叠竖条
    if (this.state.scrollDirection === 'down' && !this.state.barCollapsed) {
      this.state.barCollapsed = true;
      this.elements.bar.style.height = `${this.config.barCollapsedHeight}px`;
    } else if (this.state.scrollDirection === 'up' && this.state.barCollapsed) {
      this.state.barCollapsed = false;
      this.elements.bar.style.height = `${this.config.barHeight}px`;
    }
  }

  /**
   * 更新活动时间
   */
  updateActivity() {
    this.state.lastActivity = Date.now();
  }

  /**
   * 启动自动隐藏计时器
   */
  startAutoHideTimer() {
    setInterval(() => {
      const now = Date.now();
      const idleTime = now - this.state.lastActivity;

      // 如果超过配置的延迟时间且窗口处于展开状态，则自动收起
      if (idleTime > this.config.autoHideDelay && this.state.isExpanded) {
        this.hideWindow();
      }
    }, 1000);
  }

  /**
   * 销毁组件
   */
  destroy() {
    // 移除DOM元素
    if (this.elements.bar && this.elements.bar.parentNode) {
      this.elements.bar.parentNode.removeChild(this.elements.bar);
    }
    if (this.elements.window && this.elements.window.parentNode) {
      this.elements.window.parentNode.removeChild(this.elements.window);
    }

    // 停止语音识别
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
  }
}

// 导出组件类
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIAssistant;
}

// 单例模式实现
let aiAssistantInstance = null;

/**
 * 获取AI助手单例实例
 * @param {Object} options - 配置参数
 * @returns {AIAssistant} AI助手实例
 */
function getAIAssistant(options = {}) {
  if (!aiAssistantInstance) {
    aiAssistantInstance = new AIAssistant(options);
  }
  return aiAssistantInstance;
}

// 将获取单例的函数挂载到window对象上
if (typeof window !== 'undefined') {
  window.getAIAssistant = getAIAssistant;
  
  // 自动初始化（如果尚未初始化）
  document.addEventListener('DOMContentLoaded', function() {
    if (!aiAssistantInstance) {
      window.aiAssistant = getAIAssistant();
    }
  });
}
