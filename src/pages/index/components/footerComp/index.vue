<template>
  <component :is="`flex${datas.flex}`" :navs="datas" :curPageId="curPageId" />
</template>

<script>
import flex1 from "./flex1.vue";
import flex2 from "./flex2.vue";
export default {
  name: "footerNav",
  components: {
    flex1,
    flex2,
  },
  props: {
    datas: Object,
    curPageId: String,
  },
};
</script>

<style></style>
