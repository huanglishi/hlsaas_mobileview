<template>
  <div class="wrapper">
    <div class="leftBtn" @click="back">
      <i class="iconfont icon-jiantou-zuo"></i>
    </div>

    <div class="content" v-if="!isEmpty(essayContent.value)">
      <h1>{{ essayContent.value.title }}</h1>
      <div class="essay-info">
        <p class="author">{{ essayContent.value.author }}</p>
        <p class="time">
          {{ day.unix(essayContent.value.releasetime).format("YYYY/MM/DD") }}
        </p>
      </div>
      <div class="rich-text-content" v-html="essayContent.value.content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { siteData } from "@/store/index";
import { reactive } from "vue";
import http from "@/axios";
import { useRoute, useRouter } from "vue-router";
import day from "dayjs";
import { isEmpty } from "lodash";
export default {
  name: "essayDetail",
  setup() {
    const store = siteData();
    const essayContent = reactive({ value: {} });
    const route = useRoute();
    const router = useRouter();
    const { essayId } = route.query;
    if (essayId) {
      http("getArtic", { id: essayId }).then((res) => {
        essayContent.value = res.data.result;
      });
    }

    const back = () => {
      router.back();
    };

    const jumpHome = () => {
      router.push(`/?id=${store.siteInfo.id}`);
    };

    return {
      essayContent,
      day,
      jumpHome,
      back,
      isEmpty,
    };
  },
};
</script>

<style lang="less">
.rich-text-content {
  img {
    vertical-align: bottom;
  }
}
</style>
<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  .leftBtn {
    @btnSize: 30px;
    position: absolute;
    top: 25px;
    left: 25px;
    width: @btnSize;
    height: @btnSize;
    text-align: center;
    line-height: @btnSize;
    color: #fff;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
  }
  .content {
    flex: 1;
    overflow: auto;
    padding: 20px 10px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }
    > h1 {
      font-size: 18px;
      margin-bottom: 15px;
      font-weight: 700;
    }
    .essay-info {
      display: flex;
      margin-bottom: 20px;
      p {
        font-size: 13px;
        color: #b3b3b3;
        margin-right: 10px;
      }
    }
  }
}
</style>
