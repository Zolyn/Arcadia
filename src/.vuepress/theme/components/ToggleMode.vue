<template>
  <a
    role="button"
    class="toggle-mode"
    :aria-label="'Toggle ' + nextMode"
    :title="'Toggle ' + nextMode"
    @click.prevent="toggleMode()"
  >
    <icon-wrapper v-if="currentMode === 'light'" name="fa-sun" />
    <icon-wrapper v-else-if="currentMode === 'dark'" name="fa-moon" />
    <icon-wrapper v-else-if="currentMode === 'auto'" name="fa-magic" />
  </a>
</template>

<script>
let modeOptions = ["light", "dark", "auto"];

export default {
  name: "UserSettings",

  data() {
    return {
      currentMode: "auto"
    };
  },

  computed: {
    nextMode() {
      const currentIndex = modeOptions.indexOf(this.currentMode);
      const nextIndex = (currentIndex + 1) % modeOptions.length;
      return modeOptions[nextIndex];
    }
  },

  mounted() {
    // get user preference mode
    this.currentMode =
      localStorage.getItem("mode") || this.$themeConfig.mode || "auto";

    // dark and light autoswitches
    var that = this;
    window.matchMedia("(prefers-color-scheme: dark)").addListener(() => {
      that.$data.currentMode === "auto" &&
        that.applyMode(that.$data.currentMode);
    });
    window.matchMedia("(prefers-color-scheme: light)").addListener(() => {
      that.$data.currentMode === "auto" &&
        that.applyMode(that.$data.currentMode);
    });

    this.applyMode(this.currentMode);
  },

  methods: {
    // switch to the next mode
    toggleMode() {
      const currentIndex = modeOptions.indexOf(this.currentMode);
      const nextIndex = (currentIndex + 1) % modeOptions.length;

      this.applyMode(modeOptions[nextIndex]);
      localStorage.setItem("mode", modeOptions[nextIndex]);

      this.currentMode = modeOptions[nextIndex];
    },
    applyMode(mode) {
      if (mode !== "auto") {
        this.setMode(mode);
        return;
      }

      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;
      const isLightMode = window.matchMedia("(prefers-color-scheme: light)")
        .matches;

      if (isDarkMode) this.setMode("dark");
      if (isLightMode) this.setMode("light");

      if (!isDarkMode && !isLightMode) {
        console.log(
          "You specified no preference for a color scheme or your browser does not support it. I schedule dark mode during night time."
        );
        const hour = new Date().getHours();
        if (hour < 6 || hour >= 18) this.setMode("dark");
        else this.setMode("light");
      }
    },
    /*
    原项目：https://github.com/Renovamen/vuepress-theme-gungnir
    协议：Apache License 2.0
    修改内容：适配插件 @zolyn/vuepress-plugin-rightmenu 的夜间模式
    */
    setMode(mode) {
      document.body.setAttribute("data-theme", mode);
      switch (mode) {
          case 'dark': {
              this.$vuetify.theme.dark = true;
              break;
          }
          case 'light': {
              this.$vuetify.theme.dark = false;
              break;
          }
          default: {
              this.$vuefity.dark = false;
          }
      }
    }
  }
};
</script>
