---
title: 配置
date: 2021-05-02
---
## 前言
本插件的配置系统可自定义性强，对于其他的一些右键菜单组件而言，它们或许只会提供一个`prop`用于传递链接到某个选项的a标签的`href`属性上，而我并不会这样做，我选择提供一个点击回调函数，你可以在这个函数里做很多事情。

而这样也带来一个问题，我在测试过程中发现`.vuepress/config.js`中配置的回调函数在`build`过程会被过滤掉，Vuepress的官方仓库里也有相似的 [Issue](https://github.com/vuejs/vuepress/issues/1643) 。

所以我想到了一个解决方案，在外部写一个配置文件，在`.vuepress/config.js`中提供配置文件的绝对路径，让插件自己去导入外部的配置文件，果不其然，这个方案是有效的。

## 配置文件
为了给插件提供配置文件，你需要新建一个`.js`格式的文件，并导出一个包含了插件选项的对象。这里以`.vuepress/rightmenu.js`为例，该示例配置了插件的默认菜单栏。
```js
// .vuepress/rightmenu.js
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
            handler() {
                window.open('https://www.bilibili.com/video/BV1uT4y1P7CX');
            }
        }
    ]
}
```

然后，你需要在`.vuepress/config.js`中做如下配置

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

# 配置项
## iconBar
图标栏配置，是一个包含对象的数组
- 类型：`Object[]`

### iconBar[i].icon
图标名称
- 类型：`String`

### iconBar[i].handler
图标点击回调函数
- 类型：`Function`

## normalActions
默认图标栏
- 类型：`Object[]`

### normalActions[i].title
选项的标题
- 类型：`String`

### normalActions[i].handler
选项的点击回调函数
- 类型：`Function`

## eventActions
对点击的特定元素显示相应的菜单栏的配置，是一个包含多个对象数组的对象
- 类型：`Object<Object[]>`

### eventActions.link
在点击a标签时显示的菜单栏
- 类型：`Object[]`

### eventActions.image
在点击图片时显示的菜单栏
- 类型：`Object[]`

## stickyActions
常驻菜单栏配置
- 类型：`Object[]`

::: tip
`eventActions.link`，`eventActions.image`和`stickyActions`的配置与`normalActions`一致，故不多做赘述
:::

::: tip
插件使用`Function.prototype.call()`方法来执行回调函数，所以你在函数里使用的`this`，它会被绑定到组件实例上 ，因此你可以用`this`来访问Vuepress的全局计算属性[^computed] 或其他数据
:::

[^computed]: 详情见 [全局计算属性](https://v1.vuepress.vuejs.org/zh/guide/global-computed.html#site) 和 [网站和页面的元数据](https://v1.vuepress.vuejs.org/zh/theme/writing-a-theme.html#%E7%BD%91%E7%AB%99%E5%92%8C%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%85%83%E6%95%B0%E6%8D%AE)