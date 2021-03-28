---
title: Inside主题进阶配置 | 附加篇
time: 2020-08-15 08:57:42
category: 主题
tags: [
    'inside',
    'hexo主题'
]
sidebar: auto
---
![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.2.12/images/inside.webp)
## 前言

这是上一篇文章的续篇，用于介绍一些我给主题做的拓展功能

**注意：本文中的代码均不是死的，需要根据你的情况自己修改**

**阅读这篇文章，你可能需要一定的知识储备：**

1. HTML基础
2. JavaScript基础
3. CSS基础

不用害怕，因为我也是菜逼～

<!--more-->

## 自定义函数
博客的自定义资源均由`scriptLoader-xxxx.js`进行加载

而`scriptLoader.js`的作用就是保证我自定义的，需要全局使用的函数能被预先加载，从而继续在指定种类的页面加载指定资源

以下是我自定义的一些函数，在这篇文章中需要用到

::: demo [javascript] customFuncs.js
```javascript
/*
 Author: Zorin
 Github: https://github.com/PikaSama
 License: GPL-3.0 License
 Description: Personal functions.
 */
// 延迟函数
function delay(ms,func) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (typeof func == "function"){
                func();
            }
            resolve();
        },ms);
    });
}
// 动态文字，简化版
function dynamicType(arr,ts,bs) {
    const options = {
        strings: arr,
        startDelay: 0,
        backDelay: 1000,
        typeSpeed: ts || 80,
        backSpeed: bs || 60,
        loop: true,
        showCursor: true,
        contentType: 'html',
        smartBackspace: true
    }
    const type = new Typed("#typedtext",options);
}
// 通知系统，简化版
function customNtf(options) {
    let myntf = new NotificationFx({
        wrapper: document.body,
        message: options.text,
        layout: options.layout,
        effect: options.effect,
        type: 'error',
        ttl: options.ttl,
        onClose : () => false,
        onOpen : () => false
    });
    myntf.show();
}
// 公告通知
async function announce(css,ver,lc,ld) {
    css.append('<link id="jelly" href="//cdn.jsdelivr.net/gh/PikaSama/shelter-images@' + ver + '/static/ns-style-growl.css" rel="stylesheet">');
    await delay(1000);
    customNtf({
        text: '<p>🔔【公告】——2020.8.3<br />叮咚！博客有文章更新啦~<br />更新列表：<br /><a href="/posts/inside-configuration">[持续更新]Inside主题进阶配置</a><br /><br />快去看看吧~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="confirm" href="' + lc + '#cofirmed">确认公告</a></p>',
        layout: 'growl',
        effect: 'jelly',
        ttl: 10000
    });
    confirmAnnounce(ld);
}
// 确认公告按钮
function confirmAnnounce(ld) {
    // 监听按钮点击事件
    $("a#confirm").click(() => {
        // 关闭公告通知
        $(".ns-box.ns-growl.ns-effect-jelly.ns-type-error.ns-show .ns-close").click();
        // 写入已读日期
        localStorage.setItem("announcement_date", ld);
    });
}
// 新人查阅指南后的通知
async function checkedNotification(css,ver) {
    css.append('<link id="jelly" href="//cdn.jsdelivr.net/gh/PikaSama/shelter-images@' + ver + '/static/ns-style-growl.css" rel="stylesheet">');
    await delay(1600);
    customNtf({
        text: '<p>🔔【消息】<br />恭喜～你已经正式进入了避难所(Shelter)～<br />页面将在5秒后跳转至首页，请耐心等待～<br />无法跳转？试试&nbsp;&nbsp;<a href="/">手动跳转</a></p>',
        layout: 'growl',
        effect: 'jelly',
        ttl: 5500
    });
    await delay(5000);
    window.location.href="/";
}
```
:::

## 通知系统
这个我是在一个约5年前的css+js项目里看到的(难以想象5年前的项目竟然这么好康)

项目地址：[NotificationStyles](http://tympanus.net/Development/NotificationStyles/index.html)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.3.16/images/ns-preview.png)

图片预览

有很多种通知样式可以选，但使用多个通知可能会造成样式的冲突。

如果你发现使用多个通知会有冲突，请只引用`ns-default.css`这个样式文件，在要用到指定通知时才加载指定的样式文件。（目前暂未找到同时显示的最优解决方案，这个方法是用于解决错开显示不同种类通知造成的样式冲突）

使用通知系统，需要加入以下依赖
```yaml
plugins:
  - //cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.3.15/static/ns-default.css
  - //cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.3.15/static/NotificationFx.js
  - //cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.3.14/static/modernizr.custom.js
  - //cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.3.14/static/classie.js
```
用法(简化后的)：
```javascript
customNtf({
    text: 'Hello~',
    layout: 'other',
    effect: 'thumbslider',
    ttl: 1000
});
```
 - text：通知内容
 - layout：通知样式种类
 - effect：样式效果
 - ttl：通知持续时间

上面代码的样式就是新人通知的样式，普通通知、公告的样式是`growl`样式中的`jelly`特效。

如果文本内容过长或其他原因造成通知显示不够标准，需要自行修改css

### 新人通知
受主题群里一位大佬的启发，本来想做个新人引导的，但是找不到什么好看的样式，而且我个人也比较反感这种“被人教做事”或者说是“被强迫做事”的感觉，于是发现了通知系统之后就想着给新人发个通知行了，看不看入站指南是他们的意愿hhh

识别新人的原理就是判断客户端有没有标识符，没有就推送通知，以前用的是Cookie方式，现在改为localStorage方式。（但这玩意的性能好像略低于前者）

代码分为两个文件：
 - ntfSystem.js：用于显示新人通知和公告
 - ntfSystem-page.js：用于显示阅读指南后的通知(包含后文的自定义配置方面的代码)

### 公告
同上，公告的判断方式为：浏览者的已读日期不存在或不等于最新的公告日期，且不是新人，显示公告

存储方式也是localStorage(后面的都是，只要涉及到数据的长期存储)

**注意：该功能仅对非新人开放，要是新人看得到这通知，那不得眼花缭乱了～**

代码过长，可通过toc按钮（右下角小圆点，展开的三条杠按钮）跳转至下一个标题

::: demo [javascript] ntfSystem.js
```javascript
/*
 Author: Zorin
 Github: https://github.com/PikaSama
 License: GPL-3.0 License
 Description: An extension of ntfSystem.js.
 */
(async () => {
    await delay(1000);
    // 新人标识
    let neo = localStorage.getItem("newbie");
    // 页面路径
    const locate = window.location.pathname;
    const cssPlace = $("head");
    const thumbslider = ".ns-box.ns-other.ns-effect-thumbslider.ns-type-error";
    // 静态资源文件版本
    const ver = "1.3.12";
    // 初始配置
    let autoNight = "0";
    let defaultTheme = "0";
    let defaultWidget = "0";
    let sidebarBackground = "0";
    let clickEffect = "0";
    let live2d = "1";
    let wordcountMode = "0";
    let bqb = "https://cdn.jsdelivr.net/npm/alus@latest\nhttps://cdn.jsdelivr.net/gh/MiniValine/Bilibilis@latest\nhttps://cdn.jsdelivr.net/gh/MiniValine/twemoji@latest\nhttps://cdn.jsdelivr.net/gh/PikaSama/blog-emoticons@1.1.2/bilibiliHotKey\nhttps://cdn.jsdelivr.net/gh/PikaSama/blog-emoticons@1.1.2/HONKAI3-Daily\nhttps://cdn.jsdelivr.net/gh/PikaSama/blog-emoticons@1.1.2/HONKAI3-NEWYEAR-2019\nhttps://cdn.jsdelivr.net/gh/PikaSama/blog-emoticons@1.1.2/HONKAI3-AIChan\nhttps://cdn.jsdelivr.net/gh/PikaSama/blog-emoticons@1.1.2/Coolapk";
    let dynamicText = "0";
    // 检查是否有通知阻塞
    async function checkedNtf() {
        if (document.querySelector(thumbslider + ".ns-show") != null) {
            $(thumbslider).attr("id","canceled");
            await delay(500);
            $(thumbslider).remove();
            $("link#thumbslider").remove();
            await checkedNotification(cssPlace,ver);
        }
        else {
            $(thumbslider).remove();
            $("link#thumbslider").remove();
            await checkedNotification(cssPlace,ver);
        }
    }
    // 新人，在入站指南页面
    // 写入标识符与默认配置文件
    if (neo == null && locate == "/help") {
        $('<div class="button-save"><span>已阅<i class="ri-checkbox-circle-line"></i></span></div>').insertAfter(".φbk.φh.φz p:last");
        $(".button-save").click(async ()=>{
            $(".button-save").attr("class","button-save-disabled");
            localStorage.setItem("newbie","0");
            localStorage.setItem("auto_night",autoNight);
            localStorage.setItem("default_theme",defaultTheme);
            localStorage.setItem("default_theme_widget",defaultWidget);
            localStorage.setItem("sidebar_widget_background",sidebarBackground);
            localStorage.setItem("click_effect",clickEffect);
            localStorage.setItem("live2d",live2d);
            localStorage.setItem("wordcount_mode",wordcountMode);
            localStorage.setItem("bqb_url",bqb);
            localStorage.setItem("dynamic_text",dynamicText);
            await delay(600,checkedNtf);
        });
    }
})();
```
:::

### 思考
看到这里，你可能会发现：你这tm怎么都用的异步自执行函数啊？！

是的，由于大部分代码需要延迟执行，但我又不想看到`setTimeout()`函数的瀑布流式代码，所以接触了一下异步的知识，用Promise + async/await 实现异步执行同步代码般的操作，这也是为什么我需要在文章前面先放一下我自定义的函数。

`setTimeout()`函数是一个定时器，可以达到延迟执行的效果，但因为是计时器，这玩意是一个像异步又不像异步的东西。为此我稍稍了解了一下js的运行机制，js解析到setTimeout()函数后会将里面的代码放入任务队列(task queue)，所有同步代码执行完后，系统会读取任务队列，看看定时器是否满足时间要求（康康到点没），满足就执行里面的代码，不满足就重复下去，这一循环成为事件循环。（event loop）

所以要想靠`setTimeout()`函数延迟执行同步代码，就得写成这样

```javascript
setTimeout(()=>{
    console.log("1 sec later.");
    setTimeout(()=>{
        console.log("2 secs later.");
        setTimeout(()=>{
            console.log("3 secs later.");
            ...
        },1000);
    },1000);
},1000)
```

这样的方式，我不能接受！

如果你想深入了解js的运行机制，具体可见此文：

[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

## 设置系统
每次浏览博客的时候，都得切换一下主题，因为刷新一下就莫得了。

每次浏览博客的时候，点击特效，看板娘，字数统计，动态文字都tm是我主观设置出来的，很难迎合大众口味，这么死的设置，过不久我自己都要玩腻了。

所以，设置系统横空出世（虽然有些花里胡哨的主题早就自带了，样式也比我好看多了，哈哈，哈哈哈，哈哈哈哈哈呜呜呜呜）

这是个啥？顾名思义，就是让用户能够自定义配置文件，达到自己喜欢的浏览效果。

**注意：该功能仅对非新人开放～**

目前支持的设置：
- 黑暗模式自动切换
- 默认主题
- 默认强调色
- 侧边栏背景
- 点击特效
- Live2d看板娘
- 字数统计模式
- 评论系统自定义表情包
- 动态文字样式

不过就我目前的能力来讲，涉及到调色盘的功能都是通过模拟点击事件实现的，所以你一开始浏览博客的0.x秒前都还是默认主题的。

Inside主题的调色盘功能用了`Shadow DOM`来封装，所以我们才可以直接用`<is-palette2></is-palette2>`就能弄出调色盘

不过调色盘的ShadowRoot模式设置成`closed`了，外界不能对里面进行DOM操作（不能访问）

所以要在`themes.js`中把`attachShadow({mode:"closed"})`改为`attachShadow({mode:"open"})`，这样就能模拟点击事件了

为了实现这个功能，代码分为以下部分
 - cfg-Loader.js：用于加载用户的自定义配置
 - cfg-Setter.js：设置页面所用到的，用于读写自定义配置
 - cfg-Counter.js：用于加载用户对统计功能的自定义配置
 - cfg-Minivaline.js：用于加载用户对评论表情包的自定义配置

源码....有点长，还是放地址吧

[shelter-static/js/custom/ - PikaSama](https://cdn.jsdelivr.net/gh/pikasama/shelter-static@1/js/custom)

### 加载动画
跳转都设置页面时，会有几秒的加载动画

这是用一位大佬的css项目实现的：[Win10加载动画CSS](https://www.cnblogs.com/henrylin/p/13124866.html)

实现原理：设置文章页面透明度为0，约2秒后插入设置界面的内容，约1秒后设置加载动画透明度为0并删除加载动画的元素，设置文章页面透明度为1，然后再删除它的style属性（也就是说加载动画就是个幌子，让你觉得好看而已）

## JS压缩
为了提升访问速度，需要对js进行压缩，这里我用的是`terser`

安装（全局）：
```bash
npm install -g terser
```

使用：
```
terser file.js -c -m -o file.min.js --comments "/Zorin/"
```
 - -c：压缩参数
 - -m：简化变量名
 - -o：输出路径
 - --comments：需要保留的注释中的内容

压缩出来的js都以 源文件名.min.js 为名

如果要实现压缩当前目录下的所有js，可以写个shell脚本
```bash
#!/bin/bash
rm *.min.js
for i in *.js
do
  terser $i -c -m -o ${i%.js}.min.js --comments "/Zorin/"
done
```

## 侧边栏
### 简化
博客的侧边栏有很多选项，但其实这挺碍眼的，所以弄了个“More”更多选项，写了个简单的淡入淡出动画，看着还行

### 访问统计
由于我给文章也加了访问统计，所以侧边栏的访问统计需要在非文章的页面才能加载（防止冲突，如果访问的是文章，那么文章里加载的卜算子统计也会补全侧边栏的访问统计）

两者集成为一个文件`sidebar.js`

::: demo [javascript] sidebar.js
```javascript
/*
 Author: Zorin
 Github: https://github.com/PikaSama
 License: GPL-3.0 License
 Description: A lightweight more-options button.
 */
(async ()=>{
    await delay(800);
    const more = ".φeo.φbd.φj.φc.φu.φo";
    const path = window.location.pathname.slice(0,6);
    let mode = 0;
    if (path != "/posts") {
        $("body").append('<script src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>');
    }
    $('<a class="φeo φbd φj φc φu φo">📥 More</a>').insertAfter(more + ":eq(3)");
    $('<a class="φeo φbd φj φc φu φo" style="display:none;" href="/abyss">🖤 Abyss</a>').insertAfter(more + ":eq(4)");
    $('<a class="φeo φbd φj φc φu φo" style="display:none;" href="/todo">📃 Todo</a>').insertAfter(more + ":eq(5)");
    $('<a class="φeo φbd φj φc φu φo" style="display:none;" href="/search">🔎 Search</a>').insertAfter(more + ":eq(6)");
    $(more + ":eq(4)").click(async ()=>{
        if (mode == 0) {
            mode = 1;
            $(more + ":eq(5)").attr("style","opacity:0;");
            $(more + ":eq(6)").attr("style","opacity:0;");
            $(more + ":eq(7)").attr("style","opacity:0;");
            await delay(200);
            $(more + ":eq(5)").attr("style","opacity:1;transition:all 0.5s");
            $(more + ":eq(6)").attr("style","opacity:1;transition:all 0.5s");
            $(more + ":eq(7)").attr("style","opacity:1;transition:all 0.5s");
        }
        else {
            mode = 0;
            $(more + ":eq(5)").attr("style","opacity:0;transition:all 0.5s");
            $(more + ":eq(6)").attr("style","opacity:0;transition:all 0.5s");
            $(more + ":eq(7)").attr("style","opacity:0;transition:all 0.5s");
            await delay(600);
            $(more + ":eq(5)").attr("style","display:none;");
            $(more + ":eq(6)").attr("style","display:none;");
            $(more + ":eq(7)").attr("style","display:none;");
        }
    });
})();
```
:::

## 后记
文章太短啦！

是的，后续会更新的（flag+1）

其实大部分内容都能在js里的注释找到，又因为我没什么时间，然后就不写了hhhh

## 感谢
项目：[NotificationStyles](http://tympanus.net/Development/NotificationStyles/index.html)

文章更新日期：2020.10.11 14:07