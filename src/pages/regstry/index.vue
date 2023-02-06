<template>
  <div class="header-nav">
    <i class="iconfont icon-jiantou-zuo" @click="back"></i>
    <p>会员注册</p>
  </div>
  <div class="img">
    <div class="icon"></div>
  </div>
  <div class="input">
    <p>账号</p>
    <input placeholder="请输入账号" type="text" v-model="username" />
  </div>
  <div class="input">
    <p>密码</p>
    <input placeholder="请输入密码" type="password" v-model="password" />
  </div>
  <div class="login-btn" @click="regstry">注册</div>
</template>

<script lang="ts">
import { Notify } from "vant";
import http from "@/axios/index";
import _ from "lodash";
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { siteData } from "@/store";
export default {
  name: "regstry",
  setup() {
    const {
      proxy: { $notifyColor },
    } = getCurrentInstance();
    const store = siteData();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const {
      siteInfo: { id },
    } = store;

    const regstry = async () => {
      if (username.value == "" || password.value == "") {
        Notify({
          type: "warning",
          background: $notifyColor.warning,
          message: "请填写账号密码！",
        });
        return;
      }

      const res = await http("register", {
        micweb_id: id,
        username: username.value,
        password: password.value,
      });
      const { code, message } = res.data;
      Notify({
        type: code === 1 ? "danger" : "success",
        message,
        background: code === 1 ? $notifyColor.danger : $notifyColor.success,
        duration: 1500,
        onClose() {
          if (code === 0) {
            router.replace({ path: "/login" });
          }
        },
      });
    };

    const back = () => {
      router.back();
    };

    return {
      regstry,
      username,
      password,
      back,
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

.input {
  display: flex;
  align-items: center;
  padding: 15px 0;
  margin: 0 40px;
  border-bottom: 1px solid rgb(234, 234, 234);
  > p {
    font-size: 14px;
    margin-right: 15px;
  }
  input {
    outline: none;
    border: none;
    &:focus {
      outline: none;
    }
  }
}
.login-btn {
  padding: 15px;
  text-align: center;
  color: #fff;
  margin: 20px 40px;
  background-color: #ff7214;
  border-radius: 4px;
}
</style>
