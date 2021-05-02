const moment = require('moment');
const { resolve } = require('path');
const version = '2021.5.1-release.0'

module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    title: 'Arcadia',
    description: 'My wonderland.',
    head: [
        ['link', { rel: 'icon', href: `https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/hexo/images/icon.png` }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    ],
    evergreen: true,
    themeConfig: {
        repo: 'Zolyn/Arcadia',
        docsDir: 'src',
        editLinks: true,
        lastUpdated: true,
        personalInfo: {
            name: "Zorin",
            avatar: "https://cdn.jsdelivr.net/gh/PikaSama/blog-static-customs@latest/vuepress/images/avatar3.png",
            description: [
                "Aphasiac Soul.",
                "Did you get your wish?",
                "Lycoris Radiata."
            ],
            sns: {
                github: 'Zolyn',
                email: 'zorin1477@gmail.com',
                customize: [
                    {
                        icon: 'ri-bilibili-fill',
                        link: 'https://space.bilibili.com/163044485'
                    },
                    {
                        icon: 'ri-netease-cloud-music-fill',
                        link: 'https://music.163.com/#/user/home?id=416843684'
                    }
                ]
            }
        },
        homeHeaderImages: false,
        // homeHeaderImages: [
        //     // {
        //     //     "path": `https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg1.jpg`
        //     // },
        //     // {
        //     //     "path": `https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg2.png`
        //     // },
        //     // {
        //     //     "path": `https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg3.png`
        //     // },
        //     // {
        //     //     "path": `https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg4.png`
        //     // },
        // ],
        nav: [
            {
                text: '主页',
                link: '/'
            },
            {
                text: '文档',
                items: [
                    {
                        text: 'spider-manga',
                        link: '/docs/spider-manga',
                    },
                    {
                        text: 'spider-checkupdate',
                        link: '/docs/spider-checkupdate',
                    },
                ]
            },
            {
                text: '关于',
                link: '/about'
            }
        ],
        sidebar: {
            '/docs/vuepress-plugin-rightmenu/': [
                {
                    title: '基础',
                    collapsable: false,
                    children: [
                        '',
                        'basic/installation',
                        'basic/configuration'
                    ]
                }
            ]
        },
        pages: {
            tags: {
                subtitle: '哟呼，这里是标签页~'
            },
            links: {
                subtitle: '诶嘿，这里是链接页~'
            }
        },
        hitokoto: true,
        footer: `
        &copy;<a href="https://github.com/Zolyn" target="_blank"> Zolyn</a> 💖 2020-2021
        <br>
        Powered by <a href="https://vuepress.vuejs.org" target="_blank">VuePress</a> &
        <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
        <br>
        All posts are licensed under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0 License</a>
        `
    },
    plugins: {
        '@vuepress/last-updated': {
            transformer: (timestamp) => moment(timestamp).add(8, 'h').format('YYYY-MM-DD HH:mm:ss A')
        },
        '@zolyn/waline': {
            plugin: {
                debug: true
            },
            comment: {
                serverURL: 'https://blog-comment.zorinchan.icu'
            }
        },
        '@zolyn/rightmenu': {
            config: resolve(__dirname, './rightmenu.js')
        },
        'md-enhance': {
            lineNumbers: false,
            align: true,
            sup: true,
            sub: true,
            footnote: true,
            tasklist: true,
        },
        '@mr-hope/pwa': {
            favicon: '/icon-192.png',
            themeColor: '#377bb5',
            cachePic: true,
            maxSize: 2560,
            maxPicSize: 2048,
            manifest: {
                icons: [
                    {
                        src: '/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            apple: {
                icon: '/icon-192.png',
                maskIcon: '/icon-192.png'
            },
            msTile: {
                image: '/icon-192.png'
            }
        },
        'photo-swipe': {
            container: '.theme-content',
            selector: '.theme-content :not(a) > img'
        },
        '@mr-hope/copy-code': {
            selector: '.theme-content div[class*="language-"] pre'
        }
    }
}