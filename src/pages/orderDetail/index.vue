<template>
  <div class="wrapper">
    <div class="header-nav">
      <i class="iconfont icon-jiantou-zuo" @click="back"></i>
      <p>订单详情</p>
    </div>

    <div class="content">
      <div class="order-status">
        <div class="status">
          <i :class="['iconfont', `icon-${matchIcon()}`]"></i>
          <p>{{ $orderStatus[ordeData.value.status] }}</p>
        </div>
        <div
          class="logistics-no"
          v-if="ordeData.value.status == 2 && ordeData.value.type === 0"
        >
          <p>物流单号：</p>
          <p>{{ ordeData.value.LogisticCode }}</p>
          <span @click="copyLogisticsNo">复制</span>
        </div>
      </div>

      <div class="address" v-if="ordeData.value.type === 0">
        <div>
          <p class="name">{{ ordeData.value?.address?.name || "" }}</p>
          <p class="phone">{{ ordeData.value?.address?.mobile || "" }}</p>
        </div>
        <p class="address-detail">
          {{ ordeData.value?.address?.province_name }}
          {{ ordeData.value?.address?.city_name }}
          {{ ordeData.value?.address?.area_name }}
          {{ ordeData.value?.address?.address }}
        </p>
      </div>

      <div class="item">
        <div class="left">
          <img :src="ordeData.value.images ? ordeData.value.images[0] : ''" alt="" />
        </div>
        <div class="right">
          <p>{{ ordeData.value.title }}</p>
          <div class="info">
            <p class="price">¥{{ ordeData.value.price }}</p>
            <p class="number">x{{ ordeData.value.number }}</p>
          </div>
        </div>
      </div>
      <div class="total-amount">
        <p>
          共计：<i>¥{{ ordeData.value.price * ordeData.value.number }}</i>
        </p>
      </div>
      <div
        class="open-code"
        v-if="[1, 2].includes(ordeData.value.type) && ordeData.value.status !== 9"
        @click="showCode = true"
      >
        <p>核销码</p>
        <i class="iconfont icon-erweima"></i>
      </div>

      <ul class="order-info">
        <li>
          <p>订单编号</p>
          <p>{{ ordeData.value.out_trade_no }}</p>
        </li>
        <li>
          <p>下单时间</p>
          <p>{{ ordeData.value.createtime }}</p>
        </li>
        <li v-if="ordeData.value.paytime">
          <p>支付时间</p>
          <p>{{ ordeData.value.paytime }}</p>
        </li>
        <li v-if="ordeData.value.note">
          <p>备注信息</p>
          <p class="notice">{{ ordeData.value.note }}</p>
        </li>
      </ul>
    </div>

    <div class="btns">
      <!-- <span class="cancel">取消订单</span> -->
      <span class="pay" v-if="ordeData.value.status == 0" @click="jsapiPay">支付</span>
    </div>
  </div>

  <div class="qrcode-mask" v-if="showCode">
    <div class="qrcode">
      <div class="close">
        <i class="iconfont icon-guanbi" @click="showCode = false"></i>
      </div>
      <p class="title">核销码</p>
      <div class="code" ref="code">
        <span v-if="timerout">
          <i class="iconfont icon-shuaxin" @click="resetCode"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify, Toast } from "vant";
import dayjs from "dayjs";
import http from "@/axios";
import { reactive, ref, nextTick, watch, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import QRCode from "qrcode";
import _ from "lodash";
import { wxpay } from "@/wxconfig";
import { siteData } from "@/store";
export default {
  name: "orderDetail",
  setup() {
    const { $orderStatus } = getCurrentInstance().proxy;
    const route = useRoute();
    const router = useRouter();
    const { id, origin } = route.query;
    const ordeData = reactive({ value: {} });
    const store = siteData();
    const code = ref("");
    const showCode = ref(false);
    const timerout = ref(false);
    let cancelNo = "";

    const createCode = async () => {
      timerout.value = false;
      let canvas = document.getElementsByTagName("canvas")[0];
      if (canvas) {
        canvas.remove();
      }
      const res = await http("getCancelNo", {
        order_id: id,
      });
      let { cancel_no } = res.data.result;
      cancelNo = cancel_no;
      nextTick(() => {
        QRCode.toCanvas(
          `${cancel_no}`,
          {
            margin: 0,
            scale: 20,
            version: 3,
          },
          function (err, canvasDom) {
            canvasDom.style.width = `100%`;
            canvasDom.style.height = `100%`;
            code.value.appendChild(canvasDom);
            queryVerificationStatus(id, cancel_no);
          }
        );
      });
    };

    const resetCode = () => {
      createCode();
    };

    const queryVerificationStatus = async () => {
      const {
        data: { result },
      } = await http("getIsCancel", { order_id: id, cancel_no: cancelNo });
      if (!showCode.value) return;
      switch (result) {
        case "codeInvalid":
          // 过期
          timerout.value = true;
          break;
        case "codeValid":
          // 没过期
          _.delay(queryVerificationStatus, 1500);
          break;
        case "cancel":
          showCode.value = false;
          // 成功
          Notify({
            message: "核销成功",
            type: "success",
            duration: 1000,
            onClose() {
              fetchOrderDetail();
            },
          });
          break;
      }
    };

    const matchIcon = () => {
      switch (ordeData.value.status) {
        case 12:
          return "guoqi";
        default:
          return "shengouchenggong";
      }
    };

    watch(
      () => showCode.value,
      (val) => {
        if (!val) return;
        createCode();
      }
    );

    const fetchOrderDetail = () => {
      http("getOrderDetail", { id }).then((res) => {
        const data = res.data.result;
        data["statusText"] = $orderStatus[data.status];
        ["createtime", "paytime"].forEach(
          (key) =>
            (data[key] = Boolean(data[key])
              ? dayjs.unix(data[key]).format("YYYY-MM-DD HH:mm:ss")
              : "")
        );
        ordeData.value = data;
        nextTick(() => {
          if (location.href.indexOf("?#") !== -1) {
            jsapiPay();
          }
        });
      });
    };

    fetchOrderDetail();

    const copyLogisticsNo = () => {
      if (!_.isEmpty(navigator.clipboard)) {
        navigator.clipboard.writeText(ordeData.value.LogisticCode);
      } else {
        Toast("复制失败");
      }
    };

    const back = () => {
      router.go(origin ? -2 : -1);
    };

    const jsapiPay = async () => {
      if (location.href.indexOf("?#") === -1) {
        window.location.replace(window.location.href.replace("#", "?#"));
        return;
      }
      const {
        data: {
          result: { timeStamp, nonceStr, package: packAge, signType, paySign },
        },
      } = await http("wxJsapiPay", { order_id: ordeData.value.id, openid: store.openid });
      await wxpay({
        timeStamp,
        nonceStr,
        packAge,
        signType,
        paySign,
        micwebId: store.siteInfo.id,
      });
      window.location.replace(window.location.href.replace("?#", "#"));
      fetchOrderDetail();
    };

    return {
      router,
      ordeData,
      $orderStatus,
      showCode,
      code,
      createCode,
      timerout,
      resetCode,
      copyLogisticsNo,
      back,
      jsapiPay,
      matchIcon,
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
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
.content {
  flex: 1;
  overflow: auto;
  background-color: rgb(247, 247, 247);
  .address {
    padding: 20px 15px;
    background-color: #fff;
    margin-bottom: 10px;
    > div {
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
.item {
  display: flex;
  background-color: #fff;
  padding: 15px 15px;
  .left {
    width: 50px;
    height: 50px;
    overflow: hidden;
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
      .number {
        font-size: 16px;
      }
    }
  }
}
.total-amount {
  text-align: right;
  background-color: #fff;
  line-height: 40px;
  padding: 0 20px;
  font-size: 15px;
  border-top: 1px solid rgb(237, 237, 237);
  i {
    font-weight: bold;
    color: #5874d8;
  }
}
.order-status {
  padding: 25px 15px;
  background-color: #5874d8;
  .status {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 20px;
    i {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .logistics-no {
    display: flex;
    color: #fff;
    font-size: 14px;
    margin-top: 15px;
    span {
      margin-left: 10px;
    }
  }
}
.order-info {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
  li {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    .notice {
      flex: 0.5;
      text-align: right;
    }
  }
}
.qrcode-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  .qrcode {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    padding: 10px 0;
    border-radius: 10px;
    background-color: #fff;
    .close {
      display: flex;
      justify-content: flex-end;
      margin: 8px 0;
      padding-right: 15px;
      i {
        font-size: 18px;
      }
    }
    .title {
      text-align: center;
      color: #5874d8;
      font-size: 18px;
    }
    .code {
      position: relative;
      margin: 20px auto;
      width: 160px;
      height: 160px;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        line-height: 160px;
        background-color: rgba(0, 0, 0, 0.5);
        i {
          text-align: center;
          color: #fff;
          font-size: 32px;
        }
      }
    }
  }
}
.open-code {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  line-height: 40px;
  background-color: #fff;
  border-top: 1px solid rgb(237, 237, 237);
}
.btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  background: #fff;
  span {
    display: inline-block;
    color: #fff;
    text-align: center;
    height: 30px;
    width: 80px;
    line-height: 30px;
    border-radius: 30px;
    margin-right: 20px;
    font-size: 14px;
    &.cancel {
      background: rgb(205, 205, 205);
    }
    &.pay {
      background-color: #5874d8;
    }
  }
}
</style>
