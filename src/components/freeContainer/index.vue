<template>
  <div
    class="wrapper"
    ref="wrapperDom"
    :style="{
      minHeight: `${pxToVw('height', datas.height)}vh`,
      ...containerBg(datas),
    }"
  >
    <template v-for="item in datas.component" :key="item.id">
      <!-- 输入框 -->
      <template v-if="item.componentName === 'textComp'">
        <div
          class="input"
          placeholder="双击输入内容"
          :style="{
            top: `${pxToVw('height', item.datas.top)}vh`,
            left: `${pxToVw('width', item.datas.left)}vw`,
            minHeight: `${pxToVw('height', item.datas.height)}vh`,
            width: `${pxToVw('width', item.datas.width)}vw`,
            color: item.datas.color,
            'font-size': `${item.datas.fontSize}px`,
            'font-weight': item.datas.fontWeight ? 'bold' : 'normal',
            'font-style': item.datas.isItalic ? 'italic' : 'normal',
            'text-decoration': item.datas.isDecoration ? 'underline' : 'none',
            'writing-mode': matchTextDirection(item.datas),
            'text-align-last': item.datas.textAlign,
            'letter-spacing': `${item.datas.letterSpacing}px`,
            'line-height': `${item.datas.lineHeight}px`,
            'z-index': item.datas.zIndex,
          }"
          @click="matchjumpUrl(item.datas, router.push)"
        >
          {{ item.datas.value }}
        </div>
      </template>

      <!-- 图片 -->
      <template v-else-if="item.componentName === 'imageComp'">
        <div
          class="add-img"
          :style="{
            top: `${pxToVw('height', item.datas.top)}vh`,
            left: `${pxToVw('width', item.datas.left)}vw`,
            height: `${pxToVw('height', item.datas.height)}vh`,
            width: `${pxToVw('width', item.datas.width)}vw`,
            'z-index': item.datas.zIndex,
          }"
          @click="matchjumpUrl(item.datas, router.push)"
        >
          <div
            class="img-container"
            :style="{
              opacity: item.datas.opacity,
              'border-radius': item.datas.borderRadius,
            }"
          >
            <img :src="item.datas.image" :alt="item.datas.alt" />
          </div>
        </div>
      </template>

      <!-- 按钮 -->
      <template v-else>
        <div
          class="custom-wrapper"
          :style="{
            top: `${pxToVw('height', item.datas.top)}vh`,
            left: `${pxToVw('width', item.datas.left)}vw`,
            height: `${pxToVw('height', item.datas.height)}vh`,
            width: `${pxToVw('width', item.datas.width)}vw`,
            'z-index': item.datas.zIndex,
          }"
          @click="matchjumpUrl(item.datas, router.push)"
        >
          <div
            class="custom-btn"
            :style="{
              'background-color': item.datas.backgroundColor,
              'font-size': `${item.datas.fontSize}px`,
              color: item.datas.textColor,
            }"
          >
            {{ item.datas.text }}
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { matchjumpUrl, pxToVw } from "@utils/utils";
import { useRouter } from "vue-router";
export default {
  name: "freeContainer",
  props: {
    datas: Object,
  },
  setup(props) {
    const router = useRouter();

    const containerBg = ({ bgMode, bgType, defaultBg, bgColor, bgImage }) => {
      switch (bgMode) {
        case "default":
          // 默认
          return {
            "background-color": defaultBg,
          };
        case "hide":
          // 隐藏
          return {
            "background-color": "transparent",
          };
        default:
          // 自定义
          if (bgType === "color") {
            return {
              "background-color": bgColor,
            };
          } else {
            return {
              "background-image": `url(${bgImage})`,
              "background-size": "100% 100%",
              "background-repeat": "no-repeat",
            };
          }
      }
    };

    const matchTextDirection = ({ textDirection }) => {
      switch (textDirection) {
        case "verticalLr":
          return "vertical-lr";
        case "verticalRl":
          return "vertical-rl";
        default:
          return "horizontal-tb";
      }
    };

    return {
      matchjumpUrl,
      router,
      pxToVw,
      containerBg,
      matchTextDirection,
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  //overflow: hidden;
  user-select: none;
  &.openMask {
    &::before {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      filter: blur(2px);
      background-color: #f5f8ff;
      z-index: 1;
    }
    &::after {
      z-index: 2;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      color: #5874d8;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed #5874d8;
      box-sizing: border-box;
      content: "放入自由容器中";
    }
  }
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: inline-block;
  height: 30px;
  transform: translateY(50%);
  cursor: n-resize;
}
.add-img {
  position: absolute;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 1px dashed transparent;
  .img-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    img {
      user-select: none;
      width: 100%;
    }
  }

  span {
    display: none;
    position: absolute;
    &::after {
      position: absolute;
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      box-sizing: border-box;
      background-color: #fff;
      border: 1px solid #5874d8;
    }

    &:nth-of-type(1) {
      top: 0;
      left: 0;
      right: 0;
      height: 12px;
      transform: translateY(-50%);
      cursor: n-resize;
      &::after {
        top: 2px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    &:nth-of-type(2) {
      top: 0;
      bottom: 0;
      right: 0;
      width: 12px;
      transform: translateX(50%);
      cursor: ew-resize;
      &::after {
        right: 2px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    &:nth-of-type(3) {
      left: 0;
      right: 0;
      bottom: 0;
      cursor: n-resize;
      height: 12px;
      transform: translateY(50%);
      &::after {
        bottom: 1px;
        left: 50%;
        transform: translate(-50%);
      }
    }
    &:nth-of-type(4) {
      top: 0;
      bottom: 0;
      left: 0;
      width: 12px;
      transform: translateX(-50%);
      cursor: ew-resize;
      &::after {
        left: 1px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
.custom-wrapper {
  position: absolute;

  .custom-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    width: 100%;
    height: 100%;
    background-color: gray;
    user-select: none;
    cursor: pointer;
    border-radius: 10px;
  }
  span {
    position: absolute;
    display: block;
    cursor: n-resize;
    &::after {
      position: absolute;
      display: block;
      content: "";
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid transparent;
      width: 10px;
      height: 10px;
    }
    &::before {
      position: absolute;
      content: "";
      display: block;
    }
    &:nth-of-type(1) {
      left: 0;
      right: 0;
      top: 0;
      height: 10px;
      border-top: 1px dashed transparent;
      &::after {
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &::before {
        top: 0;
        left: 0;
        right: 0;
        height: 20px;
        transform: translateY(-100%);
      }
    }
    &:nth-of-type(2) {
      top: 0;
      bottom: 0;
      right: 0;
      width: 10px;
      cursor: ew-resize;
      border-right: 1px dashed transparent;
      &::after {
        top: 50%;
        transform: translate(50%, -50%);
      }
      &::before {
        top: 0;
        bottom: 0;
        right: 0;
        width: 20px;
        transform: translateX(100%);
      }
    }
    &:nth-of-type(3) {
      left: 0;
      right: 0;
      bottom: 0;
      height: 10px;
      border-bottom: 1px dashed transparent;
      &::after {
        left: 50%;
        transform: translate(-50%, 50%);
      }
      &::before {
        right: 0;
        bottom: 0;
        left: 0;
        height: 20px;
        transform: translateY(100%);
      }
    }
    &:nth-of-type(4) {
      top: 0;
      bottom: 0;
      left: 0;
      width: 10px;
      cursor: ew-resize;
      border-left: 1px dashed transparent;
      &::after {
        top: 50%;
        transform: translate(-50%, -50%);
      }
      &::before {
        top: 0;
        bottom: 0;
        left: 0;
        width: 20px;
        transform: translateX(-100%);
      }
    }
  }
}
.input {
  position: absolute;
  line-height: 20px;
  border: 1px dashed transparent;
  display: inline-block;
  font-size: 18px;
  padding: 4px;
  box-sizing: border-box;
  white-space: pre-wrap;
  cursor: text;

  &:empty::before {
    color: #666;
    font-size: 18px;
    content: attr(placeholder);
    user-select: none;
  }
}
</style>
