module.exports = {
    normalActions: [
        {
            title: '博客源码',
            handler() {
                window.open('https://github.com/Zolyn/Arcadia');
            }
        },
        {
            title: '好康的',
            handler: function () {
                window.open('https://www.bilibili.com/video/BV1uT4y1P7CX');
            }
        }
    ],
    eventActions: {
        link: [
            {
                title: '在新标签页中打开链接',
                handler: function () {
                    window.open(this.currentLink);
                },
            },
            {
                title: '复制链接',
                handler: function () {
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
                handler: function () {
                    window.open(this.currentImage);
                },
            },
            {
                title: '复制图像链接',
                handler: function () {
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
            handler: function () {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                if (this.$vuetify.theme.dark) {
                    document.body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('mode', 'dark');
                } else {
                    document.body.setAttribute('data-theme', 'light');
                    localStorage.setItem('mode', 'light');
                }
            },
        },
    ]
}