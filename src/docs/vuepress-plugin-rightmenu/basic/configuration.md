---
title: 配置
date: 2021-05-02
---
本插件的配置系统可自定义性强，对于其他的一些右键菜单组件而言，它们或许只会提供一个`prop`用于传递链接到某个选项的a标签的`href`属性上，而我并不会这样做，我选择提供一个点击回调函数，你可以在这个函数里做很多事情。

而这样也带来一个问题，我在测试过程中发现`.vuepress/config.js`中配置的回调函数在`build`过程会被过滤掉，Vuepress的官方仓库里也有相似的 [Issue](https://github.com/vuejs/vuepress/issues/1643) 。

所以我想到了一个解决方案，在外部写一个配置文件，在`.vuepress/config.js`中提供配置文件的绝对路径，让插件自己去导入外部的配置文件，果不其然，这个方案是有效的。

插件使用`Function.prototype.call()`方法来执行回调函数，所以你在函数里使用的`this`，它会被绑定到组件实例上 ，因此你可以用`this`来访问Vuepress的全局计算属性^[computed] 或其他数据

[^computed]: 详情见 [全局计算属性](https://v1.vuepress.vuejs.org/zh/guide/global-computed.html#site) 和 [网站和页面的元数据](https://v1.vuepress.vuejs.org/zh/theme/writing-a-theme.html#%E7%BD%91%E7%AB%99%E5%92%8C%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%85%83%E6%95%B0%E6%8D%AE)