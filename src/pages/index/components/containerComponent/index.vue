<!-- 模块外部容器 -->
<template>
  <div
    class="container-wrap"
    :style="{
      opacity: 1 - moduleSetting.opacity / 100,
    }"
  >
    <template v-if="moduleSetting.showTitle">
      <!-- 样式一 -->
      <div
        class="title-2"
        :style="titleWrapperStyle(moduleSetting)"
        v-if="moduleSetting.selectStyle === 2"
      >
        <span
          :style="{
            ...marginStyle(moduleSetting),
            ...titleTextStyle(moduleSetting),
            backgroundColor: moduleSetting.color,
          }"
          >{{ moduleSetting.title }}</span
        >
      </div>

      <!-- 样式二 -->
      <div class="title-3" v-else-if="moduleSetting.selectStyle === 3">
        <div class="content" :style="marginStyle(moduleSetting)">
          <i class="dot" :style="{ backgroundColor: moduleSetting.color }"></i>
          <span :style="titleTextStyle(moduleSetting)">{{ moduleSetting.title }}</span>
        </div>
      </div>

      <!-- 默认样式 -->
      <div class="title-1" :style="titleWrapperStyle(moduleSetting)" v-else>
        <div class="content" :style="marginStyle(moduleSetting)">
          <i class="dot" :style="{ backgroundColor: moduleSetting.color }"></i>
          <span :style="titleTextStyle(moduleSetting)">{{ moduleSetting.title }}</span>
        </div>
      </div>
    </template>
    <!-- 内容区 -->
    <div
      :style="{
        backgroundColor: moduleSetting.backgroundColor,
      }"
    >
      <component :is="compName" :datas="compConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { pxToVw } from "@utils/utils";
const files = import.meta.globEager("@/components/**/index.vue");
const comps: any = {};
_.keys(files).forEach((key: String) => {
  const index = key.indexOf("/", 5);
  const index2 = key.indexOf("/index.vue");
  const name = key.substring(index + 1, index2);
  comps[name] = files[key].default;
});
export default {
  name: "containerComponent",
  components: {
    ...comps,
  },
  props: {
    // 容器模块配置
    moduleSetting: {
      type: Object,
      default: () => ({
        selectStyle: 1, // 选中的预设样式
        title: "模块标题", // 模块标题
        showTitle: true, // 是否显示标题
        color: "rgb(255,114,20)", // 标题颜色
        backgroundColor: "#fff", // 背景色
      }),
    },
    // 组件配置
    compConfig: {
      type: Object,
      default: () => ({}),
    },
    // 组件名
    compName: {
      type: String,
      default: () => "",
    },
    // 组件id
    compId: {
      type: String,
      default: () => "",
    },
  },
  setup() {
    const titleTextStyle = ({
      titleType,
      defaultFoontSize,
      fontColor,
      customFontSize,
      fontWeight,
      titleColorType,
      selectStyle,
      color,
    }) => {
      let styleObj = {};
      // 标题文字
      if (titleType == "default") {
        styleObj["font-size"] = `${defaultFoontSize}px`;
        styleObj["font-weight"] = "normal";
        styleObj["color"] = [1, 3].includes(selectStyle) ? color : "#fff";
      } else if (titleType === "custom") {
        styleObj["font-size"] = `${customFontSize}px`;
        styleObj["font-weight"] = fontWeight ? "bold" : "normal";
        styleObj["color"] =
          titleColorType === "default"
            ? [1, 3].includes(selectStyle)
              ? color
              : "#fff"
            : fontColor;
      }

      return styleObj;
    };

    const marginStyle = ({
      paddingType,
      topPadding,
      bottomoPadding,
      leftPadding,
      rightPadding,
    }) => {
      let styleObj = {};
      // 标题内容边距
      if (paddingType == "default") {
        delete styleObj["margin"];
      } else if (paddingType == "custom") {
        styleObj["margin"] = `${pxToVw("height", topPadding)}px ${pxToVw(
          "width",
          rightPadding
        )}px ${pxToVw("height", bottomoPadding)}px ${pxToVw("width", leftPadding)}px`;
      }
      return styleObj;
    };

    const titleWrapperStyle = ({
      titleHeightType,
      titleHeight,
      titleBgType,
      customColor,
      customType,
      customBgImg,
    }) => {
      let styleObj = {};
      // 标题栏高度
      if (titleHeightType == "default") {
        styleObj["height"] = "auto";
        delete styleObj["box-sizing"];
      } else if (titleHeightType == "custom") {
        styleObj["height"] = `${pxToVw("height", titleHeight)}px`;
        styleObj["box-sizing"] = `border-box`;
      }

      // 标题栏背景
      if (titleBgType == "default") {
        styleObj["background-color"] = `#fff`;
        delete styleObj["background-image"];
      } else if (titleBgType == "hide") {
        styleObj["background-color"] = `transparent`;
        delete styleObj["background-image"];
      } else if (titleBgType == "custom") {
        styleObj["background-color"] = customColor;
        if (customType == "color") {
          delete styleObj["background-image"];
        } else {
          styleObj["background-image"] = `url(${customBgImg})`;
        }
      }
      return styleObj;
    };
    return {
      titleTextStyle,
      marginStyle,
      titleWrapperStyle,
    };
  },
};
</script>

<style lang="less" scoped>
.container-wrap {
  margin-bottom: 14px;
  position: relative;
  .content {
    display: flex;
    align-items: center;
  }

  .title-1 {
    display: flex;
    align-items: center;
    padding: 10px 0;
    background-color: #fff;
    border-bottom: 1px solid rgb(219, 219, 219);
    .dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      margin: 0 10px;
    }
    span {
      display: flex;
      align-items: center;
      color: rgb(255, 114, 20);
      font-size: 16px;
    }
  }
  .title-2 {
    padding: 10px 0;
    background-color: #fff;
    border-bottom: 1px solid rgb(219, 219, 219);
    span {
      color: #fff;
      font-size: 14px;
      display: inline-block;
      line-height: 24px;
      padding: 2px 10px;
      background-color: rgb(255, 114, 20);
      border-radius: 0 24px 24px 0;
    }
  }
  .title-3 {
    display: flex;
    align-items: center;

    padding: 10px 0;
    background-color: #fff;
    border-bottom: 1px solid rgb(219, 219, 219);
    .dot {
      display: inline-block;
      width: 4px;
      height: 14px;
      border-radius: 2px;
      margin: 0 10px;
    }
    span {
      display: flex;
      align-items: center;
      font-size: 16px;
    }
  }
}
</style>
