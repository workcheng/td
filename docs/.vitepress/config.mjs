import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "云站速递",
  description: "云站速递 | 我们致力于创造令人惊叹的用户体验",

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon-dark.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-dark.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: '云站速递 | 我们致力于创造令人惊叹的用户体验' }],
    ['meta', { property: 'og:site_name', content: '云站速递' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/favicon-dark.svg', width: 24, height: 24 },
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' },
      { text: '联系我', link: '/contact-me' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: '使用宝塔Webhook自动同步Git仓库', link: '/notes/202403/使用宝塔Webhook自动同步Git仓库' },
          { text: 'JVM的基础入门', link: '/notes/202403/JVM的基础入门' },
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
