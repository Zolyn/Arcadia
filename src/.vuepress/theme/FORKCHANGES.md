## 说明
本项目对原有主题增加了一些小功能，以及适配我写的一些插件

### 更改

- enhanceApp.js
  1. 增加图标，更改图标组件名称，防止与Vuetify组件库冲突
  
- components/SNS.vue
  1. 修改邮件图标

- components/Home.vue
  1. 增加随机个人描述，修复原主题Unsplash随机壁纸无法显示的问题，更改壁纸的显示策略
  2. 壁纸显示策略：如果为自定义壁纸，则遵循原主题的显示策略；如果为Unsplash随机壁纸，则会在主页组件挂载后用axios请求特定的Unsplash API地址，获取图片的真实链接而非API地址，每次切换图片时会执行相同的操作，有概率请求到同一张图片，获取失败则返回默认图片链接
  3. 使用axios请求一言API

- components/ToggleMode.vue
  1. 适配插件 @zolyn/vuepress-plugin-rightmenu 的夜间模式

- components/Page.vue
  1. 适配插件 @mr-hope/vuepress-plugin-copy-code，修改复制按钮的显示层级
  2. 适配插件 @zolyn/vuepress-plugin-waline 的评论样式
  3. 修改评论在文章和文档下的样式

- styles/mode.styl
  1. 适配插件 @mr-hope/vuepress-plugin-copy-code，@mr-hope/vuepress-plugin-pwa 和 @zolyn/vuepress-plugin-rightmenu 修改组件和评论样式  

- styles/palette.styl
  1. 适配插件 @zolyn/vuepress-plugin-rightmenu，修改评论样式

- package.json
  1. 增加axios依赖
