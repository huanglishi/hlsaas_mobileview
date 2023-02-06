<template>
  <component :is="`flex${datas.moduleStyle.flexUse}`" :datas="datas" />
</template>

<script  lang="ts">
import flex1 from "./components/flex1.vue";
import flex2 from "./components/flex2.vue";
export default {
  name: "imgList",
  components: {
    flex1,
    flex2,
  },
  props: {
    datas: {
      type: Object,
      default: () => ({
        moduleStyle: {
          flexUse: 1, // 模块布局
          columnNum: 1, // 列数
          imgPosition: "right", // 图片位置
          showImgName: true, // 显示图片名称
          showImgDetail: true, // 显示图片描述
        },
        imgList: [
          // 图片列表信息
          {
            imgUrl:
              "https://1.s140i.faiusr.com/2/AIwBCAAQAhgAIJv17NUFKPLrqr8BMIAPOIAK!640x640.jpg",
            jumpType: "",
            urlInfo: {
              pageName: "",
              pageId: "",
              url: "",
            },
            name: "名字",
            detail: "描述",
            id: _.uniqueId("img_"),
          },
        ],
      }),
    },
  },
};
</script>
