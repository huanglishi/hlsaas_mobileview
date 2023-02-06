<template>
  <nav class="headerNav" :style="setBg(headerConfig.bgConfig)">
    <div class="leftBtn">
      <i
        class="iconfont icon-caidan"
        @click="store.openAside = true"
        v-if="showSideMenu"
      ></i>
    </div>
    <p
      class="pageName"
      :style="{
        'text-align': headerConfig.titleConfig.textAlign,
        'font-size':
          headerConfig.titleConfig.textMode === 'default'
            ? ''
            : `${headerConfig.titleConfig.fontSize}px`,
        color:
          headerConfig.titleConfig.textMode === 'custom' &&
          headerConfig.titleConfig.textColorMode === 'custom'
            ? headerConfig.titleConfig.color
            : '',
      }"
    >
      {{ headerConfig.titleConfig.text }}
    </p>
    <div class="rightBtn">
      <i
        :style="{ color: setIcon.color }"
        v-if="setIcon.iconMode === 'vip'"
        class="iconfont icon-yonghu"
        @click="jump(setIcon.iconMode)"
      ></i>
      <i
        :style="{ color: setIcon.color }"
        v-else-if="setIcon.iconMode === 'search'"
        class="iconfont icon-sousuo"
        @click="jump(setIcon.iconMode)"
      ></i>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { siteData } from "@/store";
export default {
  name: "flex1",
  props: {
    headerConfig: Object,
    showSideMenu: Boolean,
  },
  setup(props) {
    const store = siteData();
    const router = useRouter();
    const { rightBtn } = props.headerConfig;
    const setBg = ({ bgMode, bgType, bgColor, bgImage, defaultBgColor }) => {
      const style = {
        "background-color": defaultBgColor,
      };
      if (bgMode === "default") return style;
      if (bgType === "image") {
        style["background-image"] = `url(${bgImage})`;
      } else {
        style["background-color"] = bgColor;
      }
      return style;
    };
    const jump = (type) => {
      if (type) {
        router.push("/memberCenter");
      } else {
        router.push("/search");
      }
    };

    const setIcon = computed(() => rightBtn);

    return {
      setBg,
      setIcon,
      jump,
      store,
    };
  },
};
</script>

<style lang="less" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;

  .pageName {
    display: inline-block;
    flex: 0.7;
    font-size: 18px;
    margin: 0;
    text-align: center;
  }
  .leftBtn,
  .rightBtn {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    i {
      font-size: 24px;
    }
  }
  .rightBtn {
    width: 24px;
    height: 24px;
  }
}
</style>
