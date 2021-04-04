const { resolve } = require('path');
module.exports = (opts) => ({
    define() {
        return {
            COMMENT_OPTIONS: opts
        }
    },
    name: '@Zolyn/vuepress-plugin-waline',
    enhanceAppFiles: resolve(__dirname, 'Comment.js')
});