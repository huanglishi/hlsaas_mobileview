<template>
  <div class="m-wrapper" v-if="!loading">
    <template v-if="curPage.value.show_side_tabbar == 1">
      <a-side-nav
        :asideConfig="curPage.value.micweb.side_tabbar"
        :curPageId="curPage.value.uuid"
      />
    </template>

    <div class="main-screen">
      <div class="header-tips" v-if="!curPage.value.audit">
        当前站点审核还未通过，页面只用于预览访问！
      </div>
      <header-comp
        v-if="!isTemplate && curPage.value.show_top_tabbar == 1"
        :showSideMenu="curPage.value.show_side_tabbar == 1"
        :showBanner="curPage.value.show_banner == 1"
        :datas="{
          name: curPage.value.name,
          ...curPage.value.micweb?.top_tabbar,
        }"
      />
      <main class="content" ref="content" :style="pageStyle">
        <template v-if="curPage.value.show_banner === 1">
          <banners :bannerConfig="curPage.value.banners" />
        </template>
        <main-content :datas="curPage.value.component" />
        <template v-if="curPage.value.show_copyright === 1">
          <copyright :copytext="curPage.value.micweb?.copyright_text" />
        </template>
      </main>

      <template v-if="curPage.value.show_footer_tabbar === 1">
        <footer-comp
          :datas="curPage.value.micweb.footer_tabbar"
          :curPageId="curPage.value.uuid"
        />
      </template>

      <template v-if="curPage.value.show_returntop">
        <backTop :scrollDom="content" />
      </template>
      <template v-if="curPage.value.show_float_btn">
        <levitation-btn :moveDom="content" :data="curPage.value.float_btn" />
      </template>
    </div>
  </div>

  <div class="mask" v-show="loading">
    <div class="loading">
      <van-loading color="#1989fa"></van-loading>
      <p>加载中..</p>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { siteData } from "@/store";
import ASideNav from "@/components/asideNav/index.vue";
import banners from "@/components/banners/index.vue";
import copyright from "@/components/copyright/index.vue";
import footerComp from "./components/footerComp/index.vue";
import headerComp from "./components/headerComp/index.vue";
import mainContent from "./components/mainContent/index.vue";
import levitationBtn from "./components/levitationBtn/index.vue";
import backTop from "./components/backTop/index.vue";
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import http from "@/axios";
import { initShareStyle } from "@/wxconfig";
export default {
  name: "index",
  components: {
    footerComp,
    headerComp,
    mainContent,
    ASideNav,
    banners,
    copyright,
    backTop,
    levitationBtn,
  },
  setup() {
    const isTemplate = ref(false);
    const loading = ref(false);
    const footerNavs = reactive({ value: {} }); // 页脚导航数据
    const curPage = reactive({ value: {} }); // 页面信息
    const router = useRouter();
    const store = siteData();
    const showBackTopBtn = ref(false);
    const content = ref(null);

    // 页面样式
    const pageStyle = computed(() => {
      if (!curPage.value.templateJson) return {};
      const style = {
        backgroundColor: "",
        backgroundImage: "",
      };
      const { backgroundColor, backgroundImage } = curPage.value.templateJson;
      style.backgroundColor = backgroundColor || "";
      style.backgroundImage = `url(${backgroundImage})` || "";
      return style;
    });

    // 获取页面数据
    const fetchPageData = async () => {
      store.openAside = false;
      loading.value = true;
      const {
        id,
        pageId,
        templateId,
        tplId,
        sitePageId,
        siteId,
      } = router.currentRoute.value.query;
      if (id && pageId) return;
      store.isSiteTemplatePreview = false;
      let res = null;

      /**
       * 进入站点 ?id="站点id"
       * 页面模板预览 ?templateId="模板id"
       * 站点模板预览 ?tplId="站点模板id"
       */

      if (pageId) {
        // 页面预览
        res = await http("getPage", { uuid: pageId, id: siteId || store.siteInfo.id });
      } else if (id) {
        // 站点入口
        res = await http("getHome", { id });
      } else if (templateId) {
        // 页面模板预览
        res = await http("previewTemplate", { id: templateId });
        if (res.data.code === 0 && res.data.result) {
          res.data.result.component = JSON.parse(res.data.result.component);
          res.data.result.templateJson = JSON.parse(res.data.result.templateJson);
        }
      } else if (tplId) {
        store.isSiteTemplatePreview = true;
        // 站点模板预览入口
        res = await http("getWebtpl", { tpl_id: tplId });
      } else if (sitePageId) {
        // 站点模板预览页面
        store.isSiteTemplatePreview = true;
        res = await http("getWebtplPage", {
          tpl_id: store.siteInfo.id,
          uuid: sitePageId,
        });
      }
      isTemplate.value = Boolean(templateId);
      loading.value = false;
      const data = res.data.result;
      if (data) {
        if (data.banners) {
          data.banners = JSON.parse(data.banners);
        }
        if (data.micweb?.side_tabbar) {
          data.micweb.side_tabbar = JSON.parse(data.micweb.side_tabbar);
        }
        if (data.micweb?.top_tabbar) {
          data.micweb.top_tabbar = JSON.parse(data.micweb.top_tabbar);
        }

        if (data.shared_config != "") {
          const sharedData = JSON.parse(data.shared_config);
          if (!_.isEmpty(sharedData)) {
            initShareStyle({
              title: sharedData.title,
              desc: sharedData.dsc,
              imgUrl: sharedData.image,
              micId: data?.micweb.id,
            });
          }
        }

        curPage.value = data;
        document.title = data?.micweb?.title || "";
        store.siteInfo = data?.micweb || {};
      }
    };
    fetchPageData();
    watch(
      () => router.currentRoute.value.query,
      (val) => {
        router.push({
          path: "/",
          query: val,
        });
        fetchPageData();
      }
    );
    return {
      pageStyle,
      curPage,
      footerNavs,
      loading,
      isTemplate,
      scroll,
      showBackTopBtn,
      backTop,
      content,
    };
  },
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
}
.m-wrapper {
  display: flex;
  height: 100%;
  .main-screen {
    position: relative;
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    height: 100%;
    flex: 0 0 375px;
    .header-tips {
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      text-align: center;
      color: #ff8e1e;
      background-color: #fff5dc;
    }
  }
  .header {
    height: 50px;
    background-color: #fff;
  }
  .content {
    width: 375px;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
::v-deep .van-popup {
  background: transparent !important;
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 300px;
  p {
    margin-top: 15px;
    color: #666;
    font-size: 13px;
  }
}
</style>
