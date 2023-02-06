<template>
  <div class="wrapper">
    <div class="header-nav" @click="back">
      <i class="iconfont icon-jiantou-zuo"></i>
    </div>

    <div class="content">
      <div class="img-list">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="item in imgs" :key="item">
            <div
              class="img-item"
              :style="{
                'background-image': `url(${item})`,
              }"
            ></div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="prices">
          <p class="price" v-if="priceObj.price">¥{{ priceObj.price }}</p>
          <p class="mprice" v-if="priceObj.mprice">¥{{ priceObj.mprice }}</p>
        </div>
        <p class="title">{{ detail.value.title }}</p>
      </div>

      <div class="product-detail">
        <div class="product-tab">
          <div
            class="tab-item"
            :class="{ active: type === 'detail' }"
            @click="() => (type = 'detail')"
          >
            产品详情
          </div>
          <div
            class="tab-item"
            :class="{ active: type === 'params' }"
            @click="() => (type = 'params')"
          >
            产品参数
          </div>
        </div>

        <div class="detail" v-show="type === 'detail'" v-html="content"></div>
        <ul class="params" v-show="type === 'params'">
          <li v-for="item in prolist" :key="item.id">
            <div class="key">{{ item.name }}</div>
            <div class="value">{{ item.val }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <div class="icon">
        <i class="iconfont icon-home" @click="goHome(router.replace)"></i>
        首页
      </div>
      <div class="icon" @click="() => (servicePopup = true)">
        <i class="iconfont icon-kefu"></i>
        客服
      </div>
      <div class="consultation" @click="createOrder">立即购买</div>
    </div>
  </div>

  <van-popup v-model:show="servicePopup" position="bottom">
    <ul class="service-list">
      <li v-for="item in detail.value.service" :key="item.id" @click="consultation(item)">
        <img :src="matchIcon(item)" alt="" />
        <div>
          <template v-if="item.type === 'mobile'">
            <p class="name">{{ item.label }}</p>
            <p class="code">{{ item.value }}</p>
          </template>
          <template v-else>
            <p style="text-align: center">点击咨询</p>
          </template>
        </div>
        <i class="iconfont icon-jiantou-you"></i>
      </li>
    </ul>
    <div class="cancel-btn" @click="() => (servicePopup = false)">取消</div>
  </van-popup>

  <van-popup v-model:show="showCode.open">
    <div class="wechat-code">
      <img :src="showCode.code" alt="" />
    </div>
  </van-popup>
</template>

<script lang="ts">
import _ from "lodash";
import { computed, reactive, ref } from "vue";
import http from "@/axios";
import { useRoute, useRouter } from "vue-router";
import { goHome } from "@/utils/utils";
import { siteData } from "@/store";
import { Notify } from "vant";
export default {
  name: "productDetail",
  setup(props) {
    const detail = reactive({ value: {} });
    const route = useRoute();
    const router = useRouter();
    const { id } = route.query;
    const type = ref("detail");
    const store = siteData();
    const servicePopup = ref(false);
    const showCode = reactive({
      open: false,
      code: "",
    });
    const prolist = reactive([]);

    http("getProduct", { id }).then((res) => {
      const { result } = res.data;
      detail.value = result;
      prolist.push(..._.filter(result.prolist, (item) => item.val !== ""));
    });

    const imgs = computed(() => detail.value.images);

    const content = computed(() =>
      detail.value.content
        ? detail.value.content.replace("<img ", '<img style="width:100%"')
        : ""
    );

    const priceObj = computed(() => {
      const obj = {};
      const price = _.find(detail.value.prolist, ["keyname", "price"]);
      const mprice = _.find(detail.value.prolist, ["keyname", "mprice"]);
      if (price) {
        obj["price"] = price.val;
      }
      if (mprice) {
        obj["mprice"] = mprice.val;
      }
      return obj;
    });

    const back = () => {
      router.back();
    };

    const matchIcon = (item) => {
      const { type, image } = item;
      switch (type) {
        case "wx":
          if (image === "") {
            return new URL("../../assets/images/wechat.png", import.meta.url).href;
          }
          return image;
        case "mobile":
          if (image === "") {
            return new URL("../../assets/images/phone.png", import.meta.url).href;
          }
          return image;
      }
    };

    const consultation = (data) => {
      const { type, value } = data;
      if (type === "mobile") {
        location.href = `tel:${value}`;
        return;
      }
      showCode.open = true;
      showCode.code = data.value;
    };

    const createOrder = () => {
      if (_.isEmpty(store.loginInfo)) {
        Notify({
          type: "warning",
          background: "#ff976a",
          message: "请先登录",
          duration: 1000,
          onClose() {
            router.push("/login");
          },
        });
        return;
      }
      router.push({
        name:'createOrder',
        query:{
          id
        }
      })
      // const { origin, pathname } = location;
      // location.href = `${origin}${pathname}?#/createOrder?id=${id}`;
    };

    return {
      imgs,
      content,
      type,
      detail,
      priceObj,
      goHome,
      back,
      store,
      servicePopup,
      matchIcon,
      consultation,
      showCode,
      createOrder,
      router,
      prolist,
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  .header-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 20px;
    width: 30px;
    height: 30px;
    z-index: 999;
    font-size: 20px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }

  .content {
    flex: 1;
    overflow: auto;
    background-color: #f5f5f5;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .img-list {
    .img-item {
      width: 100%;
      height: 375px;
      background-size: cover;
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
  }
  .product-info {
    padding: 10px;
    background: #fff;
    .prices {
      display: flex;
      align-items: flex-end;
      margin-bottom: 10px;
      .price {
        font-size: 19px;
        font-weight: 700;
        color: #ff7214;
        margin-right: 10px;
      }
      .mprice {
        font-size: 13px;
        color: #666;
        text-decoration: line-through;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .product-detail {
    background-color: #fff;
    padding-bottom: 15px;
    margin-top: 15px;
    .product-tab {
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #f3f3f3;
      margin-bottom: 10px;
      .tab-item {
        padding: 10px 5px;
        font-size: 13px;
        color: #666;
        &.active {
          color: #ff7214;
          border-bottom: 2px solid #ff7214;
        }
      }
    }
  }
  .params {
    li {
      display: flex;
      padding: 10px 50px;
      border-bottom: 1px solid #f3f3f3;
      font-size: 13px;
      color: #666;
      .key {
        width: 50%;
      }
    }
  }
  .footer {
    display: flex;
    .icon {
      height: 50px;
      width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      border-top: 1px solid #f3f3f3;
      color: #333;
      i {
        margin-bottom: 5px;
      }
    }
    .consultation {
      flex: 1;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: #ff7214;
    }
  }
}
.service-list {
  > li {
    display: flex;
    align-items: center;
    padding: 10px 25px;
    img {
      width: 25px;
      height: 25px;
      margin-right: 20px;
    }
    > div {
      flex: 1;
      display: flex;
      align-items: center;
      p {
        flex: 1;
      }
      .name {
        margin-right: 15px;
      }
      i {
        margin-left: 20px;
      }
    }
  }
}
.wechat-code {
  width: 300px;
  height: 300px;
  border: 1px solid rgb(169, 169, 169);
  img {
    width: 100%;
  }
}
.cancel-btn {
  text-align: center;
  line-height: 40px;
  color: #666;
  font-size: 15px;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
</style>
