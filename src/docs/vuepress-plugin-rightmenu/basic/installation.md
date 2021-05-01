---
title: 安装
date: 2021-05-01
---
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
<code-block title="对象式" active>
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
<code-block title="对象式" active>
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