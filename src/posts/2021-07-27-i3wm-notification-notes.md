---
layout: post
title: i3wm通知中心折腾记录
subtitle: 我不用dunst啦，jojo！
date: 2021-07-09
tags:
 - Linux
 - ArchLinux
 - i3wm
 - 开发
 - 通知
 - QQ
catalog: true
header_img: https://cdn.jsdelivr.net/gh/Zolyn/StaticFiles@2021.7.12-release.1/Arcadia/images/IMG_20210709_193326.jpg
header_style: image
---
## 前言
在我用过的DE中（Gnome, KDE, DDE, UKUI...），都有通知中心这么一个功能。不过通知中心这东西对我来说不是刚需（可能因为我装的软件大多数都不发通知吧hhh），不过最近看了一些文章，对这个有了些兴趣，就想着整一下了。

## dunst
### 安装
```bash
sudo pacman -S dunst
```

一开始看的文章都推荐用这个，就装来用了一会，使用体验吧，emmmm....还行！能达到我想要的效果，不过我想找找有没有更好的替代品，嘿，还真找到了。

## linux_notification_center
### 预览
![preview1](https://cdn.jsdelivr.net/gh/phuhl/linux_notification_center@master/README.org.img/org_20200223_193450_1en7sh.jpg)
![preview2](https://cdn.jsdelivr.net/gh/phuhl/linux_notification_center@master/README.org.img/org_20200223_193345_VhlbOf.jpg)
![preview3](https://cdn.jsdelivr.net/gh/phuhl/linux_notification_center@master/README.org.img/org_20201220_000601_9V037T.jpg)

以上图片均来源于该项目的README文件
### 安装
这个包在AUR里有，可以下载源码自己编译安装
```bash
# paru
paru -S deadd-notification-center

# yay
yay -S deadd-notification-center
```

你要是嫌编译麻烦，AUR里也有现成的二进制包（因为我编译时不知道为啥卡在某个步骤了所以我装了二进制包）
```bash
# paru
paru -S deadd-notification-center-bin

# yay
yay -S deadd-notification-center-bin
```
项目地址：[linux_notification_center](https://github.com/phuhl/linux_notification_center)

这是一个用`Haskell`写的项目（这就是大佬吗.jpg），而且界面是真的好看（毛玻璃yyds），通知中心的界面和win10的有些相似，可以自定义下方的按钮，虽然使用的时候会有一些小问题，而且作者也有一段时间没有更新了，但是对我来说影响不大，还是挺好用的。

### 配置
配置文件我以 [官方文档](https://github.com/phuhl/linux_notification_center#Configuration) 提供的为基础来进行修改

因为我目前用的显示器不是很大（毕竟用了10年都有了），所以我调了一下通知中心的宽度
```ini
# ~/.config/deadd/deadd.conf
[notification-center]
width=400
```

然后我觉得默认设置的消失时间太长了（10秒），我就设置成了3秒
```ini
# ~/.config/deadd/deadd.conf
[notification-center-notification-popup]
notiDefaultTimeout = 3000
```

因为`edge`通过`Notification API`给我推送的通知是可以设置永久显示的，不过`linux_notification_center`里有类似拦截器的功能，可以修改与配置的规则匹配的通知的属性值，具体可以到 [这里](https://github.com/phuhl/linux_notification_center#notification-based-scripting) 查看
```ini
# ~/.config/deadd/deadd.conf
[notification-center]
match = "app=Microsoft Edge"
modify = "timeout=3000"
#run = ""
```

至于这个`run`选项是干啥的我也不知道，作者自己也说了：`Not implemented, yet.`

### QQ消息通知
在我还在用DE的时候就一直想解决这个问题了，只不过当时有系统托盘勉强能用，但切换到i3之后就蚌埠住了，我用的`polybar`主题没有托盘（实际上是有的，只不过太难看没用），而且Wine自带的托盘是跟着QQ放在一个专门的`workspace`里的，所以我干其他事情的时候是很容易忽略掉信息的。
