<template>
  <div class="wrapper-box">
    <div class="search-box">
      <i class="iconfont icon-sousuo"></i>
      <input placeholder="搜索" v-model="keywords" @input="search" />
      <span @click="router.back()">取消</span>
    </div>
    <div class="list">
      <div class="search-classify" v-if="searchResult.plist.length != 0">
        <h2 class="title">【产品】</h2>
        <ul class="product-list">
          <li
            v-for="item in searchResult.plist"
            :key="item.id"
            @click="jump('product', item)"
          >
            <div
              class="img"
              :style="{
                'background-image': `url(${item.images[0]})`,
              }"
            ></div>
            <p class="name">{{ item.title }}</p>
            <div class="info">
              <span>价格：</span>
              <p>¥ {{ getPrice(item.prolist) || 0 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="search-classify" v-if="searchResult.alist.length != 0">
        <h2 class="title">【文章】</h2>
        <ul class="essay-list">
          <li
            v-for="item in searchResult.alist"
            :key="item.id"
            @click="jump('essay', item)"
          >
            <p>{{ item.title }}</p>
            <i class="iconfont icon-jiantou-you"></i>
          </li>
        </ul>
      </div>

      <van-empty
        image="search"
        description="暂无数据"
        v-if="searchResult.plist.length === 0 && searchResult.alist.length === 0"
      />
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive } from "vue";
import _ from "lodash";
import http from "@/axios";
export default {
  name: "search",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const keywords = ref("");
    const searchResult = reactive({
      alist: [],
      plist: [],
    });
    const { k } = route.query;

    const search = _.debounce(async () => {
      router.replace(`/search?k=${keywords.value}`);
      const data = await http("searchAll", {
        micweb_id: 74,
        keyword: keywords.value,
      });
      const { alist, plist } = data.data.result;
      searchResult.alist = alist;
      searchResult.plist = plist;
    }, 500);

    const getPrice = (paramslist) => {
      const price = _.find(paramslist, ["keyname", "price"]);
      return price.val;
    };
    const jump = (type, { id }) => {
      if (type === "product") {
        router.push({
          path: "/productDetail",
          query: {
            id,
          },
        });
      } else {
        router.push({
          path: "/essayDetail",
          query: {
            essayId: id,
          },
        });
      }
    };

    if (k) {
      keywords.value = k;
      search();
    }
    return {
      search,
      keywords,
      searchResult,
      getPrice,
      jump,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 15px 15px;
  i {
    font-size: 15px;
    color: #666;
  }
  input {
    flex: 1;
    line-height: 20px;
    font-size: 14px;
    padding: 0 8px;
  }
  span {
    color: #666;
  }
}
.wrapper-box {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.search-classify {
  background-color: #fff;
  margin-top: 10px;
  padding-bottom: 10px;
  .title {
    position: relative;
    font-weight: bold;
    line-height: 40px;
    font-size: 15px;
    border-top: 1px solid rgb(231, 231, 231);
    border-bottom: 1px solid rgb(231, 231, 231);
    padding: 0 20px;
    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(15px, -50%);
      width: 4px;
      height: 4px;
      background-color: rgb(44, 44, 44);
      display: block;
      border-radius: 50%;
      content: "";
    }
  }
  .product-list {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 0 50%;
      padding: 15px 15px 0;
      box-sizing: border-box;
      overflow: hidden;
      .img {
        width: 150px;
        height: 150px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .name {
        font-size: 14px;
        margin: 10px 0;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .info {
        display: flex;
        span {
          font-size: 13px;
          color: #999;
        }
        p {
          color: rgba(50, 133, 255, 1);
        }
      }
    }
  }
  .essay-list {
    li {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 15px;
      line-height: 40px;
      border-bottom: 1px solid rgb(238, 238, 238);
      p {
        font-size: 14px;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      i {
        width: 20px;
        font-size: 13px;
        color: #999;
      }
    }
  }
}
.list {
  flex: 1;
  overflow: scroll;
  background-color: rgb(250, 250, 250);
}
</style>
