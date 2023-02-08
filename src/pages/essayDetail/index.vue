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
import { reactive ,nextTick} from "vue";
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
        if(res.data.result.type==1){
          // window.location.href = res.data.result.link
          // 跳转到user.html 页面并清除当前页面的history记录
          let backlen = window.history.length - 2;
		    	window.history.go(- backlen);
          nextTick(()=>{
            window.location.href = res.data.result.link
          })
        }else{
          essayContent.value = res.data.result;
        }
      });
    }

    const back = () => {
      if(window.history.length<=1){//判断有没有上级路由；
         //这个可以关闭安卓系统的手机
         document.addEventListener("WeixinJSBridgeReady", function() {
                WeixinJSBridge.call("closeWindow");
            },
            false
        );
        //这个可以关闭ios系统的手机
        WeixinJSBridge.call("closeWindow");
      }else{
        router.back(); //返回上级路由
      }
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
    top: 18px;
    left: 20px;
    width: @btnSize;
    height: @btnSize;
    text-align: center;
    line-height: @btnSize;
    color: #fff;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
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
