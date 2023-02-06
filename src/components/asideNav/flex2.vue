<template>
  <aside
    class="aside"
    :style="{
      flex: `0 0 ${store.openAside ? 80 : 0}%`,
    }"
  >
    <ul class="content">
      <li
        class="item"
        v-for="item in asideConfig.navs"
        :key="item.id"
        @click="matchjumpUrl(item, router.push)"
      >
        <img :src="matchIcon(isActiveIcon(item), item)" alt="" />
        <p
          :style="{
            color: isActiveIcon(item) ? asideConfig.activeTextColor : '',
          }"
        >
          {{ item.text }}
        </p>
      </li>
    </ul>
    <div class="mask" @click="store.openAside = false"></div>
  </aside>
</template>

<script>
import { matchjumpUrl } from "@utils/utils";
import { siteData } from "@/store";
import { useRouter } from "vue-router";
import _ from "lodash-es";
export default {
  name: "flex2",
  props: {
    asideConfig: Object,
    curPageId: String,
  },
  setup(props) {
    const router = useRouter();
    const store = siteData();
    // 匹配对应的图标
    const matchIcon = (isActive, item) => {
      const { icon, activeIcon } = item;
      const defaultIcon = new URL(`@icon/images/footerNav.svg`, import.meta.url).href;
      if (isActive) {
        return _.startsWith(activeIcon, "http") ? activeIcon : defaultIcon;
      } else {
        return _.startsWith(icon, "http") ? icon : defaultIcon;
      }
    };

    // 判断是否激活icon
    const isActiveIcon = ({ urlInfo }) => urlInfo.pageId == props.curPageId;

    return {
      store,
      matchIcon,
      matchjumpUrl,
      isActiveIcon,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.aside {
  position: relative;
  height: inherit;
  transition: all 0.3s ease;
  background-color: #181f25;
  z-index: 9999;

  .content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    .item {
      display: flex;
      width: 50%;
      height: 60px;
      align-items: center;
      padding-left: 30px;
      overflow: hidden;
      cursor: pointer;
      user-select: none;
      overflow: hidden;
      box-sizing: border-box;
      img {
        width: 24px;
        height: 24px;
        margin-right: 15px;
      }
      p {
        color: #8a96a7;
        display: flex;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .mask {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    transform: translateX(100%);
    width: 50%;
  }
}
</style>
