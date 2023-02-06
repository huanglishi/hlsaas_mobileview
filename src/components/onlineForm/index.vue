<template>
  <div class="form-wrap">
    <p class="title" v-if="datas.formName">{{ datas.formName }}</p>
    <div class="content">
      <component
        v-for="item in formData.value"
        :is="`h-${item.type}`"
        :fields="item"
        :key="item.id"
      />
    </div>
    <div class="submit-btn" @click="submitForm(form)">
      {{ submitLoding ? "提交中" : datas.button_text }}
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { ref, reactive, watch, getCurrentInstance } from "vue";
import { Notify } from "vant";
import { siteData } from "@/store";
import http from "../../axios";
import router from "../../router";
const files = import.meta.globEager("./components/*.vue");
const utilFuns = {};
Object.keys(files).forEach((key) => {
  const index = key.indexOf("/", 5);
  const index2 = key.indexOf(".vue");
  const name = key.substring(index + 1, index2);
  utilFuns[name] = files[key].default;
});
export default {
  name: "onlineForm",
  components: {
    ...utilFuns,
  },
  props: {
    datas: Object,
  },
  setup(props) {
    const {
      proxy: { $notifyColor },
    } = getCurrentInstance();
    const form = ref();
    const store = siteData();
    const submitStatus = ref(false);
    const submitLoding = ref(false);
    const formData = reactive({
      value: [],
    });

    const disposeFormData = (value) => {
      value.forEach((item) => {
        const cloneItem = _.cloneDeep(item);
        switch (cloneItem.type) {
          case "radio":
          case "select":
          case "checkbox":
            const options = [];
            cloneItem.option.split("\n").forEach((ite) => {
              options.push({
                label: ite,
                value: ite,
              });
            });
            cloneItem["options"] = options;
            cloneItem.value = [];
            break;
          case "image":
            cloneItem.value = [];
            break;
        }
        formData.value.push(cloneItem);
      });
    };

    const submitForm = async () => {
      if (submitLoding.value) return;
      if (submitStatus.value) {
        Notify({
          type: "warning",
          message: "请勿重复提交",
          background: $notifyColor.warning,
        });
        return;
      }

      if (_.isEmpty(store.loginInfo)) {
        Notify({
          type: "warning",
          message: "请先登陆",
          background: $notifyColor.warning,
          duration: 1000,
          onClose() {
            router.push("/login");
          },
        });
        return;
      }

      for (let i = 0; i < _.size(formData.value); i++) {
        const { type, required, value, name } = formData.value[i];
        if (["checkobox", "image"].includes(type)) {
          if (required === 0 && _.size(value) === 0) {
            Notify({
              type: "warning",
              background: $notifyColor.warning,
              message: `请输入${name}`,
            });
            return;
          }
        } else if (value === "" && required === 0) {
          Notify({
            type: "warning",
            background: $notifyColor.warning,
            message: `请输入${name}`,
          });
          return;
        }
      }

      let params = {
        uid: store.loginInfo.id,
        form_id: formData.value[0].form_id,
        item_list: [],
      };
      formData.value.forEach((item) => {
        const cloneItem = _.cloneDeep(item);
        if (_.isArray(cloneItem.value)) {
          cloneItem.value = JSON.stringify(cloneItem.value);
        }
        params.item_list.push({
          form_item_id: cloneItem.id,
          value: cloneItem.value,
        });
      });
      submitLoding.value = true;
      let res = await http("saveForm", params);
      submitLoding.value = false;
      const { code } = res.data;
      if (code === 0) {
        submitStatus.value = true;
        Notify({
          type: "success",
          message: props.datas.success_tig,
          background: $notifyColor.success,
        });
      }
    };

    watch(
      () => props.datas,
      async (val) => {
        formData.value = [];
        const res = await http("getFormField", { form_id: val.formId });
        disposeFormData(res.data.result.list);
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      submitForm,
      form,
      formData,
      submitLoding,
    };
  },
};
</script>

<style lang="less" scoped>
.form-wrap {
  padding: 20px 15px;
  .title {
    width: 100%;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
  }
  .submit-btn {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    border-radius: 4px;
    margin: 20px auto 10px;
    background-color: #ff7214;
  }
}
</style>
