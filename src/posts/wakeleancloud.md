---
layout: post
title: 如何解决Leancloud的流控问题？
subtitle: 榨干容器运行时间
date: 2020-06-20 12:09:44
header_img: https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1.8/images/lncld.png
tags: 
 - 开发
 - Leancloud
catalog: true
---
## 前言

最近登上Leancloud的后台，发现云引擎的日志里满屏都是这么一句话

**CloudQueue 运行失败 xxxxx : self_wake !! {"error":"因流控原因，通过定时任务唤醒体验版实例失败，建议升级至标准版云引擎实例避免休眠 https://url.leanapp.cn/dwAEksv"}**

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/bqb1.jpg)

<!--more-->

然后我点了这个链接进去看了看，官方给出的说明是这样的

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/leancloud1.png)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/leancloud2.png)

也就是说Leancloud觉得我们白嫖得太厉害了，不给我们通过定时任务来唤醒容器了

<details>
<summary>通俗易懂小剧场1</summary>
<pre>
容器：今天又是元气满满的一天
20分钟后
定时唤醒任务：hxd，醒醒，别那么早就休眠了，你还有活要干
容器：收到收到
20分钟后
定时唤醒任务：hxd，醒醒，别那么早就休眠了，你还有活要干
容器：收到收到
...
[日志]容器运行满18小时，需要在夜间休眠6小时
第二天
定时唤醒任务：hxd，醒醒，该干活了
容器：啊巴啊巴啊巴啊巴啊巴.....(休眠中)
20分钟后
定时唤醒任务：hxd，醒醒，该干活了
容器：啊巴啊巴啊巴啊巴啊巴.....(休眠中)
...
当有外部请求时
容器：嗯，有外部请求了？好了我醒了
20分钟后
定时唤醒任务：hxd，醒醒，别那么早就休眠了，你还有活要干
容器：Yes♂Sir
...
</pre>
</details>

现在我们不能通过定时任务唤醒休眠的容器了，但还能唤醒正在运行的容器来延长运行时间

于是我又去网上找了各种方法，找到了一个我认为最好的解决方案

## 解决方案
虽然现在Leancloud不能通过内部请求来唤醒容器，那我们还能通过外部请求嘛

### Github Actions
打开Github，进入你的个人设置(Settings)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github1.png)

点击开发者设置(Developer Settings)，找到个人访问密匙(Personal access tokens)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github2.png)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github3.png)

创建一个新的密匙(点击Generate new token)，名称为`GITHUB_TOKEN`，勾选 `repo` `admin:repo_hook` `workflow` 选项，然后生成密匙即可(点击Generate token)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github4.png)

然后我们需要Fork一个项目

项目地址：[WakeLeanCloud](https://github.com/blogimg/WakeLeanCloud)

Fork完毕后，进入项目的设置（点击Settings），找到Secrets，新建一个Secret(点击New Secret)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github5.png)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github6.png)

名称为`SITE`，`Value`为你的博客评论系统后台管理地址，可填多个地址，用`,`分开，然后点击Add secret 添加secret

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github7.png)

然后我们可以给自己的项目点个Star(手动执行一次Actions)，然后点击Actions看看运行成功没有，如果你是第一次用Actions，那么会有一个使用提示，点击绿色的按钮即可

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github8.png)

如果Actions运行成功了，那么它看起来是这样的

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github9.png)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github10.png)

之后它就会在每天的8点到23点里，每20分钟唤醒Leancloud容器一次啦

PS：由于唤醒大约耗时2分钟，所以唤醒脚本里的cron表达式是18而不是20

如果你想改时间，那么修改`.github/workflows/autoWakeup.yml`中的cron表达式即可

PS：时区默认为UTC，我们的时区是UTC+8，所以你的时间需要减8个小时

这里奉上一个cron表达式的生成器：[Link](https://www.beejson.com/tool/cron.html)

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/github11.png)

如果你嫌commit多太烦人，那么可以设置为外部唤醒一次，其余都交给Leancloud的定时任务来唤醒即可

比如我将`.github/workflows/autoWakeup.yml`中的cron表达式改为`55 22 * * *`

那么它就会在每天早上6点55分唤醒Leancloud容器一次啦

<details>
<summary>通俗易懂小剧场2</summary>
<pre>
外部请求多次
外部请求(首次)：铁子，该干活了
容器：OKOK
20分钟后
外部请求：老哥，还有活要干，别休眠了
容器：OKOK
...
外部请求一次
外部请求：起床干活GKD
容器：好der
20分钟后
定时唤醒任务：hxd，醒醒，别那么早就休眠了，你还有活要干
容器：收到收到
...
</pre>
</details>

我用的是只发送一次外部请求的方法，这里奉上我在Leancloud定时任务中的cron表达式

![avatar](https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1/images/leancloud3.png)

先在早上6点55分外部请求唤醒容器，然后从7点开始23点结束，每20分钟内部唤醒容器一次，同时在7点5分补上漏发的邮件，这样也能达到延长容器运行时间的目的

## 后记
其实还有其他方案的，不过我认为这个方案是最好的，有空再写其他的

看着满屏的`self_wake`函数运行成功，心里真TM爽

最后感谢[Dreamy.TZK](https://www.antmoe.com)的文章和项目

## 感谢
### 部分图片
- [优雅解决Leancloud流控问题](https://www.antmoe.com/posts/ff6aef7b/index.html)
### 文章
- [优雅解决Leancloud流控问题](https://www.antmoe.com/posts/ff6aef7b/index.html)
### 项目
- [WakeLeanCloud](https://github.com/blogimg/WakeLeanCloud)

文章更新日期：2020.6.21 18:40
