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
            normalActions: [
                {
                    title: '博客源码',
                    handler() {
                        window.open('https://github.com/Zolyn/Arcadia');
                    }
                },
                {
                    title: '好康的',
                    handler() {
                        window.open('https://www.bilibili.com/video/BV1uT4y1P7CX');
                    }
                }
            ],
            eventActions: {
                link: [
                    {
                        title: '在新标签页中打开链接',
                        handler() {
                            window.open(this.currentLink);
                        },
                    },
                    {
                        title: '复制链接',
                        handler() {
                            this.clipboard = this.currentLink;
                            this.$nextTick(() => {
                                this.copy();
                            });
                        },
                    },
                ],
                image: [
                    {
                        title: '在新标签页中打开图像',
                        handler() {
                            window.open(this.currentImage);
                        },
                    },
                    {
                        title: '复制图像链接',
                        handler() {
                            this.clipboard = this.currentImage;
                            this.$nextTick(() => {
                                this.copy();
                            });
                        },
                    },
                ],
            },
            stickyActions: [
                {
                    title: '切换主题',
                    handler() {
                        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                        if (this.$vuetify.theme.dark) {
                            document.body.setAttribute('data-theme', 'dark');
                        } else {
                            document.body.setAttribute('data-theme', 'light');
                        }
                    },
                },
            ],
        }
    }
}