<template>
  <div class="wrapper">
    <div class="header-nav">
      <i class="iconfont icon-jiantou-zuo" @click="router.back()"></i>
      <p>修改密码</p>
    </div>
    <!-- <van-field
      type="password"
      name="原始密码"
      label="原始密码"
      placeholder="原始密码"
    >
    </van-field> -->
    <van-field
      type="password"
      name="新密码"
      label="新密码"
      placeholder="新密码"
      v-model="newPassword"
    />
    <van-field
      type="password"
      name="确认新密码"
      label="确认新密码"
      placeholder="新密码"
      v-model="newPassword2"
    />
  </div>
  <div class="change-password" @click="confirm">修改密码</div>
</template>

<script>
import http from "@/axios";
import { useRouter } from "vue-router";
import { Dialog, Notify } from "vant";
import { siteData } from "@/store";
import { getCurrentInstance, ref } from "vue";
export default {
  name: "changePassword",
  setup() {
    const { proxy: $notifyColor } = getCurrentInstance();
    const router = useRouter();
    const newPassword = ref("");
    const newPassword2 = ref("");
    const store = siteData();

    const confirm = async () => {
      if (newPassword.value !== newPassword2.value) {
        Notify({
          type: "warning",
          message: "两次密码输入不一致，请重新输入！",
          background: $notifyColor.warning,
          duration: 1000
        });
        return;
      }
      const res = await http("upUserInfo", {
        micweb_id: store.siteInfo.id,
        id: store.loginInfo.id,
        password: newPassword.value,
      });
      if (res.data.code == 0) {
        Notify({
          type: "success",
          background: $notifyColor.success,
          message: "修改成功！",
          duration: 1000
        });
      } else {
        Dialog.alert(res.data.message);
      }
    };

    return {
      router,
      confirm,
      newPassword,
      newPassword2,
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
.change-password {
  line-height: 40px;
  border-radius: 40px;
  text-align: center;
  color: #fff;
  width: 80%;
  margin: 30px auto 0;
  background: rgb(88, 116, 216);
}
</style>