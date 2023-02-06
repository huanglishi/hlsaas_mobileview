<template>
  <div class="wrapper">
    <div class="label">
      <p>{{ fields.name }}</p>
      <i v-if="!fields.required">*</i>
    </div>
    <div class="image-list">
      <div class="img-item" v-for="(item, index) in fields.value" :key="item">
        <van-image :src="item" height="70" width="70" fit="contain" />
        <span class="delete iconfont icon-guanbi" @click="deleteImg(index)"></span>
      </div>
      <div class="select-img">
        <i class="iconfont icon-upload"></i>
        <input
          type="file"
          class="img"
          accept="image/png, image/jpeg"
          @change="selectImg"
        />
      </div>
    </div>
  </div>
</template>

<script  lang="ts">
import _ from "lodash";
import { Notify } from "vant";
import { siteData } from "@/store";
import { uploadImg } from "@/axios";
export default {
  name: "hImage",
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const store = siteData();

    const selectImg = async (e) => {
      if (e.target.files && e.target.files[0]) {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("uid", store.loginInfo.id);
        let res = await uploadImg(formData);

        const {
          message,
          result: { url },
        } = res.data;
        e.target.value = "";
        if (!Boolean(url)) {
          Notify({
            message,
          });
        } else {
          props.fields.value.push(url);
        }
      }
    };

    const deleteImg = (idx) => {
      props.fields.value = props.fields.value.filter((url, index) => index !== idx);
    };

    return {
      selectImg,
      deleteImg,
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  .label {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    p {
      font-size: 14px;
    }
    i {
      color: red;
      font-size: 18px;
      margin-left: 5px;
    }
  }
  .select-img {
    justify-self: flex-start;
    position: relative;
    width: 70px;
    height: 70px;
    border: 1px dashed #666;
    text-align: center;
    margin: 5px;

    input {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: inline-block;
      opacity: 0;
    }
    .iconfont {
      line-height: 70px;
      font-size: 70px;
      color: #666;
    }
  }
  .image-list {
    display: flex;
    flex-wrap: wrap;
    .img-item {
      position: relative;
      width: 70px;
      height: 70px;
      border: 1px solid #666;
      margin: 5px 6px;
      .delete {
        position: absolute;
        display: inline-block;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        width: 15px;
        height: 15px;
        border: 1px solid rgb(174, 174, 174);
        font-size: 10px;
        line-height: 15px;
        text-align: center;
        background-color: #fff;
        color: rgb(174, 174, 174);
        border-radius: 50%;
      }
    }
  }
}
</style>
