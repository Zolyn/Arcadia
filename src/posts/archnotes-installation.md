---
layout: post
title: ArchLinux折腾小记 | 安装篇
subtitle: Arch邪教入教记录一
date: 2020-03-14 00:09:44
header_img: https://cdn.jsdelivr.net/gh/PikaSama/shelter-images@1.1.8/images/arch-install.webp
tags: ArchLinux
catalog: true
---
# 前言

这篇文章算是鸽了很久了，从还没建博客时就写过一次了，只不过是写在笔记本上的2333。本文的安装教程适用于BIOS/MBR引导(因为我的电脑是BIOS引导)，安装步骤参考官方[Wiki](https://wiki.archlinux.org/index.php/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))和B站up主[TheCW](https://space.bilibili.com/13081489)的[视频](https://www.bilibili.com/video/av81146687)进行，UEFI引导的教程暂时不做(鸽了鸽了)

<!--more-->

# 下载镜像

进入ArchLinux的[官方下载页面](https://www.archlinux.org/download)，找到WorldWide下的China部分，随便选一个镜像站下载系统镜像，这里以[中科大](http://mirrors.ustc.edu.cn/archlinux/iso/2020.03.01/)(2020年3月版)为例

# 验证镜像

下载完之后我们需要验证镜像的完整性(不过我一般不会这样做的hhh，只要你能保证下载过程中网络没出现什么问题就行)

## Windows

在镜像站里下载md5sums.txt和sha1sums.txt，然后和镜像对比是否一致就行了(虽然官网也有公示校检码)，至于用啥软件就自己找吧，我这里用的是好压自带的工具

## Linux

在镜像站里下载“镜像名.iso.sig”的文件，然后执行
```bash
$ gpg --keyserver-options auto-key-retrieve --verify 镜像名.iso.sig
```

# 刻录镜像

我们需要一个u盘来刻录我们的镜像

## Windows

这里用etcher进行刻录，它可以选择镜像后就可以直接刻录，当然你用rufus或其他的也可以

## Linux

先查看自己u盘的盘符
```bash
sudo fdisk -l
```

然后刻录镜像
```bash
sudo dd if=你的镜像路径 of=你的u盘盘符 bs=4M
```

然后耐心等待...

# 启动到Live环境

1. 关机，插上u盘，开机狂按F11(根据你的主板品牌来规定，我的是凄惨红，所以按F11)，在选择界面中用小键盘上下键移动，选择到你的u盘，然后回车
2. 进入到Arch的引导界面后，回车默认的选项就行了，如果回车后黑屏的，请按Tab键编辑启动参数，加上`nomodeset`参数即可

# 安装系统

## 设置显示字体(可选)
```bash
setfont /usr/share/kbd/consolefonts/LatGrkCyr-12x22.psfu.gz
```

字体由B站up主[TheCW](https://space.bilibili.com/13081489)的[视频](https://www.bilibili.com/video/av81146687)推荐

## 连接网络

连接方法也同样参考于B站up主[TheCW](https://space.bilibili.com/13081489)的[视频](https://www.bilibili.com/video/av81146687)

使用ip-link查看当前互联网状态
```bash
ip link
```

### 有线连接

使用动态ip地址分配工具dhcpcd连接网络(后台运行)
```bash
dhcpcd &
```

### 无线连接

启用无线网络
```bash
ip link set wlan0 up
```

扫描附近的WIFI
```bash
iwlist wlan0 scan | grep ESSID
```

生成连接无线网络的配置文件
```bash
wpa_passphrase WIFI名 密码 > internet.conf
```

连接无线网络(后台运行)
```bash
wpa_supplicant -c internet.conf -i wlan0 &
```

使用动态ip地址分配工具dhcpcd连接网络(后台运行)
```bash
dhcpcd &
```

## 更新系统时间
```bash
timedatectl set-ntp true
```

## 分区

### 要求

#### BIOS/MBR

请至少创建两个分区，一个用来作为作为Linux系统的根目录，一个用来作为Swap分区，当然如果你觉得内存够用了可以不用创建Swap分区

#### UEFI

咕咕咕...

### 分区工具

#### cfdisk（推荐）

cfdisk拥有GUI界面，操作起来很方便，适合小白

执行`cfdisk`命令后你可以看到类似界面，使用方向键进行操作

主要命令：
- Free Space：空闲空间
- New：新建一个分区
- Resize：调整分区大小
- Delete：删除分区
- Type：分区类型
- Write：向硬盘写入更改
- Quit：退出

你的所有操作都完成后，按下Write即可生效，然后按下Quit即可退出
![avatar](http://exp-picture.cdn.bcebos.com/739bc049610f8b561540a5dc9ce951e10ff8d398.jpg)

![avatar](http://exp-picture.cdn.bcebos.com/777f3fc2bbd6e1d031ad11d50d254193cfe8af99.jpg)
[图片来源](https://jingyan.baidu.com/article/ce09321bb922da2bff858fdd.html)

#### fdisk
查看当前分区
```bash
fdisk -l
```

进入编辑模式
```bash
fdisk /dev/sda(你的硬盘位置，以/dev/sda为例)
```

这时你输入m可以获取fdisk帮助

主要命令：
- d：删除一个分区
- F：查看空闲空间
- l：列出已知的分区类型
- n：创建一个分区
- p：查看分区列表
- t：更改分区类型
- w：向硬盘写入更改
- q：不保存更改并退出
- i：查看分区信息
- g：创建一个GPT分区表(会清空当前硬盘数据)
- o：创建一个DOS分区表(会清空当前硬盘数据)

输入`n`创建一个新的分区

- Partition number：分区编号，回车默认即可
- First sector：扇区起始位置，回车默认即可
- Last sector：扇区结束位置，如果你想创建一个20G的分区，输入`+20G`后回车即可
- Do you want to remove the signature ?：是否移除分区的签名，说明你之前创建过这个分区，我们选Yes，改为崭新的分区

输入`p`查看你更改后的分区列表

确认无误后，输入`w`写入更改

### 格式化

#### BIOS/MBR

格式化主分区(你打算挂载到根目录的分区)

```bash
mkfs.ext4 /dev/sda6(假设这是你的主分区)
```

如果你创建了多个分区，那么这个分区也要格式化(例如你创建了一个分区要挂载到/home上)

设置swap分区

```bash
mkswap /dev/sda7(假设这是你的swap分区)
```

启用swap分区

```bash
swapon /dev/sda7
```

#### UEFI

咕咕咕...

### 挂载

#### BIOS/MBR

挂载主分区

```bash
mount /dev/sda6 /mnt
```

如果你有多个分区，请先创建它的目录再挂载(例如你创建了一个分区想要挂载在/home上)

```bash
mkdir /mnt/home
mount /dev/sda8(假设为你要挂载到/home分区) /mnt/home
```
#### UEFI

咕咕咕...

## 更换软件源

以清华源为例(“+”为添加/输入内容，“-”为删除内容)
```bash
nano /etc/pacman.d/mirrorlist
+ Server=https://mirrors.tuna.tsinghua.edu.cn/archlinux/repo/os/$arch
```

刷新软件源
```bash
pacman -Sy
```

## 安装基本组件
```bash
pacstrap /mnt base base-devel linux linux-firmware nano dhcpcd wpa_supplicant
```
- base：ArchLinux最小化安装包
- base-devel：base附加的软件包
- linux：Linux内核及模块
- linux-firmware：Linux的固件文件
- nano：文本编辑器
- dhcpcd：动态ip地址分配工具
- wpa_supplicant：支持WPA无线协议和加密认证的连接工具

## 生成fstab文件
```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

## 进入刚刚安装的新系统
```bash
arch-chroot /mnt
```

## 时间设置

### 设置时区(以上海为例)
```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
### 同步系统时间
```bash
hwclock --systohc
```

## 语言设置

### 编辑语言生成的配置文件
```bash
nano /etc/locale.gen
- #en_US.UTF8 UTF-8
+ en_US.UTF-8 UTF-8
```

### 生成语言
```bash
locale-gen
```

### 设置语言
```bash
nano /etc/locale.conf
+ LANG=en_US.UTF-8
```

## 设置主机名
```bash
nano /etc/hostname
+ arch(以arch为例)
```

## 编辑hosts文件
```bash
nano /etc/hosts
+ 127.0.0.1 localhost
+ ::1 localhost
+ 127.0.0.1 arch(你的主机名).localdomain arch(你的主机名)
```

## 设置root密码
```bash
passwd
+ root(你的密码)
```

## 安装引导组件

### 安装微码(cpu升级驱动用)

#### Intel
```bash
pacman -S intel-ucode
```

#### AMD
```bash
pacman -S amd-ucode
```

### 安装grub引导器和其他组件

#### BIOS/MBR
```bash
pacman -S grub os-prober ntfs-3g
```
- grub：引导器，用于引导多个系统
- os-prober：用于探测其他系统
- ntfs-3g：用于读取ntfs文件系统的分区

安装grub引导器
```bash
grub-install --target=i386-pc /dev/sda(注意这是你的硬盘，不是分区)
```

生成grub配置文件
```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

#### UEFI
咕咕咕...

## 收尾工作

### 退出chroot环境
```bash
exit
```

### 杀死网络服务
```bash
killall wpa_supplicant dhcpcd
```

### 卸载被挂载的分区
```bash
umount -R /mnt
```

### 重启
```bash
reboot
```

等你的显示屏显示“无信号”的时候，拔掉u盘，然后享受你的ArchLinux吧~

# 后记

呼~划水了两个多月了，今天终于写完了

你如果还看不懂的话，那你还是去看视频吧2333

如有问题还请指出，我也还是个小白

过一段时间还会更新另一篇，毕竟你看到标题也知道我不会就只写这一篇的hhhh

啊，自己给自己挖了个大坑，真好

## 感谢

视频：
- [BV11J411a7Tp](http://www.bilibili.com/BV11J411a7Tp)