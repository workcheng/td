import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "云站速递",
  description: "云站速递，建造快乐",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/favicon-dark.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' },
      { text: '联系我', link: '/contact-me' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: '使用宝塔Webhook自动同步Git仓库', link: '/notes/202403/0326' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/workcheng' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2018-present Andy Cheng'
    }
  }
})
