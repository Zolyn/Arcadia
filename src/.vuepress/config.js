const moment = require('moment');

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
                "How it felt when you walked on water? Did you get your wish?",
                "Lycoris Radiata."
            ],
            sns: {
                github: 'PikaSama',
                bilibili: '163044485',
                neteasecm: '416843684',
                email: 'pikasama@qq.com'
            }
        },
        homeHeaderImages: [
            {
                "path":"https://cdn.jsdelivr.net/gh/PikaSama/homepage-static@2.0.0/images/bg.png"
            }
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
        comment: {
            platform: 'github-v4',
            owner: 'Zolyn',
            repo: 'Arcadia',
            clientId: 'e80da0c863ea637322d0',
            clientSecret: 'c96003743e530449af0c718ca6d4503a45306e2a'
        }
    },
    plugins: {
        '@vuepress/last-updated': {
            transformer: (timestamp) => moment(timestamp).add(8, 'h').format('YYYY-MM-DD HH:mm:ss A')
        },
        '@Zolyn/vuepress-plugin-waline': {
            serverURL: 'https://blog-comment.zorinchan.icu'
        }
    }
}