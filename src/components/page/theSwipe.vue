<template>
  <div>
    <van-swipe
      stop-propagation=false
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
  </div>
</template>

<script>
import { getSwipeImg } from "../../api/page";

export default {
  name: "theSwipe",
  data: function () {
    return {
      SwipeImg: []
    }
  },
  created: function () {
    this.onLoadSwipeImg()
  },
  methods: {
    onLoadSwipeImg() {
      getSwipeImg().then(Response => {
        let data = Response.data.list
        this.SwipeImg = data
      })
    },
    itemClick(data) {
      this.$router.push('/product/' + data.gid);
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