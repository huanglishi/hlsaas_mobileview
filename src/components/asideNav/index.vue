<template>
  <component
    :is="`flex${asideConfig.flex}`"
    :asideConfig="asideConfig"
    :curPageId="curPageId"
  />
</template>

<script>
import flex1 from "./flex1.vue";
import flex2 from "./flex2.vue";
export default {
  components: {
    flex1,
    flex2,
  },
  props: {
    asideConfig: Object,
    curPageId: String,
  },
};
</script>
