<template>
  <component :is="datas.flexComp" :navs="datas.navs" />
</template>

<script lang="ts">
import flex1 from "./components/flex1.vue";
import flex2 from "./components/flex2.vue";
import flex3 from "./components/flex3.vue";
import flex4 from "./components/flex4.vue";
export default {
  name: "cubeNavComp",
  components: {
    flex1,
    flex2,
    flex3,
    flex4,
  },
  props: {
    // 组件配置
    datas: {
      type: Object,
      default: () => ({
        flexComp: "flex1",
        navs: [],
      }),
    },
  },
};
</script>
