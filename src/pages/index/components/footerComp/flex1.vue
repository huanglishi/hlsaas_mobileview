<!-- 底部导航 -->
<template>
  <ul class="footer-nav">
    <li class="nav-item" v-for="(item, index) in navs.navs" :key="index">
      <div @click="matchjumpUrl(item, router.push)">
        <img :src="matchIcon(isActiveIcon(item), item)" />
        <p
          :style="{
            color: isActiveIcon(item) ? navs.activeTextColor : '',
          }"
        >
          {{ item.navName }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import _ from "lodash";
import { matchjumpUrl } from "@utils/utils";
import { useRouter } from "vue-router";
export default {
  name: "flex1",
  props: {
    navs: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    curPageId: {
      // 当前页面的id
      type: String,
      required: true,
      default: () => 1,
    },
  },
  setup(props: any) {
    const router = useRouter();
    // 匹配对应的图标
    const matchIcon = (isActive: Boolean, item: any) => {
      const { icon, activeIcon } = item;
      const defaultIcon = new URL(`@icon/images/footerNav.svg`, import.meta.url).href;
      if (isActive) {
        return _.startsWith(activeIcon, "http") ? activeIcon : defaultIcon;
      } else {
        return _.startsWith(icon, "http") ? icon : defaultIcon;
      }
    };

    // 判断是否激活icon
    const isActiveIcon = (item: any): Boolean => {
      const { urlInfo } = item;
      return urlInfo.pageId == props.curPageId;
    };

    return {
      matchIcon,
      isActiveIcon,
      matchjumpUrl,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.footer-nav {
  display: flex;
  background-color: #fff;
  border-top: 1px solid rgba(235, 235, 235, 0.74);
  padding: 6px 0;
  z-index: 300;
  .nav-item {
    flex: 1;
    cursor: pointer;
    > div {
      display: block;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      width: 16px;
      height: 16px;
    }
    p {
      color: #999;
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
</style>
