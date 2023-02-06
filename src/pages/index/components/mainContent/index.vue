<template>
  <container-component
    v-for="item in datas"
    :key="item.id"
    :moduleSetting="item.containerConfig"
    :compConfig="item.datas"
    :compName="item.componentName"
    :compId="item.id"
  />
</template>

<script lang="ts">
import _ from "lodash";
import containerComponent from "../containerComponent/index.vue";


export default {
  name: "mainContent",
  components: {
    containerComponent,
  },
  props: {
    datas: {
      type: Array,
      default: () => [],
    },
  },
};
</script>