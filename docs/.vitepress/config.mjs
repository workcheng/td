import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/td/",
  title: "技术交付部",
  description: "技术交付部 | 我们致力于创造令人惊叹的用户交付体验",

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/td/favicon-dark.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/td/favicon-dark.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: '技术交付部 | 我们致力于创造令人惊叹的用户交付体验' }],
    ['meta', { property: 'og:site_name', content: '技术交付部' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/favicon-dark.svg', width: 24, height: 24 },
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' },
      { text: '联系我们', link: '/contact-us' }
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

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2018-present Andy Cheng'
    }
  }
})
