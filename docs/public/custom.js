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