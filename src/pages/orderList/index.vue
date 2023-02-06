<template>
  <div class="wrapper">
    <div class="header-nav">
      <i class="iconfont icon-jiantou-zuo" @click="router.back()"></i>
      <p>订单列表</p>
    </div>
    <div class="content">
      <div class="order-list" v-if="orderList.length > 0">
        <div
          class="order"
          v-for="item in orderList"
          :key="item.id"
          @click="router.push(`/orderDetail?id=${item.id}`)"
        >
          <p>{{ $orderStatus[item.status] }}</p>
          <div class="product">
            <div class="main-img">
              <img :src="item.images[0]" alt="" />
            </div>
            <div class="text-info">
              <p class="name">{{ item.title }}</p>
              <div>
                <p class="price">￥{{ item.price }}</p>
                <p class="number">x{{ item.number }}</p>
              </div>
            </div>
          </div>
          <p class="all-price">总价：￥{{ item.price * item.number }}</p>
        </div>
      </div>

      <div class="empty-data" v-else>
        <i class="iconfont icon-kong"></i>
        <p>暂无订单数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { siteData } from "@/store";
import http from "@/axios";
import { reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "orderList",
  setup() {
    const { $orderStatus } = getCurrentInstance().proxy;
    const store = siteData();
    const orderList = reactive([]);
    const router = useRouter();
    http("getOrderList", { uid: store.loginInfo.id }).then((res) => {
      res.data.result.forEach((item) => {
        orderList.push({
          ...item,
          price: Number(item.price),
        });
      });
    });

    return {
      orderList,
      router,
      $orderStatus,
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
    overflow: auto;
    background-color: #f4f4f4;
  }
}
.order {
  padding: 15px;
  margin: 10px 20px;
  border-radius: 15px;
  background-color: #fff;
  > p {
    font-size: 14px;
    margin-bottom: 5px;
    text-align: right;
  }
  .product {
    display: flex;
    justify-content: space-between;
    .main-img {
      width: 60px;
      height: 60px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      margin-left: 15px;
      .name {
        font-size: 15px;
        line-height: 19px;
      }
      > div {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .all-price {
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
  }
}
.empty-data {
  color: #a5a5a5;
  text-align: center;
  padding-top: 100px;
  i {
    display: inline-block;
    font-size: 60px;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
  }
}
</style>
