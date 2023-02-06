<template>
  <div class="copyright">
    {{ copytext }}
    <div class="edit">编辑底部</div>
  </div>
</template>

<script>
export default {
  name: "copyright",
  props: {
    copytext: String,
  },
};
</script>

<style lang="less" scoped>
.copyright {
  position: relative;
  text-align: center;
  color: rgb(123, 123, 123);
  font-size: 14px;
  line-height: 60px;
  height: 60px;
  background-color: rgb(237, 237, 237);
  &:hover {
    .edit {
      display: block;
    }
  }
}
.edit {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  line-height: 30px;
  padding: 0 10px;
  background-color: #fff;
  color: rgb(122, 122, 122);
  border-radius: 4px;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;
}
</style>
