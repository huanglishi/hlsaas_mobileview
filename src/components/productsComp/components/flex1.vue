<template>
  <div :class="`products-list-${datas.columnnUum}`">
    <div
      class="item"
      v-for="item in datas.productsList"
      :key="item.id"
      @click="jumpDetail(item)"
    >
      <div
        class="wrapper-img"
        :style="{
          'background-image': `url(${item.images.length !== 0 ? item.images[0] : ''})`,
        }"
      ></div>
      <p class="product-name" v-if="datas.showProductName">{{ item.title }}</p>

      <template v-for="(ite, index) in item.prolist" :key="index">
        <template v-if="['price'].includes(ite.keyname)">
          <div class="price" v-if="isShowParams(ite)">
            <!-- <span class="name" v-if="datas.paramsName">{{ ite.name }}：</span> -->
            <span class="amount">
              <i class="currency">¥</i>
              {{ ite.val }}
              <i class="currency"></i>
            </span>
          </div>
        </template>

        <template v-else>
          <p class="params-item" v-if="isShowParams(ite)">
            {{ datas.paramsName ? `${ite.name}：` : "" }}{{ ite.val || "-" }}
          </p>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { useRouter } from "vue-router";
export default {
  name: "flex1",
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
.products-list-1 {
  padding: 15px;
  > .item {
    padding-bottom: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 14px 2px rgb(0 0 0 / 15%);
    border-radius: 4px;
    overflow: hidden;
    &:not(:last-of-type) {
      margin-bottom: 15px;
    }
    .wrapper-img {
      width: 100%;
      height: 170px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
    }
    .product-name {
      color: #000;
      padding: 10px 13px 0;
      font-size: 15px;
    }
  }
}
.price {
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  margin-top: 6px;
  order: 999;
  .amount {
    font-size: 18px;
    font-weight: 700;
    color: #ff7214;
    margin-left: 10px;
    .currency {
      font-style: normal;
      font-size: 15px;
    }
  }
  .origin-price {
    font-size: 14px;
    text-decoration: line-through;
    color: #797979;
    margin-left: 10px;
  }
}
.params-item{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.params-item,
.price .name {
  display: block;
  margin-left: 13px;
  line-height: 18px;
  font-size: 12px;
  color: #797979;
}
.products-list-2 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 15px 10px;
  > .item {
    display: flex;
    flex-direction: column;
    width: calc((100% / 2) - 5px);
    box-shadow: 0 0 14px 2px rgb(0 0 0 / 15%);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 15px;
    padding-bottom: 15px;
    &:nth-of-type(Odd) {
      margin-right: 10px;
    }
    .wrapper-img {
      width: 100%;
      height: 170px;
      overflow: hidden;
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
    }
    .product-name {
      padding: 10px 13px 0;
      font-size: 14px;
      color: #000;
    }
  }
}
.products-list-3 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 15px 10px 0;
  .item {
    display: flex;
    flex-direction: column;
    width: calc((100% / 3) - 8px);
    box-shadow: 0 0 14px 2px rgb(0 0 0 / 15%);
    border-radius: 4px;
    overflow: hidden;
    padding-bottom: 15px;
    margin-bottom: 15px;
    .wrapper-img {
      width: 100%;
      height: 100px;
      overflow: hidden;
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
    }
    .product-name {
      padding: 10px 13px 0;
      font-size: 13px;
      line-height: 18px;
    }
  }
}
</style>
