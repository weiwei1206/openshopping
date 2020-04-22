<template>
  <div>
    <the-swipe></the-swipe>

    <van-row
      class="categoryH-div"
      v-for="(item,index) in main_datas"
      :key="index"
    >
      <van-row class="hidden-div">

        <div class="category-name">
          {{item.sname}}
        </div>

        <div class="main_box">
          <van-col
            class="main-col"
            v-for="(g,index2) in item.goods"
            :key="index2"
          >
            <div class="col-item">
              <div align="middle">
                <img
                  class="col-img"
                  :src="g.gpic_small"
                  @click="itemClick(g)"
                >
              </div>
              <span class="desc">{{g.gname}}</span>
              <span class="price">￥{{g.gprice}}</span>
            </div>
          </van-col>
        </div>
      </van-row>
    </van-row>
  </div>
</template>

<script>
import { GetTopn } from "../../api/page.js";
import theSwipe from "../../components/page/theSwipe"

export default {
  name: "page",
  components: {
    theSwipe
  },
  data: function () {
    return {
      main_datas: []
    }
  },
  created: function () {
    this.onLoadMainDatas()
  },
  methods: {
    onLoadMainDatas() {
      GetTopn().then(Response => {
        let data = Response.data.list
        this.main_datas = data
      })
    },
    itemClick(data) {
      this.$router.push('/product/' + data.gid);
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~@/assets/style/varibles.styl';

.main-col {
  width: 49%;

  .col-item {
    .col-img {
      width: 85%;
      height: auto;
    }

    .desc {
      font-size: 15px;
      margin-bottom: 2px;
    }

    .price {
      color: $bgColor;
      font-size: 18px;
    }
  }
}

.categoryH-div {
  .hidden-div {
    margin-top: 4px;
    margin-left: 4px;
    margin-right: 4px;
    border-radius: 5px;
    border: 2px solid $bgColor;
    background: #fff;
  }

  .category-name {
    padding: 4px;
    font-size: 20px;
    background: $bgColor;
    color: #fff;
    text-align: center;
  }

  span {
    text-align: center;
    display: block;
    font-family: 'STZhongsong';
  }

  img {
    width: 120px;
    height: 120px;
  }
}
</style>

