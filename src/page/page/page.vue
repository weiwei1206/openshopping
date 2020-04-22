<template>
  <div>
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(item,index) in SwipeImg"
        :key="index"
      >
        <div
          class="imgBox"
          :style="{backgroundImage:'url(' + item.src + ')'}"
          @click="itemClick(item)"
        >
        </div>
      </van-swipe-item>
    </van-swipe>

    <div
      class="categoryH-div"
      v-for="(item,index) in main_datas"
      :key="index"
    >
      <h4>{{item.sname}}</h4>
      <van-row gutter="20">
        <div class="main_box">
          <van-col
            class="main-col"
            v-for="(g,index2) in item.goods"
            :key="index2"
          >
            <img
              :src="g.gpic_small"
              @click="itemClick(g)"
            >
            <span>{{g.gname}}</span>
            <span>￥{{g.gprice}}</span>
          </van-col>
        </div>
      </van-row>
    </div>
  </div>
</template>

<script>
import { GetTopn, getSwipeImg } from "../../api/page.js";

export default {
  name: "page",
  components: {

  },
  data: function () {
    return {
      main_datas: [],
      SwipeImg: [],
    }
  },
  created: function () {
    this.onLoadMainDatas()
    this.onLoadSwipeImg()
  },
  methods: {
    onLoadMainDatas() {
      GetTopn().then(Response => {
        let data = Response.data.list
        this.main_datas = data
      })
    },
    onLoadSwipeImg() {
      getSwipeImg().then(Response => {
        let data = Response.data.list
        this.SwipeImg = data
      })
    },
    itemClick(data) {
      this.$router.push('/product/' + data.gid);
      console.log(data);
    }
  }
}
</script>

<style lang="less">
.imgBox {
  width: 100%;
  height: 220px;
  background-size: 100% 100%;
}
.main-col {
  margin: 20px;
}
.categoryH-div {
  margin: 19px 0px 0;
  h4 {
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  span {
    font-size: 14px;
    color: #333;
    text-align: center;
    display: block;
  }
  img {
    width: 120px;
    height: 120px;
  }
}
</style>

