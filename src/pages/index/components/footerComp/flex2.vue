<template>
  <ul class="footer-nav">
    <div class="left">
      <li
        class="item"
        v-for="item in navItems.left"
        :key="item.id"
        @click="matchjumpUrl(item, router.push)"
      >
        <img :src="matchIcon(isActiveIcon(item), item)" alt="" />
        <p
          :style="{
            color: isActiveIcon(item) ? navs.activeTextColor : '',
          }"
        >
          {{ item.navName }}
        </p>
      </li>
    </div>

    <li class="center">
      <div class="center-nav" @click="matchjumpUrl(navItems.center, router.push)">
        <div class="wrap">
          <div
            class="bg"
            :style="{
              'background-color': navs.activeTextColor,
            }"
          >
            <img class="icon" :src="matchIcon(isActiveIcon(navItems.center), navItems.center)" alt="" />
          </div>
        </div>
        <p
          :style="{
            color: isActiveIcon(navItems.center)
              ? navs.activeTextColor
              : '',
          }"
        >
          {{ navItems.center.navName }}
        </p>
      </div>
    </li>

    <div class="right">
      <li
        class="item"
        v-for="item in navItems.right"
        :key="item.id"
        @click="matchjumpUrl(item, router.push)"
      >
        <img :src="matchIcon(isActiveIcon(item), item)" alt="" />
        <p
          :style="{
            color: isActiveIcon(item) ? navs.activeTextColor : '',
          }"
        >
          {{ item.navName }}
        </p>
      </li>
    </div>
  </ul>
</template>

<script>
import { matchjumpUrl } from "@utils/utils";
import { useRouter } from "vue-router";
import { computed } from "vue";
import _ from "lodash-es";
export default {
  name: "flex2",
  props: {
    navs: Object,
    curPageId: String,
  },
  setup(props) {
    const router = useRouter();
    const matchIcon = (isActive, item) => {
      const { icon, activeIcon } = item;
      const defaultIcon = new URL(`@icon/images/footerNav.svg`, import.meta.url).href;
      if (isActive) {
        return _.startsWith(activeIcon, "http") ? activeIcon : defaultIcon;
      } else {
        return _.startsWith(icon, "http") ? icon : defaultIcon;
      }
    };

    const navItems = computed(() => {
      const navItem = {
        left: [],
        center: {},
        right: [],
      };
      switch (_.size(props.navs.navs)) {
        case 1:
          navItem.center = _.last(props.navs.navs);
          break;
        case 2:
          navItem.center = _.last(props.navs.navs);
          navItem.left.push(_.first(props.navs.navs));
          break;
        case 3:
          navItem.center = props.navs.navs[1];
          navItem.left.push(props.navs.navs[0]);
          navItem.right.push(props.navs.navs[2]);
          break;
        case 4:
          navItem.center = props.navs.navs[2];
          navItem.left.push(props.navs.navs[0], props.navs.navs[1]);
          navItem.right.push(props.navs.navs[3]);
          break;
        case 5:
          navItem.center = props.navs.navs[2];
          navItem.left.push(props.navs.navs[0], props.navs.navs[1]);
          navItem.right.push(props.navs.navs[3], props.navs.navs[4]);
          break;
      }
      return navItem;
    });

    const isActiveIcon = ({ urlInfo }) => urlInfo.pageId == props.curPageId;

    return {
      matchIcon,
      navItems,
      isActiveIcon,
      router,
      matchjumpUrl,
    };
  },
};
</script>

<style lang="less" scoped>
.footer-nav {
  width: 375px;
  position: relative;
  display: flex;
  height: 50px;
  padding-bottom: 8px;
  box-sizing: border-box;
  z-index: 300;
  li p {
    font-size: 12px;
    color: #666;
  }

  .left,
  .right {
    display: flex;
    flex: 0 0 40%;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    flex-direction: column;
    img {
      width: 18px;
      height: 18px;
      margin-bottom: 3px;
    }
    p{
      color: #999;
    }
  }
  .center {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 20%;
    flex-direction: column;
    transform: translateY(0px);
    .center-nav {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .wrap {
        width: 50px;
        height: 50px;
        background-color: #fff;
        border-radius: 50%;
        margin-bottom: 4px;
        overflow: hidden;
        padding: 4px;
        box-sizing: border-box;
        .bg {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #5874d8;
          .icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
