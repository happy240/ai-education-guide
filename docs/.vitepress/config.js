export default {
  title: 'AI 教育指南',
  description: '面向不同群体的 AI 教育指南',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/happy240/ai-education-guide' }
    ],
    
    // 侧边栏配置
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '教师指南', link: '/teachers_guide.html' },
          { text: '家长指南', link: '/parents_guide.html' },
          { text: '中学生指南', link: '/middle_school_guide.html' },
          { text: '小学生指南', link: '/primary_student_guide.html' }
        ]
      }
    ],
    
    // 页脚配置
    footer: {
      message: `
        Write and generate with ❤️ | 基于 MIT 许可发布<br>
        <span id="busuanzi_container_site_pv" style="display:inline;">
          总访问量 <span id="busuanzi_value_site_pv"></span> 次
        </span> | 
        <span id="busuanzi_container_site_uv" style="display:inline;">
          访客数 <span id="busuanzi_value_site_uv"></span> 人
        </span>
      `,
      copyright: 'Copyright © 2024'
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/happy240/ai-education-guide' }
    ],

    // 文档特性
    outline: {
      level: [2, 3],
      label: '目录'
    },
    
    // 导航栏标题
    siteTitle: 'AI 教育指南',
    
    // 返回顶部按钮
    returnToTopLabel: '返回顶部',
    
    // 上/下一页
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['script', { 
      src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
      async: true,
      defer: true
    }],
    ['script', { src: '/custom.js' }]
  ],
  
  appearance: true,
  
  markdown: {
    lineNumbers: true,
    anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' },
    toc: { includeLevel: [1, 2, 3] },
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
} 