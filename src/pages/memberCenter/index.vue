<template>
  <div class="wrapper">
    <div class="header-nav">
      <i class="iconfont icon-jiantou-zuo" @click="router.back()"></i>
      <p>会员中心</p>
    </div>

    <div class="img">
      <div class="icon">
        <img v-if="store.loginInfo.avatar !== ''" :src="store.loginInfo.avatar" alt="" />
        <i v-else class="iconfont icon-yonghu"></i>
      </div>
      <p>{{ store.loginInfo.name || "-" }}</p>
    </div>

    <div class="controll">
      <div class="item" @click="router.push('/orderList')">
        <div>
          <i class="iconfont icon-dingdan"></i>
          <p>订单列表</p>
        </div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>

      <div class="item" @click="router.push('/address')">
        <div>
          <i class="iconfont icon-dizhi"></i>
          <p>地址管理</p>
        </div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>

      <div class="item" @click="router.push('/information')">
        <div>
          <i class="iconfont icon-gerenziliao"></i>
          <p>个人资料</p>
        </div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>

      <!-- <div class="item" @click="router.push('/changePassword')">
        <div>
          <i class="iconfont icon-form"></i>
          <p>表单填写记录</p>
        </div>
        <i class="iconfont icon-jiantou-you"></i>
      </div> -->

      <div class="item" @click="router.push('/changePassword')">
        <div>
          <i class="iconfont icon-mima"></i>
          <p>修改密码</p>
        </div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>
    </div>

    <div class="out-btn" @click="out">退出当前登录</div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { siteData } from "@/store";
import _ from "lodash";
import { useRouter } from "vue-router";
export default {
  name: "memberCenter",
  setup() {
    const store = siteData();
    const router = useRouter();

    const out = () => {
      Dialog.confirm({
        message: "确认退出登录？",
      }).then(() => {
        store.loginInfo = {};
        localStorage.removeItem("address");
        router.replace(`/?id=${store.siteInfo.id}`);
      });
    };

    return {
      out,
      store,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  background-color: rgb(247, 247, 247);
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
.tips {
  text-align: center;
  line-height: 30px;
  color: #eb6a40;
  background-color: #fef5d8;
  margin: 20px;
}
.img {
  padding: 40px 0;
  background-color: #ff7214;
  .icon {
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 0 auto;
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    background-size: 100% 100%;
    background-color: #dfe0e2;
    overflow: hidden;
    i {
      position: absolute;
      bottom: -10px;
      font-size: 70px;
      color: #fff;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    width: 100%;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 700;
  }
}
.controll {
  padding: 0 15px;
  background-color: #fff;
  margin: 10px 0;
  .item {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    &:not(:first-of-type) {
      border-top: 1px solid rgb(234, 234, 234);
    }
    > div {
      display: flex;
      i {
        font-size: 20px;
        margin-right: 15px;
      }
    }
  }
}
.out-btn {
  padding: 15px;
  text-align: center;
  margin: 20px 0;
  font-size: 15px;
  color: #666;
  background-color: #fff;
  border-radius: 4px;
  border-bottom: 1px solid rgb(234, 234, 234);
  border-top: 1px solid rgb(234, 234, 234);
}
</style>
