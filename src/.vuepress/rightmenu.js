module.exports = {
    transition: 'x',
    dense: true,
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
                handler: function (inst) {
                    window.open(inst.currentLink);
                },
            },
            {
                title: '复制链接',
                handler: function (inst) {
                    inst.clipboard = inst.currentLink;
                    inst.$nextTick(() => {
                        inst.copy();
                    });
                },
            },
        ],
        image: [
            {
                title: '在新标签页中打开图像',
                handler: function (inst) {
                    window.open(inst.currentImage);
                },
            },
            {
                title: '复制图像链接',
                handler: function (inst) {
                    inst.clipboard = inst.currentImage;
                    inst.$nextTick(() => {
                        inst.copy();
                    });
                },
            },
        ],
    },
    stickyActions: [
        {
            icon: 'mdi-weather-night',
            title: '切换主题',
            handler: function (inst) {
                inst.$vuetify.theme.dark = !inst.$vuetify.theme.dark;
                if (inst.$vuetify.theme.dark) {
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