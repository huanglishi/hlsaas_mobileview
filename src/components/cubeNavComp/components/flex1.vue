<template>
  <ul class="nav-list-1">
    <li class="nav-item" v-for="(item, index) in navs" :key="index">
      <div @click="matchjumpUrl(item, router.push)">
        <div class="icon-bg" :style="setBg(item)">
          <template v-if="item.iconModel !== 'hide'">
            <img
              :src="setParams(item, 'iconModel', 'defaultIcon', 'customIcon')"
              alt=""
            />
          </template>
        </div>
        <p
          :style="{
            'font-weight':
              item.titlefontWeight && item.titleStyle === 'custom' ? 700 : 'normal',
            'text-decoration':
              item.titleOutLine && item.titleStyle === 'custom' ? 'underline' : 'none',
            color:
              item.titleStyle === 'custom' ? item.titleColor : item.defaultTitleColor,
            'font-size':
              item.titleStyle === 'custom'
                ? `${item.titleFontSize}px`
                : `${item.defaultFontSize}px`,
          }"
        >
          {{ item.hideTitle ? "" : item.title }}
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
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
    // 设置图标 背景
    const setParams = (item: any, model: any, defaultParam: any, customParam: any) => {
      if (item[model] === "default") {
        if (model === "iconModel") {
          return new URL(
            `../../../assets/images/mofangNav/${item[defaultParam]}`,
            import.meta.url
          ).href;
        } else {
          return item[defaultParam];
        }
      } else if (item[model] === "hide") {
        return model === "bgModel" ? "transparent" : "";
      } else {
        return item[customParam];
      }
    };

    const setBg = ({ bgModel, bgType, defaultBg, customBg, customBgImg }) => {
      const style = {};
      switch (bgModel) {
        case "default":
          style["background-color"] = defaultBg;
          break;
        case "hide":
          style["background-color"] = "transparent";
          break;
        default:
          style["background-color"] = customBg;
          style["background-image"] = `url(${customBgImg})`;
      }
      return style;
    };

    return {
      setParams,
      matchjumpUrl,
      router,
      setBg,
    };
  },
};
</script>

<style lang="less" scoped>
.nav-list-1 {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  .nav-item {
    padding: 6px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% / 5);
    box-sizing: border-box;
    margin-bottom: 15px;

    .icon-bg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: contain;
      img {
        width: 50%;
        height: 50%;
      }
    }
    p {
      margin-top: 10px;
      font-size: 12px;
      text-align: center;
      color: #333;
    }
  }
}
</style>
