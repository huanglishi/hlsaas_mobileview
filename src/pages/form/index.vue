<template>
  <div class="wrapper">
    <nav class="headerNav">
      <div class="leftBtn" @click="back">
        <i class="iconfont icon-jiantou-zuo"></i>
      </div>
      <p>{{ formData.value.name }}</p>
      <div class="rightBtn">
        <i class="iconfont icon-home" @click="jumpHome"></i>
      </div>
    </nav>

    <div class="content">
      <online-form :datas="formData.value" />
    </div>
  </div>
</template>

<script lang="ts">
import { siteData } from "../../store";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import day from "dayjs";
import onlineFrom from "@/components/onlineForm/index.vue";
export default {
  name: "form",
  components: {
    onlineFrom,
  },
  setup() {
    const store = siteData();
    const formData = reactive({ value: {} });
    const route = useRoute();
    const { form } = route.query;
    const router = useRouter();
    if (form !== "") {
      const { name, button_text, success_tig, id } = JSON.parse(form);
      formData.value = {
        name,
        button_text,
        success_tig,
        formId: id,
      };
    }

    const back = () => {
      router.back();
    };

    const jumpHome = () => {
      router.push(`/?id=${store.siteInfo.id}`);
    };

    return {
      day,
      jumpHome,
      back,
      formData,
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  .headerNav {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid rgb(238, 238, 238);
  }
  .content {
  }
}
</style>
