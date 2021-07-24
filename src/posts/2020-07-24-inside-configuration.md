---
layout: post
title: Inside主题进阶配置
subtitle: 为主题添加一些常用功能
date: 2020-07-24
tags:
 - 开发
 - hexo主题
header_img: https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.2.12/images/inside.webp
header_style: image
catalog: true
---
<!-- more -->
## 前言

在经过两天的本地测试，以及后续的各种修修补补，博客已经正式换为[Inside](https://github.com/ikeq/hexo-theme-inside)主题

Inside主题是一个简洁，美观，开放的主题，虽然主题内置的功能并不多，但主题提供了强大的[插件](https://blog.oniuo.com/theme-inside/docs/misc#plugins)功能，可在配置中添加自己想要的文件（js脚本，css样式文件等），可自定义性强

**注：本文涉及内容仅为Inside主题的插件配置，** 基础配置请见[官方文档](https://blog.oniuo.com/theme-inside/)(懒得写了hhh)

## 准备
首先主题配置文件里的Plugins项长这样
```yaml
plugins:
  # 动态插入可执行的代码片段
  - position: # `sidebar` | `post` | `page` | `comments` | `avatar`, 支持数组
    # HTML 片段
    template:
    # 也可以是相对于主题根目录的路径，例如：
    template: snippets/template-1.html
  # 全局加载脚本/样式
  - xxx.css
  - xxx.js

  # 更灵活的用法
  # <script src="//sample.com/api.php?format=jsonp" id="sample-api" defer></script>
  - tag: script # html 标签, `script` | `style` | `link`
    # Any possible attributes
    src: //sample.com/api.php?format=jsonp
    id: sample-api
    defer: true

  # <link rel="stylesheet" href="xxx.css" disable>
  - tag: link
    href: xxx.css
    disable: true

  # 内联脚本需指定 code
  # <script type="text/x-mathjax-config">MathJax.Hub.Config({...})</script>
  - tag: script
    type: text/x-mathjax-config
    code: |
        MathJax.Hub.Config({
          showProcessingMessages: false,
          messageStyle: 'none',
          tex2jax: { inlineMath: [['s;,'s;], ['\\(','\\)']] }
        })
    # 也可以是相对于主题根目录的路径，例如：
    code: snippets/mathjax-config.js

  # 内联样式
  # <style>.mycss{...}</style>
  - tag: style
    code: |
        .mycss {
          color: rebeccapurple;
        }
    # 也可以是相对于主题根目录的路径，例如：
    code: snippets/mycss.css
```
如果有文件需要全局引入，也就是说你点博客的哪个地方都会加载的文件

只需要在plugins下加上文件的路径即可
```yaml
plugins:
  - //yourdomain.com/js/xxx.js
  - //yourdomain.com/css/xxx.css
  - ...
```
如果你要在指定的地方加载文件，则需要这样写
```yaml
plugins:
  - position: inject_place
    template: |
    <script src="//yourdomain.com/js/xxx.js"></script>
    <link rel="stylesheet" type="text/css" href="//youdomain.com/css/xxx.css"/>
```
- position：插入文件的位置，即你想让文件加载的位置，有五个位置
  - sidebar：主题侧边栏下方
  - avatar：侧边栏个人头像
  - post：文章底部
  - page：页面底部
  - comments：评论，即`page`和`post`最下方
- template：HTML代码片段

### 代码压缩
Inside主题支持通过安装 html-minifier，babel 和 terser 来实现代码压缩
若要使用此功能，请于Hexo根目录执行命令(非themes/inside/目录)
```bash
npm install babel-core babel-preset-env html-minifier terser --save
```

### 前置文件
本文中的配置需要提前引入以下文件(全局引用)
```yaml
plugins:
  # jquery框架
  - //cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js
  # Fontawsome图标&字体
  - //cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css
  # Remixicon图标&字体
  - //cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css
```
## 评论系统
目前已有很多的评论系统，国外有Gitalk，Livere，Disqus等，国内有Valine，MiniValine等

我只用过Valine和MiniValine，所以只写这两个评论系统的配置方法

### Valine
```yaml
plugins:
  - //cdn1.lncld.net/static/js/3.0.4/av-min.js
  - //unpkg.com/valine/dist/Valine.min.js
  - position: comments
    template: |
      <sctipt>
        new Valine({
          el: '#vcomments',
          appId: 'waibiwaibi',
          appKey: 'waibibabu',
          placeholder: 'Leave a comment~',
          recordIP: 'true',
          enableQQ: 'true',
          emojiCDN: 'https://youdomain.com/pics/emojis',
          emojiMaps: {
          "1":"a/1.png",
          "2":"b/2.jpg",
          //...
          }
        })
      </script>
```
- appId：Leancloud应用的`appId`，必填项

- appKey：Leancloud应用的`appKey`，必填项

- placeholder：评论区域占位提示符

- recordIP：是否记录评论者IP

- enableQQ：是否启用QQ头像功能

- emojiCDN：表情包CDN

- emojiMaps：表情包列表

自定义表情请见Valine官方文档：[自定义表情](https://valine.js.org/emoji.html)

### MiniValine
```yaml
plugins:
  - //cdn.jsdelivr.net/npm/minivaline@4/dist/MiniValine.min.js
  - position: comments
    template: |
      <div id="#mvcomments"></div>
      <script>
        new MiniValine({
          el: '#mvcomments',
          appId: '114514114514',
          appKey: '19198101919810',
          placeholder: 'Leave a comment~',
          adminEmailMd5: 'eNCRyPTmEIfUcAN',
          emoticonUrl: [
            'https://cdn.jsdelivr.net/npm/alus@latest',
            'https://cdn.jsdelivr.net/gh/MiniValine/Bilibilis@latest',
            'https://cdn.jsdelivr.net/gh/MiniValine/twemoji@latest',
            //...
          ]
        })
      </script>
```

这里我用的样式是DesetsP版，配置会与xCss版不同

如果你想查看xCss版的配置，请见[官方文档](https://github.com/MiniValine/MiniValine#options)

- appId：Leancloud应用的`appId`，必填项

- appKey：Leancloud应用的`appKey`，必填项

- placeholder：评论区域占位提示符

- adminEmailMd5：管理员邮箱的Md5值，使用管理员的邮箱发表评论会在头像旁有一个管理员标识

  - 另附上一个Md5加密网站：[站长工具](http://tool.chinaz.com/tools/md5.aspx)

- emoticonUrl：数组，表情包列表，MiniValine会解析这个目录下的index.json文件以加载表情包

自定义表情请见MiniValine官方文档：[Customize Emoticons](https://github.com/MiniValine/MiniValine/blob/master/.github/FAQ.md#how-to-customize-emoticons)

我不会用Python，自己用shell写了个生成表情包列表的脚本，可传参

项目地址：[Blog-Emoticons](https://github.com/PikaSama/blog-emoticons)（不要问问为什么是fork，因为源项目有表情包源文件，便于我更新 ~~实际上是把适配Valine的移植到MiniValine~~）

我在使用MiniValine时会有一个小问题，评论框的显示层级过高，导致我的页面停留在评论框的时候使用搜索功能，评论框会凸显出来，于是我写了修改显示层级的代码

```javascript
const mvfix = $(".φbz.φh");
mvfix.attr("style","z-index:0;");
```

## 访问量统计
我用的是[不蒜子统计](http://busuanzi.ibruce.info/)来进行访问量统计，配置简单
```yaml
plugins:
  - position: sidebar
    template: |
      <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"</script>
```
然后在配置文件中找到`footer`项下的`custom`，加入以下内容
```yaml
footer:
  custom: <span id="busuanzi_container_site_pv">PV:<span id="busuanzi_value_site_pv"></span> | </span><span id="busuanzi_container_site_uv">UV:<span id="busuanzi_value_site_uv"></span></span>
```

如果字体小了可以给`span`标签加个属性
```html
<span style="font-size:120%;"></span>
```
字体大小可以自己设置，我这里是1.2倍

如果你要在footer里添加其他内容，例如要在访问量统计下面加备案信息啊啥的，那就在后面加个换行符`<br />`再填写内容

## 代码块复制
既然是博客，那代码复制的功能怎么少的了，于是我从之前用的主题[Ayer](https://gitee.com/shen-yu/hexo-theme-ayer)中把代码块复制功能移植过来了
```javascript
function wait(callback, seconds) {
    var timelag = null;
    timelag = window.setTimeout(callback, seconds);
}
!function (e, t, a) {
    var initCopyCode = function(){
      var copyHtml = '';
      copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
      copyHtml += '<i class="ri-file-copy-2-line"></i><span>COPY</span>';
      copyHtml += '</button>';
      $(".highlight .code pre").before(copyHtml);
      var clipboard = new ClipboardJS('.btn-copy', {
        target: function(trigger) {
          return trigger.nextElementSibling;
        }
      });
      clipboard.on('success', function(e) {
        let $btn = $(e.trigger);
        $btn.addClass('copied');
        let $icon = $($btn.find('i'));
        $icon.removeClass('ri-file-copy-2-line');
        $icon.addClass('ri-checkbox-circle-line');
        let $span = $($btn.find('span'));
        $span[0].innerText = 'COPIED';
        
        wait(function () { // 等待两秒钟后恢复
          $icon.removeClass('ri-checkbox-circle-line');
          $icon.addClass('ri-file-copy-2-line');
          $span[0].innerText = 'COPY';
        }, 2000);
      });
      clipboard.on('error', function(e) {
        e.clearSelection();
        let $btn = $(e.trigger);
        $btn.addClass('copy-failed');
        let $icon = $($btn.find('i'));
        $icon.removeClass('ri-file-copy-2-line');
        $icon.addClass('ri-time-line');
        let $span = $($btn.find('span'));
        $span[0].innerText = 'COPY FAILED';
        
        wait(function () { // 等待两秒钟后恢复
          $icon.removeClass('ri-time-line');
          $icon.addClass('ri-file-copy-2-line');
          $span[0].innerText = 'COPY';
        }, 2000);
      });
    }
    initCopyCode();
}(window, document);
```

在plugins项中添加以下内容
```yaml
plugins:
  - //cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
  - //cdn.jsdelivr.net/gh/PikaSama/shelter-static@latest/css/clipboard.css
  - position:
      - post
      - page
    template: |
      <script src="你的代码"></script>
```

## 字数&阅读时间估计
我翻了翻[Ayer](https://gitee.com/shen-yu/hexo-theme-ayer)主题的文件，发现主题的字数功能是用插件hexo-wordcount来实现的（直接解析文章源文件内容）

于是我就想在这个主题里试一下，网上的方法都是在index.swig里添加内容

但是Inside主题的index.swig文件我是真的看不懂...

于是我放弃了，决定使用外部统计（解析html）

思路很简单，计算文章内`<p>`元素的文本内容长度就能知道字数了，但由于其他内容也会用到`<p>`，所以要排除掉

于是我**针对我的博客**写了这样的脚本

```javascript
// 文章信息位置
    const info = $(".φgj.φr");
    // 获取正文字数
    let words = document.querySelector(".φbk.φh.φz").innerText.length;
    // 获取正文内图片的数量
    let imgs = $(".φbk.φh.φz img").length;
    // 获取所有<meting-js>元素
    let metinglist = document.querySelectorAll("meting-js");
    let meting = 0;
    // 是否有该元素，有则将每个元素的文本长度相加
    if (metinglist.length > 0) {
        for (let i = 0; i < metinglist.length; i++) {
            meting = meting + metinglist[i].innerText.length;
        }
    }
    // 获取所有<figure>元素
    let codelist = document.querySelectorAll("figure");
    let code = 0;
    // 是否含有该元素，有则将每个元素的文本长度相加
    if (codelist.length > 0) {
        for (let j = 0; j < codelist.length; j++) {
            code = code + codelist[j].innerText.length;
        }
    }
    // 校正字数，正文字数 - 音乐插件字数 - 代码字符数
    words = words - meting - code;
    // 估算阅读时间，范围：全文
    // 设每分钟阅读文字600字 / 代码800字符 / 图片10张
    // 结果保留一位小数
    let readtime = (Math.round(words / 60 + code / 80) + imgs) / 10;
    // 如果字数不到1000，显示原字数
    if (words < 1000) {
        words = '&nbsp;' + words + '&nbsp;words';
    }
    // 如果字数≥1000，四舍五入字数，单位改为k，结果保留一位小数
    else {
        words = '&nbsp;' + Math.round(words / 100) / 10 + 'k' + '&nbsp;words';
    }
    // 如果阅读时间超过1分钟，加复数单位
    if (readtime > 1) {
        readtime = '&nbsp;' + readtime + '&nbsp;mins';
    }
    // 如果阅读时间≤1分钟，加单数单位
    else {
        readtime = '&nbsp;1 min';
    }
    // 是否含有代码
    if (codelist.length > 0) {
        // 是
        // 如果代码字符数不到1000，显示原字符数
        if (code < 1000) {
            code = '&nbsp;' + code + '&nbsp;chars';
        }
        // 如果代码字符数≥1000，四舍五入字符数，单位改为k，结果保留一位小数
        else {
            code = '&nbsp;' + Math.round(code / 100) / 10 + 'k' + '&nbsp;chars';
        }
    }
    // 插入字数统计
    info.append('<span class="words"><i class="ri-quill-pen-line"></i>' + words + '</span>');
    // 是否有代码
    if (codelist.length > 0) {
        // 是，插入代码统计
        info.append('<span class="codes">&nbsp;&nbsp;<i class="ri-code-box-line"></i>' + code + '</span>');
    }
    // 插入阅读时间
    info.append('<span class="readtime">&nbsp;&nbsp;<i class="ri-time-line"></i>' + readtime + '</span>');
```
实现原理：
 1. 获取全文的字数，获取Meting.js(音乐插件)里的字数(如果有)，获取代码的字符数(如果有)再在全文字数中减去这些字数，就能得出**较为精确**的字数了

 2. 字数(精确后的字数)/600(估计每分钟浏览600字) + 代码字符数/800(估计每分钟浏览800字符) + 图片数量/10(估计每分钟浏览图片10张)，阅读时间保留一位小数

 ~~3. 字数统计会延迟一段时间再加载(让音乐插件先加载完)，本来想做个淡入的动画效果的，但经测试手机端无法显示，就改成在加载前显示"Loading..."了~~(这个需要你自己加)

 字数统计我写了三种样式，上面是其中一种，每个统计都带单位且独立

 **注：受网络环境的影响，如果文章内插入了音乐，且音乐插件在字数统计加载前还未加载完时，会影响字数统计和阅读时间的精确度**

还有，**这个脚本的代码不是死的，你得根据实际情况修改，**

## 动态打字特效
之前用的主题Ayer中有这个功能，了解到是用Typed.js实现的，于是也把这个功能移植到主题上了

```javascript
const typeplace = $(".φee");
typeplace.append('<span id="typedtext"></span>');
typeplace.attr("style", "height:3rem; display:block; font-size: 110%;");
const options = {
        strings: ['Ciao','Bonjour','Kon ni chi wa'],
        startDelay: 0,
        backDelay: 1000,
        typeSpeed: 80,
        backSpeed: 60,
        loop: true,
        showCursor: true,
        contentType: 'html',
        smartBackspace: true
    }
const type = new Typed("#typedtext",options);
```
如果你只是想改文字，只需要修改`options`对象中键`strings`的值就行（数组）

"^200"表示在此处停顿200毫秒

- startDelay：第一个文本内容开始显示的延迟
- backDelay：在打完文本内容后回退的延迟
- typeSpeed：打字速度
- backSpeed：回退速度
- loop：是否循环
- showCursor：显示光标
- smartBackspace：是否启用智能换行功能

在plguins项中添加以下内容
```yaml
plugins:
  - //cdn.jsdelivr.net/npm/typed.js@2.0.11/lib/typed.min.js
  - position: sidebar
    template: |
      <script src="你的代码"></script>
```
## 调色盘
调色盘是Inside主题的一个特色功能，但并不内置在主题中，需要引入文件

我自己多加了两个主题，分别是雨滴(💧)和樱花(🌸)

在plugins项中添加以下内容
```yaml
plugins:
  - //cdn.jsdelivr.net/gh/PikaSama/shelter-static@latest/js/dependencies/theme.js
  - //cdn.jsdelivr.net/gh/PikaSama/shelter-static@latest/js/dependencies/themes.js
  - position: sidebar
    template: |
    <is-palette2></is-palette2>
```

如果你想自己加主题，修改`themes.js`即可，文件是被压缩过的，需要用工具排版，这里还是推荐[站长工具](http://tool.chinaz.com/js.aspx)，排版完之后就很直观了，照着格式自己加，然后把你加的压缩了再加回去就行

- accent_color：强调色，修改行内代码块，小圆点部件，按钮激活色，滚动条颜色等
- forebackground_color：前背景颜色，意义不明
- border_color：边框色，意义不明(貌似是描边的颜色？)
- background：背景色，可设置图片
- sidebar_background：侧边栏背景色，貌似只对手机端或分辨率较低的桌面端生效，桌面端一般是被背景色覆盖的，可设置图片
- card_background：卡片颜色，对侧边栏头像卡片和文章页面生效，可设置图片
- highlight：代码块高亮设置

## 代码高亮
代码高亮是用主题作者的[Highlighting Palette](https://blog.oniuo.com/post/highlighting-palette)生成的，然后做了点修改

亮色主题的代码高亮配置
```yaml
# onedark (modified)
  highlight: [
    "#282c34",
    "#353b45",
    "#3e4451",
    "#545862",
    "#f5f5f5",
    "#abb2bf",
    "#b6bdca",
    "#c8ccd4",
    "#e06c75",
    "#d19a66",
    "#e5c07b",
    "#98c379",
    "#56b6c2",
    "#61afef",
    "#c678dd",
    "#be5046"
  ]
```

暗色主题的代码高亮配置
```yaml
# ir black (modified)
  highlight: [
    "#000000",
    "#161616",
    "#484844",
    "#6c6c66",
    "#f5f5f5",
    "#b5b3aa",
    "#d9d7cc",
    "#fdfbee",
    "#ff6c60",
    "#e9c062",
    "#ffffb6",
    "#a8ff60",
    "#c6c5fe",
    "#96cbfe",
    "#ff73fd",
    "#b18a3d"
  ]
```

以上配置也可以配置在`themes.js`中，用于设置每个主题的代码高亮

## 鼠标点击特效
鼠标点击时触发的特效，有三种特效可选，同样也移植于主题Ayer

**注：可能会在移动端造成卡顿、掉帧现象，如出现此现象，请更换浏览器或多刷新几次页面**
- clickLove.js：爱心特效
  - 引入方法
```yaml
plugins:
  - //cdn.jsdelivr.net/gh/PikaSama/shelter-static@latest/js/dependencies/clickLove.js
```

- clickBoom1.js：粒子波动特效
  - 代码 & 引入方法
```javascript
    const ver = "1.5.0";
    const canvasplace = $(".φbm.φk");
    canvasplace.prepend('<canvas class="fireworks"></canvas><style>.fireworks{position:fixed;left:0;top:0;z-index:99999;pointer-events:none}</style>');
    canvasplace.append('<script src="https://cdn.jsdelivr.net/gh/PikaSama/shelter-static@' + ver +'/js/dependencies/clickBoom1.js"></script>');
```
```yaml
plugins:
  - //cdn.jsdelivr.net/npm/animejs@latest/anime.min.js
  - 你的代码
```

- clickBoom2.js：粒子爆炸特效
  - 代码
```javascript
    const ver = "1.5.0";
    const canvasplace = $(".φbm.φk");
    canvasplace.prepend('<canvas width="1777"height="841"style="position: fixed; left: 0px; top: 0px; z-index: 99999; pointer-events: none;"></canvas>');
    canvasplace.append('<script src="https://cdn.jsdelivr.net/gh/PikaSama/shelter-static@' + ver + '/js/dependencies/clickBoom2.js"></script>');
```

## Live2d看板娘
哪个男孩不想要一个二次元看板娘呢？

原项目地址：[Live2d-widget](https://github.com/stevenjoezhang/live2d-widget)

你可以直接引用官方的`autoload.js`，如果想要自定义需要自己Fork一份，并修改`autoload.js`中资源加载路径为自己项目的

看板娘的位置我放在侧边栏和文章的间隔中，不过看起来还是有点碍眼呢hhh

位置的调整是基于我那超逊的1366x768分辨率屏幕修改了，可能会有显示差异hhh

在plugins项中添加以下内容
```yaml
plugins:
  - //cdn.jsdelivr.net/gh/PikaSama/live2d-widget@latest/autoload.js
```

## 音乐插件
我在用Ayer主题的时候用的音乐插件是`hexo-tag-aplayer`，结果发现换到这个主题的时候就失效了

然后我还是换成了Aplayer，只不过是官方版的

再配合Meting.js，可以播放多家平台的音乐

在plugins项中添加以下内容
```yaml
plugins:
  - //cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css
  - //cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js
  - position:
      - post
      - page
    template: |
      <script src="//cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js"></script>
```

然后你就可以在文章里添加`<meting-js xxxx="xx"></meting-js>`来播放音乐了

具体配置方法：[Meting.js](https://github.com/metowolf/MetingJS#quick-start)

## PWA
Writing...Maybe?

## SEO
go shin sa re ru，ta bu n

## 后记
终于又填完了一个坑，这主题挺适合我的，因为它要折腾很多东西，而我恰好就是个爱折腾的人hhh

同时也要感谢`Theme Inside`群里的群友们的帮助&贡献，谢谢你们，我在折腾的过程中学到了不少东西

感觉自己写的还不够详细，有些都是丢文档链接的23333(其实还是懒得写)

如果你有什么问题，可以在下面评论，有时间会一一答复的，文章有什么错误还请各位大佬指出

因为我对这个主题加了其他功能/优化，大部分功能都集成在一个js里，所以上面的代码大多都是取部分展示出来的，不能直接引用

如果你想进一步折腾这个主题，可以看看这篇文章

### 续篇
[Inside主题进阶配置-附加篇](/inside-configuration-extra)

## 感谢
### 博客
- [无名小筑](https://blog.zr.ci/)

- [白桦 Birch](https://wardzhou.art/)

- [Fiteen's Blog](https://blog.fiteen.top/)

- [Ikeq's Blog](https://blog.oniuo.com/)(Inside主题作者的博客)

- [岛 | Shen-yu](https://shen-yu.gitee.io/)(Ayer主题作者的博客)

### 文章
- [Theme Inside](https://blog.oniuo.com/theme-inside)

- [Add readable time for theme inside](https://wardzhou.art/2020/04/14/wordcount)

- [【持续更新】Hexo + inside 博客个性化定制](https://blog.fiteen.top/2020/hexo-theme-inside-plugin)

### 项目
- [live2d-widget](https://github.com/stevenjoezhang/live2d-widget)

- [Aplayer](https://github.com/MoePlayer/APlayer)

- [MetingJS](https://github.com/metowolf/MetingJS)

### 网站
- [菜鸟教程](https://www.runoob.com/)
- [w3cschool](https://www.w3cschool.cn/)
- [JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

### 封面

- [Theme Inside](https://blog.oniuo.com/theme-inside)

### 其他
`Theme Inside`群里的群友们

文章更新日期：2020.10.10 19:52