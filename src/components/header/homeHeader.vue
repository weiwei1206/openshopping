<template>
  <div class="home-header">
    <div class="home-header-left">
      <div class="iconfont back-icon">&#xe608;</div>
    </div>
    <div class="home-header-input">
      <span class="iconfont">&#xe782;</span>
      输入商品名称搜索
    </div>
    <div class="home-header-right">
      城市
      <span class="iconfont arrow-icon">&#xe6aa;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeHeader'
}
</script>

<style lang='stylus' scoped>
@import '~@/assets/style/varibles.styl';

.home-header {
  display: flex;
  line-height: 0.86rem;
  background: $bgColor;
  border-radius: 5px;
  border: 2px solid $bgColor;
  color: #fff;

  .home-header-left {
    width: 0.64rem;
    float: left;

    .back-icon {
      text-align: center;
      font-size: 0.4rem;
    }
  }

  .home-header-input {
    flex: 1;
    height: 0.64rem;
    line-height: 0.64rem;
    margin-top: 0.12rem;
    margin-left: 0.2rem;
    padding-left: 0.2rem;
    background: #fff;
    border-radius: 0.1rem;
    color: #ccc;
  }

  .home-header-right {
    width: 1.24rem;
    float: right;
    text-align: center;

    .arrow-icon {
      margin-left: -0.04rem;
      font-size: 0.24rem;
    }
  }
}
</style>