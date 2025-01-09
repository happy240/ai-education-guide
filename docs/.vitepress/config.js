export default {
  title: 'AI 教育指南',
  description: '面向不同群体的 AI 教育指南',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/happy240/ai-education-guide' }
    ],
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
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024'
    }
  },
  head: [
    ['script', { src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }],
    ['script', { src: '/custom.js' }]
  ]
} 