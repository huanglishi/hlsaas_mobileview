<template>
  <div class="swiper">
    <div
      class="banner-empty"
      v-if="!isEmpty(bannerConfig) && bannerConfig.data.length === 0"
    ></div>

    <template v-else>
      <div class="swiper-wrapper">
        <div v-for="item in bannerConfig.data" :key="item.id" class="swiper-slide" @click="matchjumpUrl(item)">
          <div
            class="img"
            :style="{
              'background-image': `url(${item.image})`,
            }"
          ></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { nextTick, watch } from "vue";
import "@/assets/swiper/swiper-bundle.js";
import "@/assets/swiper/swiper-bundle.min.css";
import _, { isEmpty } from "lodash";
import { matchjumpUrl } from "@utils/utils";
export default {
  name: "banner",
  props: {
    bannerConfig: Object,
  },
  setup(props) {
    let swiper = {};
    const animations = {
      // 横向切换
      ani1: {
        effect: "slide",
        direction: "horizontal",
      },
      // 竖向切换
      ani2: {
        effect: "slide",
        direction: "vertical",
      },
      // 水平3d
      ani3: {
        effect: "cube",
        direction: "horizontal",
        cubeEffect: {
          slideShadows: false,
          shadow: false,
        },
      },
      // 垂直3d
      ani4: {
        effect: "cube",
        direction: "vertical",
        cubeEffect: {
          slideShadows: false,
          shadow: false,
        },
      },
      // 水平翻转
      ani5: {
        effect: "flip",
        direction: "horizontal",
        flipEffect: {
          slideShadows: false,
          limitRotation: false,
        },
      },
      // 垂直翻转
      ani6: {
        effect: "flip",
        direction: "vertical",
        flipEffect: {
          slideShadows: false,
          limitRotation: false,
        },
      },
      // 淡入
      ani7: {
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
      },
      // 淡入放大
      ani8: {
        effect: "creative",
        creativeEffect: {
          prev: {
            scale: 1.3,
            opacity: 0,
          },
          next: {
            scale: 1.3,
            opacity: 0,
          },
          perspective: true,
        },
      },
    };
    watch(
      () => props.bannerConfig,
      (val) => {
        if (val.data.length === 0) return;
        let params = {
          speed: 500,
          autoplay: true,
          loop: true,
          ...animations[`ani${val.animation}`],
        };
        if (swiper.destroy) {
          swiper.destroy(true);
        }
        nextTick(() => {
          swiper = new Swiper(".swiper", params);
        });
      },
      {
        immediate: true,
      }
    );
    return {
      isEmpty,
      matchjumpUrl
    };
  },
};
</script>

<style lang="less" scoped>
.swiper {
  position: relative;
  width: 375px;
  height: 180px;
  overflow: hidden;
  &:hover {
    .edit-banner-btns {
      display: block;
    }
  }
  .edit-banner-btns {
    display: none;
    position: absolute;
    top: 50%;
    right: 20px;
    z-index: 2;
    background-color: #fff;
    border-radius: 10px;
    .edit {
      padding: 10px 15px;
      color: #666;
      user-select: none;
      cursor: pointer;
      font-size: 15px;
    }
  }
}
.swiper-wrapper {
  .swiper-slide {
    .img {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
}
.banner-empty {
  width: 375px;
  height: 100%;
  background-image: url(../../assets/images/banner-empty.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
