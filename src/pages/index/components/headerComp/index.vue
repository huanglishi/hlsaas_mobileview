<template>
  <div @click.stop="edit">
    <component
      :is="`flex${datas.flex}`"
      :headerConfig="datas"
      :showSideMenu="showSideMenu"
      :showBanner="showBanner"
    />
  </div>
</template>

<script>
import flex1 from "./flex1.vue";
import flex2 from "./flex2.vue";
import flex3 from "./flex3.vue";
import _ from "lodash-es";
export default {
  name: "headerComp",
  components: {
    flex1,
    flex2,
    flex3,
  },
  props: {
    datas: Object,
    showSideMenu: Boolean,
    showBanner: Boolean,
  },
};
</script>
