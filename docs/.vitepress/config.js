export default {
  title: 'AI Education Guide | AI 教育指南',
  description: 'AI Education Guide for Different Groups | 面向不同群体的 AI 教育指南',

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: 'GitHub', link: 'https://github.com/happy240/ai-education-guide' }
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '教师指南', link: '/teachers_guide' },
              { text: '家长指南', link: '/parents_guide' },
              { text: '中学生指南', link: '/middle_school_guide' },
              { text: '小学生指南', link: '/primary_student_guide' }
            ]
          }
        ],
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
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outline: {
          label: '目录'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'GitHub', link: 'https://github.com/happy240/ai-education-guide' }
        ],
        sidebar: [
          {
            text: 'Guides',
            items: [
              { text: 'Teachers Guide', link: '/en/teachers_guide' },
              { text: 'Parents Guide', link: '/en/parents_guide' },
              { text: 'Middle School Guide', link: '/en/middle_school_guide' },
              { text: 'Primary Student Guide', link: '/en/primary_student_guide' }
            ]
          }
        ],
        footer: {
          message: `
            Write and generate with ❤️ | Released under MIT License<br>
            <span id="busuanzi_container_site_pv" style="display:inline;">
              Total Visits: <span id="busuanzi_value_site_pv"></span>
            </span> | 
            <span id="busuanzi_container_site_uv" style="display:inline;">
              Unique Visitors: <span id="busuanzi_value_site_uv"></span>
            </span>
          `,
          copyright: 'Copyright © 2024'
        },
        docFooter: {
          prev: 'Previous Page',
          next: 'Next Page'
        },
        outline: {
          label: 'On this page'
        }
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/happy240/ai-education-guide' }
    ],
    outline: {
      level: [2, 3]
    },
    siteTitle: 'AI Education Guide | AI 教育指南'
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