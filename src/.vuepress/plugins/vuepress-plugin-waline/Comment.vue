<template>
    <div id="comment-wrapper" v-if="isEnabled">
        <div id="waline"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEnabled: true
        }
    },
    mounted() {
        this.isEnabled = !$frontmatter.disableComment;
        if (this.isEnabled) {
            this.initComment();
        }
    },
    methods: {
        initComment() {
            const Waline = require('@waline/client');
            new Waline({
                el: '#waline',
                ...COMMENT_OPTIONS
            });
        }
    }
}
</script>

<style scoped>
</style>