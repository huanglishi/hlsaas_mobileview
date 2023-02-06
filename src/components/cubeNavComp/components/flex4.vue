<template>
  <ul class="nav-list">
    <li
      v-for="(item, index) in navs"
      :key="index"
      :style="{
        width: `${calcWidth(index)}%`,
      }"
    >
      <div
        @click="matchjumpUrl(item, router.push)"
        class="content"
        :class="`flex-use-${item.flexUse}`"
        :style="setBg(item)"
      >
        <div class="icon-bg">
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
          {{ !item.hideTitle ? item.title : "" }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { matchjumpUrl } from "@utils/utils";
import { useRouter } from "vue-router";

import { ref, reactive } from "vue";
import _ from "lodash";
export default {
  name: "flex1",
  props: {
    navs: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const router = useRouter();
    const initData = reactive(props.navs);
    const len = ref(initData.length);
    const remainder = ref(len.value % 3);
    // 计算占比
    const calcWidth = (index: Number) => {
      if (len.value <= 3) {
        // 数量小于3个
        if (len.value === 3) return 100 / 3;
        if (len.value === 2) return 50;
        if (len.value === 1) return 100;
        if (len.value === 0) return 0;
      } else {
        // 数量大于3个
        if (len.value - remainder.value - 1 >= index) {
          return 100 / 3;
        } else {
          return remainder.value === 1 ? 100 : 50;
        }
      }
    };

    const setParams = (item, model, defaultParam, customParam) => {
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
      calcWidth,
      initData,
      setParams,
      matchjumpUrl,
      router,
      setBg,
    };
  },
};
</script>

<style lang="less" scoped>
.nav-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 5px;
  li {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 110px;
    padding: 5px;
    box-sizing: border-box;

    .content {
      display: flex;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% auto;

      &.flex-use-1 {
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .icon-bg {
          margin-bottom: 15px;
        }
      }

      &.flex-use-2 {
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding: 10px 0;
        box-sizing: border-box;
      }

      &.flex-use-3 {
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        box-sizing: border-box;
      }

      &.flex-use-4 {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        p {
          text-align: right;
        }
      }

      &.flex-use-5 {
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        p {
          text-align: left;
        }
      }
    }
    .icon-bg {
      display: inline-block;
      width: 26px;
      height: 26px;
      font-size: 30px;
      color: #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      width: 80%;
      font-size: 13px;
      text-align: center;
      z-index: 1;
      margin: 0;
      color: #fff;
    }
  }
}
</style>
