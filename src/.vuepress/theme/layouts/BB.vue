<template>
    <Common>
        <PageHeader :page-info="getBBConfig" />
        <div class="bb-wrapper">
            <BBTalk></BBTalk>
        </div>
    </Common>
</template>

<script>
/*
原项目：https://github.com/Renovamen/vuepress-theme-gungnir
协议：Apache License 2.0
修改内容： 增加哔哔页面，写法参考自 Links.vue 和 Tags.vue
 */
import Common from '@theme/components/Common';
import PageHeader from '@theme/components/PageHeader';

export default {
    components: {
        Common,
        PageHeader
    },
    computed: {
        getBBConfig() {
            return this.$themeConfig.pages && this.$themeConfig.pages.bb ? this.$themeConfig.pages.bb : {};
        }
    }
}
</script>

<style lang="stylus">
@require '../styles/mixins.styl'

.bb-wrapper
    max-width 760px
    margin 0 auto
    padding 1.6rem 2.5rem 0

@media (max-width: $MQMobile)
    .bb-wrapper
        padding 1rem 0.9rem 0
</style>

<style src="@theme/styles/theme.styl" lang="stylus"></style>