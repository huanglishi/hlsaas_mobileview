<template>
  <component :is="`flex${datas.flexUse}`" :datas="datas" />
</template>

<script lang="ts">
import flex1 from "./components/flex1.vue";
import flex2 from "./components/flex2.vue";
export default {
  name: "swipe",
  components: {
    flex1,
    flex2,
  },
  props: {
    datas: Object,
  },
};
</script>

<style></style>
