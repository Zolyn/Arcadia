---
title: 介绍
date: 2021-05-01
---
vuepress-plugin-rightmenu 是一个适用于[Vuepress](https://v1.vuepress.vuejs.org/zh/) 的右键菜单插件，插件使用 [Vuetify](https://github.com/vuetifyjs/vuetify) 作为UI框架，[PureCSS](https://github.com/pure-css/pure) 作为CSS框架

<span>
<a href="https://npmjs.com/package/@zolyn/vuepress-plugin-rightmenu" target="_blank">
<img alt="npm" src="https://img.shields.io/npm/v/@zolyn/vuepress-plugin-rightmenu?style=flat-square"/>
</a>
<a href="https://npmjs.com/package/@zolyn/vuepress-plugin-rightmenu" target="_blank">
<img alt="npmscoped" src="https://img.shields.io/npm/dw/@zolyn/vuepress-plugin-rightmenu?style=flat-square"/>
</a>
<a href="https://github.com/Zolyn" target="_blank">
<img alt="author" src="https://img.shields.io/badge/author-Zorin-9cf?style=flat-square&logo=github"/>
</a>
<a href="https://github.com/Zolyn/vuepress-plugin-rightmenu" target="_blank">
<img alt="npm" src="https://img.shields.io/github/license/Zolyn/vuepress-plugin-rightmenu?style=flat-square"/>
</a>
</span>

## 图片预览
![preview](https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@2021.5.1-release.0/vuepress/images/rightmenu/preview.png)
::: center
浅色模式
:::
![preview-dark](https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@2021.5.1-release.0/vuepress/images/rightmenu/preview-dark.png)
::: center
深色模式
:::

## 演示站点
[Arcadia](https://blog.zorinchan.icu)

## 设计初衷
前一段时间我被Hexo主题 [Volantis](https://github.com/volantis-x/hexo-theme-volantis) 的右键菜单惊艳到了，于是就参考该主题的右键菜单源码和其他网上的例子进行开发

因为本人不会写css，所以选择用组件库来进行开发，在这过程中也遇到了不少麻烦，如果你对插件的开发历程感兴趣，可以到[这里]()去了解一下

## 插件特点
- 界面简洁美观（基于Material Design的Vuetify库
- 深色模式
- 样式覆盖尽可能地最小化（原主题样式覆盖最小化）
- 图片链接嗅探（图片选项栏）
- 普通链接嗅探（链接选项栏）
- 可自定义性强
    1. 图标栏可自定义（图标，点击回调函数）
    2. 默认选项栏可自定义（标题，点击回调函数）
    3. 特定的选项栏，如针对图片和链接的选项栏可自定义（标题，点击回调函数）
    4. 常驻选项栏可自定义（标题，点击回调函数）

- 待开发...

对插件有了基本的了解之后，快去看看下一篇文档吧~
