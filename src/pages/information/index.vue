<template>
  <div class="header-nav">
    <i class="iconfont icon-jiantou-zuo" @click="router.back()"></i>
    <p>个人信息</p>
  </div>
  <div class="info">
    <div class="item">
      <span>头像</span>
      <div class="right">
        <div class="avtar">
          <van-image
            width="80"
            height="80"
            :src="store.loginInfo.avatar"
            alt=""
          />
          <input type="file" class="file" @change="uploadAatar" />
        </div>
      </div>
    </div>
    <div class="item">
      <span>名字</span>
      <div class="right">
        <input type="text" v-model="store.loginInfo.name" @blur="changeName" />
      </div>
    </div>
  </div>
</template>

<script>
import http, { uploadImg } from "@/axios";
import { siteData } from "@/store";
import { useRouter } from "vue-router";
export default {
  name: "information",
  setup() {
    const store = siteData();
    const router = useRouter();

    const uploadAatar = async (e) => {
      if (e.target.files && e.target.files[0]) {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("uid", store.loginInfo.id);
        let res = await uploadImg(formData);

        const {
          result: { url },
        } = res.data;
        e.target.value = "";
        await http("upUserInfo", {
          micweb_id: store.siteInfo.id,
          accountID: store.loginInfo.id,
          avatar: url,
        });
        store.loginInfo.avatar = url;
      }
    };

    const changeName = async (e) => {
      await http("upUserInfo", {
        micweb_id: store.siteInfo.id,
        id: store.loginInfo.id,
        name: e.target.value,
      });
      store.loginInfo.name = e.target.value;
    };

    return {
      store,
      uploadAatar,
      changeName,
      router,
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
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  &:not(:first-of-type) {
    border-top: 1px solid rgb(241, 241, 241);
  }
  .right {
    display: flex;
    align-items: center;
    .avtar {
      position: relative;
      margin-left: 20px;
      .file {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
      }
    }
    input {
      border: none;
      outline: none;
      padding: 5px 10px;
      background-color: rgb(235, 235, 235);
    }
  }
}
</style>