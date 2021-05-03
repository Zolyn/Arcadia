---
title: 安装
date: 2021-05-01
---
::: tip 使用须知
在使用本插件前，你需要知晓以下几点：
- 配置本插件需要一定的JS，Vue基础知识
- 插件使用了Vuetify组件库，该组件库使用了CSS重置，会对博客原主题的样式造成一定的影响，我已删除一些影响较大的样式规则来让样式的影响最小化
- 如果你发现插件携带的样式规则对你的主题样式造成了一定影响（博客观感影响明显等），请在 [Issue](https://github.com/Zolyn/vuepress-plugin-rightmenu/issues) 中反馈，我会尽量去修复这个问题
:::

你可以使用npm, yarn, pnpm等包管理器安装插件，我推荐使用 [yarn](https://yarnpkg.com/) 或 [pnpm](https://pnpm.io)

<code-group>
<code-block title="NPM">
```bash
npm install -D @zolyn/vuepress-plugin-rightmenu
```
</code-block>

<code-block title="YARN" active>
```bash
yarn add -D @zolyn/vuepress-plugin-rightmenu
```
</code-block>

<code-block title="PNPM">
```bash
pnpm add -D @zolyn/vuepress-plugin-rightmenu
```
</code-block>
</code-group>

安装完成后，在vuepress的配置文件中添加如下代码

<code-group>
<code-block title="对象式">
```js {6-9}
// .vuepress/config.js
const { resolve } = require('path');

module.exports = {
    plugins: {
        '@zolyn/rightmenu': {
            // 配置文件路径
            config: resolve(__dirname, './rightmenu.js')
        }
    }
}
```
</code-block>

<code-block title="Babel式">
```js {6-12}
// .vuepress/config.js
const { resolve } = require('path');

module.exports = {
    plugins: [
        [
            '@zolyn/rightmenu',
            {
                // 配置文件路径
                config: resolve(__dirname, './rightmenu.js')
            }
        ]
    ]
}
```
</code-block>
</code-group>

你也可以直接使用插件的默认设置

<code-group>
<code-block title="对象式">
```js {4}
// .vuepress/config.js
module.exports = {
    plugins: {
        '@zolyn/rightmenu': {}
    }
}
```
</code-block>

<code-block title="Babel式">
```js {4}
// .vuepress/config.js
module.exports = {
    plugins: [
        ['@zolyn/rightmenu']
    ]
}
```
</code-block>
</code-group>

如果你想了解更多的插件配置方式，请阅读下一篇文档