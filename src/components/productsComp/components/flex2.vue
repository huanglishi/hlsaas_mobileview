<template>
  <div class="product-list">
    <div
      class="product-item"
      v-for="item in datas.productsList"
      :key="item.id"
      @click="jumpDetail(item)"
    >
      <div
        class="product-item-img"
        :style="{
          'background-image': `url(${item.images.length !== 0 ? item.images[0] : ''})`,
        }"
      ></div>
      <div class="product-info">
        <div class="product-name" v-if="datas.showProductName">
          {{ item.title }}
        </div>
        <template v-for="ite in item.prolist" :key="ite.id">
          <template v-if="ite.keyname == 'price'">
            <div class="price" v-if="isShowParams(ite)">
              <!-- <span class="name">价格：</span> -->
              <span class="amount">
                <i class="currency">¥</i>
                <p>
                  {{ ite.val || "-" }}
                </p>
                <i class="currency"></i>
              </span>
              <!-- <span class="origin-priuce">¥1300</span> -->
            </div>
          </template>
          <template v-else>
            <p class="params-item" v-if="isShowParams(ite)">
              {{ ite.name }}：{{ ite.val || "-" }}
            </p>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { useRouter } from "vue-router";
export default {
  name: "flex2",
  props: {
    datas: Object,
  },
  setup(props) {
    const router = useRouter();

    const jumpDetail = ({ id }) =>
      router.push({
        path: "/productDetail",
        query: {
          id,
        },
      });

    const isShowParams = ({ id }) => {
      const paramsItem = _.find(props.datas.paramsPane, ["id", id]);
      return paramsItem.show || false;
    };

    return {
      jumpDetail,
      isShowParams,
    };
  },
};
</script>

<style lang="less" scoped>
.product-list {
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}
.product-item {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  padding-left: 15px;
  .product-item-img {
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
    margin-left: 15px;
    .product-name {
      font-size: 15px;
      font-weight: 700;
    }
  }
}

.price {
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
  order: 999;
  .amount {
    display: flex;
    align-items: flex-end;
    color: #ff7214;
    font-weight: 700;
    font-size: 18px;
    i {
      font-style: normal;
      font-size: 15px;
    }
  }
  .origin-priuce {
    margin-left: 10px;
  }
}
.price .origin-priuce {
  color: #797979;
  font-size: 12px;
  text-decoration: line-through;
}
.price .name,
.params-item {
  font-size: 12px;
  line-height: 18px;
  color: #797979;
}
</style>
