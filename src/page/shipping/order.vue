<template>
  <div class="order">
     <headerNav title="确认订单"/>
     <van-cell
      center
      :border="false"
      class="contact-card"
      is-link
      to="/user/address?id=2"
    >
      <template v-if="type === false">
        <strong @click="chooseAddr">选择地址</strong>
      </template>
      <template  v-else>
        <strong >{{address[0].aname}} {{address[0].atele}}</strong>
        <div>{{address[0].address}}</div>
      </template>
    </van-cell>
    <div style="height:15px;"></div>
    <div class="card" v-for="(product,i) in products" :key="i">
      <product-card :product='product' />
    </div>
        <div style="height:15px;"></div>
            <van-cell-group>
            <van-field
                label="留言"
                type="textarea"
                placeholder="请输入留言"
                rows="1"
                v-model="curOrder[0].comments"
                autosize
            />
            </van-cell-group>
        <div style="height:15px;"></div>
    
    <div style="height:15px;"></div>
    <van-cell-group class="total">
        <van-cell title="商品总额" :value='totalPrice/100' />
        <van-cell title="运费" :value="Freight" />
        <van-cell title="折扣" :value='discount' />
        <van-cell title="实付金额" :value="totalPrice/100+Freight-discount" style="font-weight: 700;" />
    </van-cell-group>

    <div style="height:50px;"></div>
    <van-submit-bar id="submitOrder"
      :price="totalPrice+Freight*100-discount*100"
      button-text="提交订单"
      label='实付金额：'
      @submit="onSubmit"
    />

  </div>
</template>

<script>
export default {
  data() {
    return {
      type: true,
      discount:100,//折扣
      Freight:10,//运费
      showTip:true,//默认从该页面退出需要显示确认信息，但是已经下单就不需要了
      address:[{
        address:" ",
        atele:" ",
        aname:' '
      }],
      products: [
        {
          gpic_small:
            "https://img10.360buyimg.com/mobilecms/s88x88_jfs/t17572/12/840082281/351445/e1828c58/5aab8dbbNedb77d88.jpg",
          title: "良品铺子 肉肉聚汇猪肉脯 猪蹄卤 辣味小吃520g",
          desc: "0.670kg/件，肉肉聚汇520g",
          gprice: 59.80,
          cnum: 2
        },
        {
          gpic_small:
            "https://img10.360buyimg.com/mobilecms/s88x88_jfs/t22720/128/1410375403/319576/8dbd859f/5b5e69b3Nf4f0e9e7.jpg",
          title: "元朗 鸡蛋卷 饼干糕点 中秋礼盒 广东特产680g",
          desc: "1.320kg/件",
          gprice: 65.80,
          cnum: 1,
        },
        {
          gpic_small:
            "https://img10.360buyimg.com/mobilecms/s88x88_jfs/t17572/12/840082281/351445/e1828c58/5aab8dbbNedb77d88.jpg",
          title: "良品铺子 肉肉聚汇猪肉脯 猪蹄卤 辣味小吃520g",
          desc: "0.670kg/件，肉肉聚汇520g",
          gprice: "59.80",
          cnum: 2
        },
      ],
      curOrder:[
        {
          oid: 1,
          ogoods_id:1,
          onum: 10,
          oprice: 2000,
          oaddr_id:1,
          otime:"2020-04-01T08:18:03.834Z",
          ostate:"待付款",
          comments:""
        }
      ]
    };
  },
  methods: {
    createOrder(state){
        //生成订单
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var mytime = year + "-" + month + "-" + day; 
        this.curOrder[0].onum = this.count;
        this.curOrder[0].oprice = this.totalPrice/100+this.Freight-this.discount;
        this.curOrder[0].oaddr_id = 2;//需要修改，看传入的是什么商品
        this.curOrder[0].ostate=state;
        this.curOrder[0].otime = mytime;
    },
    onSubmit() {
        //默认收货地址不为空才可以submit
        if(this.address.address!=' '){
          this.showTip=false;
          console.log(this.curOrder[0]);
          this.createOrder("待收货");
          //提交订单信息
          this.$axios.post("https://afc1gr.toutiao15.com/insertOrder",this.curOrder[0])
          .then(res=>{
            alert("下单成功");
            this.$router.push("/cart");
          })
          .catch(err=>{
            alert("下单失败，请检查地址是否为空~");
            console.log(err);
          });
          //删除原购物车中的商品
          this.products.forEach((item)=>{
            item.cnum = 0;
            this.$axios.put('https://afc1gr.toutiao15.com/updateGoods',item)
              .then(res=>{
                  console.log(res);
              })
              .catch(err=>{
                  console.log(err);
              })
          })
        }else{
          alert("地址为空，请填写收货地址！")
        }
      //this.$toast("点击按钮");
    },
    chooseAddr(){
      //跳转到地址页面，选择一个默认地址
      this.$axios.push("/address");
    }
  },
    beforeRouteLeave(to, from, next){
        //导航离开该组件的对应路由时调用
        if(this.showTip===true){
          //非正常退出，也就是还没有下单就想离开订单页面
          var yes = confirm("是否保存订单？");
          if(yes){
            this.createOrder("待付款");
                      //提交订单信息
            this.$axios.post("https://afc1gr.toutiao15.com/insertOrder",this.curOrder[0])
            .then(res=>{
              alert("保存成功，请于待付款订单中查找~");
              this.$router.push("/cart");
            })
            .catch(err=>{
              alert("保存失败！");
              console.log(err);
            });
            next();
          }
          else{
            next();
            console.log(to);
          }
        }else{//已经下过单了，可以直接跳转
          next();
        }
    },
computed: {
        submitBarText() {
            let count = 0;
            this.products.forEach((shop)=>{
                if(shop.isSelected) count++;
            })
            return '结算' + (count ? `(${count})` : '');
        },
        count(){
          let count = 0;
            this.products.forEach((shop)=>{
                if(shop.isSelected) count++;
            })
            return count;
        },
        totalPrice() {
            let total = 0;
            this.products.forEach((shop)=>{
                if(shop.isSelected) total += shop.cnum*shop.gprice;
            })
            return total*100;
        }
    },

    created(){
      this.$axios.get("https://afc1gr.toutiao15.com/getDefaultAddr")
      .then(res=>{
          //第一遍拿回来的数据是过期的
          this.address = res.data.result;
          //  console.log(this.address)
          if(this.address.length>=1){
            this.type = true;//有默认地址，就不显示添加地址
            //var addr = document.getElementById("addrInfo");
          }
          else{
            this.type = false;//否则需要添加地址
          }
          console.log(this.address);
      })
      .catch(err=>{
        console.log(err);
      })
      this.$axios.get("https://afc1gr.toutiao15.com/getOrderGoods")
      .then(res=>{
        //第一次获取的数据过时了
      })
      this.$axios.get("https://afc1gr.toutiao15.com/getOrderGoods")
      .then(res=>{
          this.products = res.data.result;
          //console.log(this.products);
      })
      .catch(err=>{
          console.log("下单商品获取失败",err)
      })
  }
};
</script>

<style scoped>
.order {
  font-size: 14px;
  background: #f7f7f7;
  .contact-card::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #3283fa 0,
      #3283fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #3283fa 0,
      #3283fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
  }
  .total {
    .van-cell__value {
      color: red;
    }
  }
  
  .van-submit-bar__bar {
    border-top: 1px solid #f7f7f7;
  }
  .additional {
    .van-cell {
      padding: 0 15px;
      font-size: 12px;
    }
    .van-cell__title {
      flex: 11;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-tag {
      line-height: 12px;
      margin-right: 5px;
    }
    
    .price {
      color: #e93b3d;
      font-size: 10px;
      span {
        font-size: 16px;
      }
    }
  }
}
.van-card__num {
    float: left;
}
</style>
