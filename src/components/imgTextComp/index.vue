<template>
  <div @click="matchjumpUrl(datas, router.push)" class="wrapper" :class="datas.styleClass">
    <div class="img-wrap">
      <img
        :src="datas.imgUrl"
        alt=""
        :style="{
          width: `${datas.width}%`,
        }"
      />
    </div>
    <div>
      {{ datas.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { matchjumpUrl } from "@utils/utils";
import { useRouter } from "vue-router";
export default {
  name: "imgTextComp",
  props: {
    datas: {
      type: Object,
      default: () => ({
        text: "请输入文本内容",
        imgUrl: "",
        jumpUrl: "",
        width: 50,
        styleClass: "wrapper-2",
      }),
    },
  },
  setup() {
    const router = useRouter();
    return {
      matchjumpUrl,
      router
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: block;
}
.wrapper-1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;

  img {
    display: none;
  }
  div {
    width: 100%;
    display: block;
    font-size: 14px;
    color: #666;
    line-height: 18px;
    margin: 10px;
  }
}
.wrapper-2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;

  .img-wrap {
    img {
      width: 340px;
    }
    max-height: 220px;
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  div {
    width: 100%;
    display: block;
    font-size: 14px;
    color: #666;
    line-height: 18px;
  }
}

.wrapper-3 {
  padding: 10px;
  overflow: hidden;
  img {
    float: left;
    margin-right: 10px;
    border-radius: 6px;
  }
  div {
    width: 100%;
    display: block;
    font-size: 14px;
    color: #666;
    line-height: 18px;
  }
}
.wrapper-4 {
  padding: 10px;
  overflow: hidden;

  img {
    float: right;
    margin-left: 10px;
    border-radius: 6px;
  }
  div {
    width: 100%;
    display: block;
    font-size: 14px;
    color: #666;
    line-height: 18px;
  }
}
</style>
