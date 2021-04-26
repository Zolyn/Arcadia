const moment = require('moment');
const { resolve } = require('path');
const version = '2021.4.26-release.0'
module.exports = {
    title: 'Arcadia',
    description: 'My wonderland.',
    head: [
        ['link', { rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/PikaSama/blog-static-customs@2.0.1/hexo/images/icon.png' }]
    ],
    evergreen: true,
    themeConfig: {
        repo: 'PikaSama/Arcadia',
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
                email: 'pikasama@qq.com',
                customize: [
                    {
                        icon: 'ri-bilibili-fill',
                        link: 'https://music.163.com/#/user/home?id=416843684'
                    },
                    {
                        icon: 'ri-netease-cloud-music-fill',
                        link: 'https://space.bilibili.com/163044485'
                    }
                ]
            }
        },
        homeHeaderImages: [
            {
                "path":`https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg1.jpg`
            },
            {
                "path":`https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg2.png`
            },
            {
                "path":`https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg3.png`
            },
            {
                "path":`https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg4.png`
            },
            {
                "path":`https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@${version}/vuepress/images/bg5.jpg`
            },
        ],
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
        pages: {
            tags: {
                subtitle: '哟呼，这里是标签页~'
            },
            links: {
                subtitle: '诶嘿，这里是链接页~'
            }
        },
        hitokoto: true,
    },
    plugins: {
        '@vuepress/last-updated': {
            transformer: (timestamp) => moment(timestamp).add(8, 'h').format('YYYY-MM-DD HH:mm:ss A')
        },
        '@zolyn/vuepress-plugin-waline': {
            plugin: {
                debug: true
            },
            comment: {
                serverURL: 'https://blog-comment.zorinchan.icu'
            }
        },
        '@zolyn/vuepress-plugin-rightmenu': {
            config: resolve(__dirname, 'rightmenu.js')
        }
    }
}