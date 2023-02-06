<template>
  <nav
    class="headerNav"
    :style="{ position: !showBanner ? 'relative' : 'position', ...setBg }"
  >
    <div class="leftBtn">
      <i
        class="iconfont icon-caidan"
        @click="store.openAside = true"
        v-if="showSideMenu"
      ></i>
    </div>
    <div
      class="search-box"
      @click="router.push('/search')"
      :style="{
        'background-color':
          headerConfig.searchBoxConfig.bgMode === 'default'
            ? '#f0f1f3'
            : headerConfig.searchBoxConfig.bgColor,
        'border-color':
          headerConfig.searchBoxConfig.borderMode === 'default'
            ? ''
            : headerConfig.searchBoxConfig.borderColor,
      }"
    >
      <i
        :style="{
          color:
            headerConfig.searchBoxConfig.iconColorMode === 'default'
              ? '#787878'
              : headerConfig.searchBoxConfig.iconColor,
        }"
        class="iconfont icon-sousuo"
      ></i>
      <p
        :style="{
          'font-size':
            headerConfig.searchBoxConfig.textConfig === 'default'
              ? ''
              : `${headerConfig.searchBoxConfig.textFontSize}px`,
          color:
            headerConfig.searchBoxConfig.textConfig === 'custom' &&
            headerConfig.searchBoxConfig.textColorMode === 'custom'
              ? headerConfig.searchBoxConfig.textColor
              : '#787878',
        }"
      >
        搜索
      </p>
    </div>
    <div class="rightBtn" v-if="headerConfig.rightBtn.iconMode === 'vip'">
      <i
        :style="{
          color: headerConfig.rightBtn.color,
        }"
        @click="router.push('/memberCenter')"
        class="iconfont icon-yonghu"
      ></i>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { siteData } from "@/store";
export default {
  name: "flex3",
  props: {
    headerConfig: Object,
    showSideMenu: Boolean,
    showBanner: Boolean,
  },
  setup() {
    const router = useRouter();
    const store = siteData();

    return {
      store,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.headerNav {
  position: absolute;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;

  .search-box {
    display: flex;
    align-items: center;
    height: 30px;
    flex: 1;
    margin: 0 15px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid transparent;
    .iconfont {
      margin-right: 10px;
    }
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
