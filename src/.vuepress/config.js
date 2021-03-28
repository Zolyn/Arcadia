module.exports = {
    title: 'Arcadia',
    description: 'My wonderland.',
    theme: 'gungnir',
    head: [
        ['link', { rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/PikaSama/blog-static-customs@2.0.1/hexo/images/icon.png' }]
    ],
    evergreen: true,
    themeConfig: {
        personalInfo: {
            name: "Zorin",
            avatar: "https://cdn.jsdelivr.net/gh/PikaSama/blog-static-customs@latest/vuepress/images/avatar3.png",
            description: "The worst pupil.",
            sns: {
                github: 'PikaSama',
                email: 'pikasama@qq.com'
            }
        },
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
        hitokoto: true
    }
}