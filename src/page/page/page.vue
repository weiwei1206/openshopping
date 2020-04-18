<template>
<div>
    <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in SwipeImg" :key="index">
           <div class="imgBox"  :style="{backgroundImage:'url(' + item.src + ')'}">
          <!-- <img
            :src="item.src"
          /> -->
          </div>
        </van-swipe-item>
        <!-- <van-swipe-item>
          <div class="imgBox ">
          <img
            src="https://img.yzcdn.cn/upload_files/2019/08/22/FsytNIBbkq102cgqT_l5KsWivtvh.png!middle.png"
          />
          </div>
        </van-swipe-item> -->
      </van-swipe>
        
        <div class="categoryH-div" v-for="(item,index) in main_datas" :key="index">
            <h4>{{item.sname}}</h4>
            <van-row  gutter="20">
                <div class="main_box">
                    <van-col class="main-col" v-for="(g,index2) in item.goods" :key="index2" ><img :src="g.gpic_small" @click="itemClick(g)">
                    <span>{{g.gname}}</span>
                    <span>￥{{g.gprice}}</span>
               </van-col>
               </div>
        <!-- <van-col span="8"><img src="//img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png"><span>剃须刀</span></van-col>
               <van-col span="8"><img src="//img20.360buyimg.com/focus/s140x140_jfs/t21715/149/246679831/16257/ddbf2036/5b0565a7N8dbc0017.png"><span>路由器</span></van-col>
               <van-col span="8"><img src="//img14.360buyimg.com/focus/s140x140_jfs/t1/4478/16/633/36008/5b923503E39b9dfa9/13b099f187576d8c.png"><span>月饼</span></van-col>
               <van-col span="8"><img src="//img10.360buyimg.com/focus/s140x140_jfs/t1/1410/32/643/38009/5b9236b2Eb02fbf02/1e7de6987578dcdd.jpg" ><span>牛奶</span></van-col>
               <van-col span="8"><img src="//img20.360buyimg.com/focus/s140x140_jfs/t1/4674/14/665/25245/5b9236bbE088d5efb/6c7c2f9857736c65.jpg"><span>男士内裤</span></van-col>
               <van-col span="8"><img src="//img20.360buyimg.com/focus/s140x140_jfs/t1/1710/26/666/26147/5b9236c3E5fd1cd42/86c6bca8f4fe1efa.png"><span>小米8</span></van-col>
               <van-col span="8"><img src="//img11.360buyimg.com/focus/s140x140_jfs/t1/3653/6/655/42593/5b9236caEfef6235b/9e118f12705f52bb.png"><span>大闸蟹</span></van-col>
               <van-col span="8"><img src="//img20.360buyimg.com/focus/s140x140_jfs/t23881/349/2204372862/9923/4c62864a/5b7693eeNf6883734.png"><span>三只松鼠</span></van-col>
               <van-col span="8"><img src="//img20.360buyimg.com/focus/s140x140_jfs/t24253/294/2182777138/4059/429945c9/5b76990bNde226fbc.png"><span>充电宝</span></van-col>
               <van-col span="8"><img src="//img30.360buyimg.com/focus/s140x140_jfs/t22051/318/235303191/9297/c5ea2761/5b055000N410a7553.png"><span>空调</span></van-col>
               <van-col span="8"><img src="//img10.360buyimg.com/focus/s140x140_jfs/t19960/243/653029866/38879/91bb398b/5b055555N9245f8aa.jpg"><span>电饭煲</span></van-col>
               <van-col span="8"><img src="//img12.360buyimg.com/focus/s140x140_jfs/t1/345/33/944/5582/5b9236d2E62d8da2e/99f72d51b8f195ed.jpg"><span>电话手表</span></van-col>
               <van-col span="8"><img src="//img30.360buyimg.com/focus/s140x140_jfs/t1/1446/14/631/8500/5b9237e5E0d1f9e16/b1a627b92323b5ed.png"><span>华为</span></van-col> -->
            </van-row>

        </div>
        
        
        
      
        
</div>
</template>
<script>
import {GetTopn ,getSwipeImg} from "../../api/page.js";

export default {
    name:"page",
    components:{
    
    },
    data:function(){
        return{
            main_datas:[],
            SwipeImg:[],
        }
    },
    created:function(){
       this.onLoadMainDatas()
       this.onLoadSwipeImg()
    },
    methods:{
      onLoadMainDatas(){
          GetTopn().then(Response=>{
              let data = Response.data.list
              this.main_datas = data
          })
      },
      onLoadSwipeImg(){
          getSwipeImg().then(Response=>{
              let data = Response.data.list
              this.SwipeImg = data
          })
      },
      itemClick(data){
         this.$router.push('/product/'+data.gid);
      }
    }
}
</script>
<style lang="less">
.imgBox {
  width: 100%;
  height: 220px;
  background-size:100% 100%; 

}
.main-col{
    margin: 20px;
}
.categoryH-div {
    margin: 19px 0px 0;
    h4 {
      font-size: 14px;
      color: #333;
      text-align: center;
    }
    span{
      font-size: 14px;
      color: #333;
      text-align: center;
      display: block;
    }
    img{
        width: 120px;
        height: 120px;
    }
    
  }
</style>

