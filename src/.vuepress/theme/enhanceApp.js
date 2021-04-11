/*
原项目：https://github.com/Renovamen/vuepress-theme-gungnir
协议：Apache License 2.0
修改内容：增加图标
 */
import postMixin from "@theme/mixins/posts";
import localMixin from "@theme/mixins/locales";
import { registerCodeThemeCss, registerLinks } from "@theme/utils/other";

import OhVueIcon from "oh-vue-icons";

import {
  CoTencentQq,
  RiBilibiliFill,
  CoGmail,
  RiNeteaseCloudMusicFill,
  FaRegularUser,
  FaRegularCalendar,
  RiTimerLine,
  FaSun,
  FaMoon,
  FaMagic,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaListUl,
  BiLayoutSidebarInset,
  FaPencilAlt,
  FaCircle,
  FaRss,
  FaGithubAlt,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  RiZhihuLine,
  FaWeibo,
  FaEnvelope
} from "oh-vue-icons/icons";

OhVueIcon.add(
  CoTencentQq,
  RiBilibiliFill,
  CoGmail,
  RiNeteaseCloudMusicFill,
  FaRegularUser,
  FaRegularCalendar,
  RiTimerLine,
  FaSun,
  FaMoon,
  FaMagic,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaListUl,
  BiLayoutSidebarInset,
  FaPencilAlt,
  FaCircle,
  FaRss,
  FaGithubAlt,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  RiZhihuLine,
  FaWeibo,
  FaEnvelope
);

export default ({ Vue, siteData, isServer }) => {
  Vue.mixin(postMixin);
  Vue.mixin(localMixin);
  Vue.component("MyIcon", OhVueIcon);
  if (!isServer) {
    registerCodeThemeCss(siteData.themeConfig.codeTheme);
    registerLinks();
  }
};
