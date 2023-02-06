<template>
  <div>
    <div class="header-nav">
      <i class="iconfont icon-jiantou-zuo" @click="router.back()"></i>
      <p>{{ addressType }}</p>
    </div>
    <van-form>
      <van-cell-group inset>
        <van-field
          label="收货人"
          placeholder="名字"
          v-model="addressInfo.value.name"
        />
        <van-field
          label="手机号码"
          placeholder="手机号"
          v-model="addressInfo.value.mobile"
        />
        <van-field
          is-link
          readonly
          v-model="address"
          label="所在地区"
          placeholder="省、市、区"
          @click="() => (show = true)"
        />
        <van-field
          v-model="addressInfo.value.address"
          rows="4"
          type="textarea"
          label="详细地址"
          placeholder="小区楼栋/乡村名称"
        />
        <van-field name="switch" label="默认地址">
          <template #input>
            <van-switch v-model="addressInfo.value.is_default" size="20" />
          </template>
        </van-field>
      </van-cell-group>
    </van-form>
    <div class="save" @click="save">保存</div>
  </div>
  <van-action-sheet v-model:show="show">
    <van-area :area-list="areaList" @cancel="close" @confirm="confirm" />
  </van-action-sheet>
</template>

<script lang="ts">
import http from "@/axios";
import { Dialog, Notify } from "vant";
import { areaList } from "@vant/area-data";
import { reactive, ref, getCurrentInstance } from "vue";
import { siteData } from "@/store";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "addressEdit",
  setup() {
    const {
      proxy: { $notifyColor },
    } = getCurrentInstance();
    const show = ref(false);
    const address = ref("");
    const store = siteData();
    const addressType = ref("新增地址");
    const route = useRoute();
    const router = useRouter();
    const addressInfo = reactive({
      value: {
        name: "",
        mobile: "",
        address: "",
        is_default: false,
        province_name: "",
        province_code: "",
        city_name: "",
        city_code: "",
        area_name: "",
        area_code: "",
      },
    });
    const { id } = route.query;
    if (id) {
      addressType.value = "编辑地址";
      http("getAddress", { id }).then((res) => {
        const {
          name,
          mobile,
          address: addressDetail,
          is_default,
          province_name,
          area_name,
          city_name,
          province_code,
          area_code,
          city_code,
        } = res.data.result;
        addressInfo.value.name = name;
        addressInfo.value.mobile = mobile;
        addressInfo.value.address = addressDetail;
        addressInfo.value.is_default = Boolean(is_default);
        addressInfo.value.province_name = province_name;
        addressInfo.value.province_code = province_code;
        addressInfo.value.city_name = city_name;
        addressInfo.value.city_code = city_code;
        addressInfo.value.area_name = area_name;
        addressInfo.value.area_code = area_code;
        address.value = `${province_name} ${city_name} ${area_name}`;
      });
    }
    const save = async () => {
      const params = {
        uid: store.loginInfo.id,
        ...addressInfo.value,
        is_default: addressInfo.value.is_default ? 1 : 0,
      };
      if (id) {
        params["id"] = Number(id);
      }
      const res = await http("saveAddress", params);
      if (res.data.code == 0) {
        Notify({
          type: "success",
          background: $notifyColor.success,
          duration: 800,
          message: id ? "编辑成功" : "添加成功",
          onClose() {
            router.back();
          },
        });
      } else {
        Dialog.alert({
          message: res.data.message,
        });
      }
    };

    const close = () => {
      show.value = false;
    };

    const confirm = (data) => {
      address.value = "";
      data.forEach((item, index) => {
        address.value += `${item.name} \n`;
        switch (index) {
          case 0:
            addressInfo.value.province_name = item.name;
            addressInfo.value.province_code = item.code;
            break;
          case 1:
            addressInfo.value.city_name = item.name;
            addressInfo.value.city_code = item.code;
            break;
          case 2:
            addressInfo.value.area_name = item.name;
            addressInfo.value.area_code = item.code;
        }
      });
      show.value = false;
    };

    return {
      addressInfo,
      save,
      areaList,
      confirm,
      close,
      show,
      address,
      addressType,
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
.save {
  line-height: 40px;
  color: #fff;
  text-align: center;
  border-radius: 40px;
  width: 80%;
  margin: 0 auto;
  background-color: rgb(88, 116, 216);
}
</style>
