<template>
  <div class="wrapper" v-if="loadingPage">
    <div class="header-nav">
      <i class="iconfont icon-jiantou-zuo" @click="back"></i>
      <p>填写订单</p>
    </div>
    <div class="content">
      <div
        class="address"
        @click="router.push('/address?type=order')"
        v-if="productInfo.type === 0"
      >
        <template v-if="isEmpty(address)">
          <div class="address-empty">
            <i class="iconfont icon-kong"></i>
            <p>选择地址</p>
          </div>
        </template>
        <template v-else>
          <div class="address-info">
            <p class="name">{{ address.name }}</p>
            <p class="phone">{{ address.mobile }}</p>
          </div>
          <p class="address-detail">{{ address.addressDetail }}</p>
        </template>
      </div>

      <div class="product-list">
        <div class="item">
          <div class="left">
            <img :src="productInfo.image" alt="" />
          </div>
          <div class="right">
            <p>{{ productInfo.title }}</p>
            <div class="info">
              <p class="price">¥{{ productInfo.price }}</p>
              <van-stepper v-model="productInfo.number" min="1" button-size="26" />
            </div>
          </div>
        </div>
      </div>

      <div class="other">
        <div class="notice">
          <p>备注：</p>
          <textarea v-model="productInfo.note" placeholder="下单备注" />
        </div>
      </div>
    </div>
    <div class="pay">
      <div>¥{{ allPrice }}</div>
      <div @click="pay">支付</div>
    </div>
  </div>
  <van-overlay :show="loading">
    <div class="loading-wrapper">
      <van-loading color="#5874d8" />
    </div>
  </van-overlay>
</template>

<script lang="ts">
import _, { isEmpty } from "lodash";
import http from "@/axios";
import { computed, reactive, ref, getCurrentInstance, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, Toast } from "vant";
import { siteData } from "@/store";
import { wxpay } from "@/wxconfig";
import { isWxClient } from "../../utils/utils";
export default {
  name: "createOrder",
  setup() {
    const { $notifyColor } = getCurrentInstance().proxy;
    const route = useRoute();
    const router = useRouter();
    const address = reactive({});
    const { id, orderId, num } = route.query;
    const store = siteData();
    const productInfo = reactive({
      uid: "",
      image: "",
      title: "",
      product_id: "",
      price: "",
      number: 1,
      address_id: "",
      note: "",
      type: 0,
    });
    const loading = ref(false);
    const addressInfo = localStorage.getItem("address");
    const loadingPage = ref(false);

    if (addressInfo) {
      const parseAddress = JSON.parse(addressInfo);
      const { id, addressDetail, name, mobile } = parseAddress;
      address.id = id;
      address.addressDetail = addressDetail;
      address.name = name;
      address.mobile = mobile;
    }

    const jsapiPay = async (orderId) => {
      const {
        data: {
          result: { timeStamp, nonceStr, package: packAge, signType, paySign },
        },
      } = await http("wxJsapiPay", { order_id: orderId, openid: store.openid });
      const { errMsg } = await wxpay({
        timeStamp,
        nonceStr,
        packAge,
        signType,
        paySign,
        micwebId: store.siteInfo.id,
      });
      switch (errMsg) {
        case "chooseWXPay:ok":
          Toast({
            message: "支付成功",
            duration: 1000,
          });
          _.delay(() => {
            router.back();
          }, 1000);
          break;
        default:
          Toast({
            message: "支付失败",
            duration: 1000,
          });
          _.delay(() => {
            location.replace(
              `${location.origin}${location.pathname}#/orderDetail?id=${orderId}`
            );
          }, 1000);
      }
    };

    http("getProduct", { id }).then((res) => {
      loadingPage.value = true;
      const { id, images, title, prolist, type } = res.data.result;
      productInfo.product_id = id;
      productInfo.title = title;
      productInfo.type = type;
      productInfo.image = _.size(images) > 0 ? images[0] : "";
      for (let i = 0; i < _.size(prolist); i++) {
        if (prolist[i].keyname === "price") {
          productInfo.price = prolist[i].val || 0;
        }
      }
      nextTick(() => {
        if (isWxClient() && window.location.href.indexOf("?#") !== -1 && orderId) {
          productInfo.number = Number(num);
          jsapiPay(orderId);
        }
      });
    });

    const pay = async () => {
      if (!isWxClient()) {
        Toast.fail({
          duration: 1000,
          message: "请在微信中打开该网站下单购买！",
        });
        return;
      }

      const { type } = productInfo;
      if (type === 0 && _.isEmpty(address)) {
        Notify({
          type: "warning",
          background: $notifyColor.warning,
          message: "请选择地址",
        });
        return;
      }
      const params = {
        uid: store.loginInfo.id,
        product_id: productInfo.product_id,
        title: productInfo.title,
        number: productInfo.number,
        price: Number(productInfo.price),
        note: productInfo.note,
      };

      if (type === 0) {
        params["address_id"] = address.id;
      }

      // 后台没配置支付
      if (!_.hasIn(store.siteInfo, "wxappid")) {
        Toast("支付失败，请联系管理员配置支付信息");
        return;
      }

      loading.value = true;
      const {
        data: {
          result: { order_id },
          code,
        },
      } = await http("addOrder", params);
      loading.value = false;

      if (code === 0) {
        if (window.location.href.indexOf("?#") === -1) {
          window.location.replace(
            `${window.location.href.replace("#", "?#")}&orderId=${order_id}&num=${
              productInfo.number
            }`
          );
          return;
        }
      }
    };

    const allPrice = computed(() => {
      return Number(productInfo.price) * Number(productInfo.number);
    });

    const back = () => {
      router.go(-1);
    };

    return {
      allPrice,
      productInfo,
      pay,
      isEmpty,
      address,
      back,
      router,
      loading,
      loadingPage,
    };
  },
};
</script>

<style lang="less" scoped>
.header-nav {
  position: relative;
  display: flex;
  padding: 0 15px;
  line-height: 50px;
  border-bottom: 1px solid rgb(234, 234, 234);
  box-sizing: border-box;
  p {
    width: 100%;
    font-size: 18px;
    text-align: center;
  }
  i {
    position: absolute;
    left: 15px;
    top: 50%;
    font-size: 18px;
    transform: translateY(-50%);
  }
}
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    background-color: rgb(248, 248, 248);
    overflow: auto;
    padding: 0 15px;
    .address {
      padding: 20px 15px;
      background-color: #fff;
      margin: 10px 0;
      border-radius: 10px;
      .address-info {
        display: flex;
        align-items: flex-end;
        .name {
          margin-right: 10px;
        }
        .phone {
          font-size: 14px;
        }
      }
      .address-detail {
        font-size: 16px;
        margin-top: 6px;
      }
    }
  }
}
.product-list {
  background-color: #fff;
  padding: 15px 15px;
  border-radius: 10px;
  .item {
    display: flex;
    .left {
      width: 80px;
      margin-right: 15px;
      img {
        width: 100%;
      }
    }
    .right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;
      .info {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .price {
          font-size: 16px;
        }
      }
    }
  }
}
.notice {
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
  p {
    font-size: 13px;
    line-height: 30px;
  }
  textarea {
    flex: 1;
    outline: none;
    border: none;
    font-size: 13px;
    min-height: 60px;
    padding: 10px;
    box-sizing: border-box;
    background-color: rgb(247, 247, 247);
  }
}
.address-empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: rgb(123, 123, 123);
  i {
    font-size: 30px;
    margin-bottom: 5px;
  }
}
.pay {
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:first-of-type {
    font-size: 22px;
    font-weight: bold;
    color: rgb(88, 116, 216);
  }

  > div:last-of-type {
    color: #fff;
    line-height: 40px;
    padding: 0 38px;
    border-radius: 30px;
    background-color: rgb(88, 116, 216);
    font-size: 15px;
  }
}
.other {
  margin-top: 10px;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
}
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
