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
        homeHeaderImages: [
            {
                "path":"https://cdn.jsdelivr.net/gh/PikaSama/homepage-static@2.0.0/images/bg.png"
            }
        ],
        pages: {
            tags: {
                subtitle: '哟呼，这里是标签页~'
            }
        },
        links: {
            subtitle: '诶嘿，这里是链接页~'
        },
        hitokoto: true
    }
}