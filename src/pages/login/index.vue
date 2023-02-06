<template>
  <div class="header-nav">
    <i class="iconfont icon-jiantou-zuo" @click="back"></i>
    <p>会员登录</p>
  </div>

  <div class="img">
    <div class="icon">
      <i class="iconfont icon-yonghu"></i>
    </div>
  </div>
  <div class="input">
    <p>账号</p>
    <input placeholder="请输入账号" type="text" v-model="username" />
  </div>
  <div class="input">
    <p>密码</p>
    <input placeholder="请输入密码" type="password" v-model="password" />
  </div>
  <div class="login-btn" @click="login">登录</div>
  <p class="regstry-btn" @click="regstry">免费注册</p>
</template>

<script lang="ts">
import { Notify } from "vant";
import http from "@/axios";
import { ref, getCurrentInstance } from "vue";
import { siteData } from "@/store/index";
import _ from "lodash";
import { useRouter, useRoute } from "vue-router";
import { isWxClient, parseWxCode } from "@utils/utils";
export default {
  name: "login",
  setup() {
    const {
      proxy: { $notifyColor },
    } = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = siteData();
    const loading = ref(false);
    const username = ref("");
    const password = ref("");
    const { redirect } = route.query;

    const regstry = async () => {
      router.push("/regstry");
    };

    const back = () => {
      router.back();
    };

    /**
     * 授权code
     * 回调到登录
     */

    const login = async () => {
      if (username.value === "" || password.value == "") {
        Notify({
          type: "danger",
          background: $notifyColor.danger,
          message: "账号密码不能为空！",
        });
        return;
      }
      if (loading.value) return;
      loading.value = true;
      let res = await http("login", {
        username: username.value,
        password: password.value,
      });
      loading.value = false;
      const { code, message, result } = res.data;
      Notify({
        type: code !== 0 ? "warning" : "success",
        background: code !== 0 ? $notifyColor.warning : $notifyColor.success,
        message,
        duration: 1500,
        onClose() {
          if (code === 0) {
            store.loginInfo = result;
            if (redirect) {
              router.back();
              return;
            }

            if (
              isWxClient() &&
              store.openid == "" &&
              location.href.indexOf("code=") === -1
            ) {
              let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
                store.siteInfo.wxappid
              }&redirect_uri=${encodeURIComponent(
                location.href
              )}&response_type=code&scope=snsapi_base#wechat_redirect`;
              location.replace(url);
              return;
            }
          }
        },
      });
    };

    if (isWxClient() && store.openid === "" && location.href.indexOf("code=") !== -1) {
      http("getOpenId", { code: parseWxCode(), appid: store.siteInfo.wxappid }).then(
        ({
          data: {
            result: { openid },
          },
        }) => {
          store.openid = openid;
          router.go(-2);
        }
      );
    }

    return {
      username,
      password,
      regstry,
      login,
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
.img {
  padding: 40px 0;
  .icon {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 0 auto;
    background-color: #dfe0e2;
    overflow: hidden;
    i {
      transform: translateY(14%);
      font-size: 70px;
      color: #fff;
    }
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
    font-size: 14px;
    outline: none;
    border: none;
    background: transparent;
    &:focus {
      border: none;
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
.regstry-btn {
  width: 100%;
  text-align: center;
  color: #666;
}
</style>
