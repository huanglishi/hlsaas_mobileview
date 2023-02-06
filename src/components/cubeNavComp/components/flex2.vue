<template>
  <ul class="nav-list-2">
    <li class="nav-item" v-for="(item, index) in navs" :key="index" :style="setBg(item)">
      <div @click="matchjumpUrl(item, router.push)" :class="`flex-use-${item.flexUse}`">
        <div class="titles">
          <p
            v-if="!item.hideTitle"
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
            {{ item.title }}
          </p>
          <p
            v-if="!item.hideSubtitle"
            :style="{
              'font-weight':
                item.subtitlefontWeight && item.subtitleStyle === 'custom'
                  ? 700
                  : 'normal',
              'text-decoration':
                item.subtitleOutLine && item.subtitleStyle === 'custom'
                  ? 'underline'
                  : 'none',
              color:
                item.subtitleStyle === 'custom'
                  ? item.subtitleColor
                  : item.defaultSubtitleColor,
              'font-size':
                item.subtitleStyle === 'custom'
                  ? `${item.subtitleFontSize}px`
                  : `${item.defaultSubtitleFontSize}px`,
            }"
          >
            {{ item.subtitle }}
          </p>
        </div>
        <div class="icon-bg">
          <template v-if="item.iconModel !== 'hide'">
            <img
              :src="setParams(item, 'iconModel', 'defaultIcon', 'customIcon')"
              alt=""
            />
          </template>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { matchjumpUrl } from "@utils/utils";
import { useRouter } from "vue-router";
import _ from "lodash";
export default {
  name: "flex2",
  props: {
    navs: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
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
      setParams,
      matchjumpUrl,
      router,
      setBg,
    };
  },
};
</script>

<style lang="less" scoped>
.nav-list-2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 0;
  .nav-item {
    display: flex;
    flex-direction: column;
    width: calc(50% - 16px);
    background-color: gray;
    margin: 8px 8px;
    box-sizing: border-box;
    height: 100px;

    > div {
      display: flex;
      width: 100%;
      height: 100%;
      .icon-bg {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        height: 30px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      &.flex-use-1 {
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        padding: 15px;
        box-sizing: border-box;
        .titles {
          width: 100%;
          p {
            text-align: left;
          }
        }
        .icon-bg {
          display: flex;
          align-items: flex-end;
          width: 100%;
        }
      }

      &.flex-use-2 {
        justify-content: space-between;
        align-items: center;
        flex-direction: column-reverse;
        padding: 10px 0;
        box-sizing: border-box;
        .icon-bg {
          margin-bottom: 20px;
        }
      }

      &.flex-use-3 {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        box-sizing: border-box;
        .icon-bg {
          margin-top: 20px;
        }
      }

      &.flex-use-4 {
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        padding: 30px 10px;
        box-sizing: border-box;
        p {
          text-align: right;
        }
      }

      &.flex-use-5 {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 30px 10px;
        box-sizing: border-box;
        p {
          text-align: left;
        }
      }
    }

    .titles {
      p {
        color: #fff;
        &:nth-of-type(1) {
          font-size: 15px;
          margin-bottom: 4px;
        }
        &:nth-of-type(2) {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
