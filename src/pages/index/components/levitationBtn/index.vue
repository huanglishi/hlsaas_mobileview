<template>
  <div
    class="levitation-btn"
    ref="levitationBtn"
    :style="{
      top: `${data.top}px`,
      left: `${data.left}px`,
      ...style(),
    }"
    @click="matchjumpUrl(data, router.push)"
  ></div>
</template>

<script>
import { pxToVw, matchjumpUrl } from "@utils/utils";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "levitationBtn",
  props: {
    moveDom: Object,
    data: Object,
  },
  setup(props) {
    const router = useRouter();
    const levitationBtn = ref();
    let clientWidth = 0;
    let clientHeight = 0;
    nextTick(() => {
      clientWidth = window.innerWidth;
      clientHeight = window.innerHeight;
      document
        .getElementsByClassName("levitation-btn")[0]
        .addEventListener("touchmove", (e) => {
          const { pageX, pageY } = e.touches[0];
          if (pageX - 20 >= 0 && pageX + 20 <= clientWidth) {
            props.data.left = pageX - 20;
          }
          if (pageY - 20 >= 0 && pageY + 20 <= clientHeight) {
            props.data.top = pageY - 20;
          }
        });
    });

    const style = () => {
      const { bg, bgcolor, bgImg } = props.data;
      if (bg === "default") return {};
      return {
        "background-color": bgcolor,
        "background-image": `url(${bgImg})`,
        "background-repece": "no-repeat",
        "background-position": "center",
        "background-size": "100% 100%",
      };
    };

    return {
      levitationBtn,
      pxToVw,
      style,
      router,
      matchjumpUrl,
    };
  },
};
</script>

<style lang="less" scoped>
.levitation-btn {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.15);
}
</style>
