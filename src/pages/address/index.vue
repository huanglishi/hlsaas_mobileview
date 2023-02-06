<template>
  <div class="wrapper">
    <div class="header-nav">
      <i class="iconfont icon-jiantou-zuo" @click="back"></i>
      <p>地址管理</p>
    </div>
    <div class="address-wrapper">
      <div class="content">
        <template v-if="addressList.value.length > 0">
          <div
            class="item"
            v-for="(item, index) in addressList.value"
            :key="item.id"
          >
            <div class="left" @click="selectAddress(item)">
              <div>
                <p class="name">{{ item.name }}</p>
                <p class="phone">{{ item.mobile }}</p>
                <span class="tag" v-if="item.is_default === 1">默认</span>
              </div>
              <p class="detail">{{ item.addressDetail }}</p>
            </div>
            <div class="right">
              <i
                class="iconfont icon-bianji"
                @click="router.push(`/addressEdit?id=${item.id}`)"
              ></i>
              <i
                class="iconfont icon-shanchu"
                @click="deleteAddress(item, index)"
              ></i>
            </div>
          </div>
        </template>

        <div class="empty-data" v-else>
          <i class="iconfont icon-kong"></i>
          <p>暂无地址数据</p>
        </div>
      </div>
    </div>
    <div class="add-address">
      <div @click="controllAddress('add')">添加收货地址</div>
    </div>
  </div>
</template>

<script>
import http from "@/axios";
import { reactive } from "vue";
import { Dialog } from "vant";
import { siteData } from "@/store";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "address",
  setup(props) {
    const store = siteData();
    const addressList = reactive({ value: [] });
    const router = useRouter();
    const route = useRoute();

    const formatData = (list) => {
      list.forEach((item) => {
        item.addressDetail = `${item.province_name} ${item.city_name} ${item.area_name}`;
      });
      return list;
    };

    const getData = async () => {
      const res = await http("getAddressList", { uid: store.loginInfo.id });
      addressList.value = formatData(res.data.result);
    };
    getData();

    const deleteAddress = (item, index) => {
      Dialog.confirm({
        message: "是否确认删除该地址？",
      }).then(async () => {
        const res = await http("delAddress", { id: item.id });
        if (res.data.code == 0) {
          addressList.value.splice(index, 1);
        }
      });
    };

    const controllAddress = (type, id) => {
      switch (type) {
        case "add":
          router.push(`/addressEdit`);
          break;
      }
    };

    const back = () => {
      router.back();
    };

    const selectAddress = (item) => {
      const { type } = route.query;
      if (type === "order") {
        localStorage.setItem("address", JSON.stringify(item));
        router.back();
      }
    };

    return {
      deleteAddress,
      addressList,
      controllAddress,
      router,
      back,
      selectAddress,
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
  .address-wrapper {
    flex: 1;
    overflow: auto;
    background-color: rgb(248, 248, 248);
  }
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin: 10px 10px;
  border-radius: 10px;
  padding: 18px 15px;
  .left {
    flex: 1;
    > div {
      display: flex;
      align-items: flex-end;
      margin-bottom: 6px;
      .name {
        font-size: 15px;
        margin-right: 5px;
      }
      .phone {
        font-size: 13px;
        color: #666;
      }
      .tag {
        border: 1px solid rgb(88, 116, 216);
        border-radius: 4px;
        font-size: 10px;
        color: rgb(88, 116, 216);
        padding: 2px 3px;
        margin-left: 5px;
      }
    }
    .detail {
      font-size: 14px;
      color: #666;
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    > i {
      font-size: 20px;
      &:first-of-type {
        margin-right: 10px;
      }
    }
  }
}
.add-address {
  background-color: #fff;
  padding: 15px 0;
  > div {
    line-height: 40px;
    color: #fff;
    text-align: center;
    border-radius: 40px;
    width: 80%;
    margin: 0 auto;
    background-color: rgb(88, 116, 216);
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
