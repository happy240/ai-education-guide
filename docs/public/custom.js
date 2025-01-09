// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 创建阅读量显示的容器
    const viewContainer = document.createElement('div');
    viewContainer.style.cssText = 'text-align: right; font-size: 0.8em; color: #888; margin-top: 20px;';
    
    // 添加阅读量统计
    viewContainer.innerHTML = `
        <span id="busuanzi_container_page_pv" style="display: inline;">
            阅读量: <span id="busuanzi_value_page_pv"></span>
        </span>
    `;
    
    // 找到版本信息的div
    const versionDiv = document.querySelector('div[style*="text-align: right"][style*="font-size: 0.8em"]');
    if (versionDiv) {
        // 在版本信息前插入阅读量统计
        versionDiv.insertBefore(viewContainer, versionDiv.firstChild);
    }
});

// 为hero-image添加鼠标互动效果
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('svg');
    if (!heroImage) return;

    // AI机器人元素
    const robot = heroImage.querySelector('g[transform*="translate(500, 200)"]');
    // 植物元素
    const plant = heroImage.querySelector('g[transform*="translate(300, 200)"]');
    // 装饰性粒子
    const particles = heroImage.querySelectorAll('circle[fill="#FFB74D"]');

    // 鼠标移动时的交互效果
    document.addEventListener('mousemove', function(e) {
        const rect = heroImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 计算鼠标位置相对于SVG中心的偏移
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (x - centerX) / 50;
        const offsetY = (y - centerY) / 50;

        // AI机器人跟随鼠标轻微移动
        if (robot) {
            robot.style.transform = `translate(${500 + offsetX}px, ${200 + offsetY}px)`;
        }

        // 植物轻微摆动
        if (plant) {
            plant.style.transform = `translate(${300 + offsetX * 0.5}px, ${200 + offsetY * 0.5}px)`;
        }

        // 粒子随鼠标移动产生波动效果
        particles.forEach((particle, index) => {
            const angle = (index / particles.length) * Math.PI * 2;
            const distance = Math.sin(Date.now() / 1000 + index) * 5;
            particle.style.transform = `translate(${Math.cos(angle) * distance + offsetX}px, ${Math.sin(angle) * distance + offsetY}px)`;
        });
    });

    // 鼠标悬停时的发光效果
    heroImage.addEventListener('mouseover', function() {
        const glowElements = heroImage.querySelectorAll('[filter*="glow"], [filter*="aiGlow"]');
        glowElements.forEach(element => {
            element.style.filter = 'brightness(1.2) ' + element.style.filter;
        });
    });

    // 鼠标移出时恢复正常
    heroImage.addEventListener('mouseout', function() {
        const glowElements = heroImage.querySelectorAll('[filter*="glow"], [filter*="aiGlow"]');
        glowElements.forEach(element => {
            element.style.filter = element.style.filter.replace('brightness(1.2) ', '');
        });
    });
}); 