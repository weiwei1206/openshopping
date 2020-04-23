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
  height: 200px;
  background-size: 100% 100%;
}
</style>