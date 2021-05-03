---
title: 行为
date: 2021-05-03
---
::: info
本页用于介绍插件的运行流程
:::

## build和dev阶段
1. 导入Material Design Icons图标库，修改过的Vuetify组件库的样式
2. 导入并注册一个名为 ContextMenu 的全局组件

组件制定了全局的样式规则，代码如下
```stylus
@import "https://unpkg.com/purecss@2.0.6/build/base-min.css"
@import "https://unpkg.com/purecss@2.0.6/build/grids-min.css"
@import "https://unpkg.com/purecss@2.0.6/build/grids-responsive-min.css"

#context-menu
    .v-application--wrap
        min-height 0
    .on-hover
        color: skyblue !important
        transition .3s
    .theme--dark.v-list
        background #282828
    .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled)
        color #b4b4b4 !important
    .theme--dark.v-icon
        color #b4b4b4
    #clipboard-container
        height 0
    .pure-gutter
        padding 4px
    .pure-g
        width 100%

#context-menu-item.theme--dark.v-application
    background #282828
```

::: tip
请留意插件注册的组件名与样式规则是否与你当前使用的主题冲突
:::

## mounted()钩子
1. 等待DOM更新循环完毕
2. 在全局对象window中注册`contextmenu`和`click`事件的监听器
3. 向控制台输出debug信息

如果你满足了插件的全部使用条件，现在你可以去配置插件了