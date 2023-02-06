<template>
  <div
    class="back-top"
    @click="backTop"
    :style="{
      right: `${showBackTopBtn ? 30 : -50}px`,
    }"
  >
    <i class="iconfont icon-fanhuidingbu"></i>
  </div>
</template>

<script>
import { ref, nextTick } from "vue";
export default {
  name: "backTop",
  props: {
    scrollDom: Object,
  },
  setup(props) {
    const showBackTopBtn = ref(false);

    nextTick(() => {
      props.scrollDom.addEventListener("scroll", (e) => {
        showBackTopBtn.value = e.target.scrollTop >= 300;
      });
    });

    const backTop = () => {
      props.scrollDom.scrollTop = 0;
    };

    return {
      showBackTopBtn,
      backTop,
    };
  },
};
</script>

<style lang="less" scoped>
.back-top {
  position: absolute;
  bottom: 80px;
  right: -100px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  z-index: 999;
  text-align: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.15);
  transition: right ease 0.3s;
  i {
    font-size: 30px;
    line-height: 40px;
    color: #a1caf1;
  }
}
</style>
