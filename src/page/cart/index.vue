<template>
  <div class="card">
    <headerNav title="购物车"/>
       <van-cell  value="编辑商品" class="head">
        <template slot="title">
          <van-checkbox v-model="checkedAll" @change="allChecked(checkedAll)" >全选</van-checkbox>
        </template>
      </van-cell>
      <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <div class="promotion-group">
        <div  v-for="(item,index) in goods"
          :key="index" class="card-goods__item"> 
          <mt-switch v-model="item.isSelected"></mt-switch> 
              

          <product-card :product='item' :iscard='true' >
            <template slot>
              <van-cell @click="delGoods(item, index)" value="删除" >
                  <template slot="title">
                      <van-tag type="danger">促销</van-tag>
                      <span class="van-cell-text" >满60元减5元</span>
                  </template>
              </van-cell>
            </template>
          </product-card>
        </div>
        </div>
        
    </van-checkbox-group>
    
    <div style="height:50px;"></div>
        <van-submit-bar
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
        >
        <template slot>
        <van-checkbox v-model="checkedAll" >全选</van-checkbox>
        </template>
        </van-submit-bar>
    </div>
</template>

<script>
export default {
    name:"Cart",
    data() {
    return {
      showTips:true,//默认离开时提示：确认离开吗？提交订单时不提示
      checkedAll:false,
      checkedGoods: ['1', '2', '3'],
      goods: [{
        gid: '1',
        title: '一个大香蕉',
        desc: '3.18kg/件',
        gprice: 200.00,
        cnum: 1,
        gstore: 5,
        isSelected:false,
        imageURL: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
      }, {
        gid: '2',
        title: '陕西蜜梨',
        desc: '约600g',
        gprice: 690.00,
        cnum: 1,
        gstore: 20,
        isSelected:false,
        imageURL: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg',
      }, {
        gid: '3',
        title: '美国伽力果',
        desc: '约680g/3个',
        gprice: 2680.00,
        cnum: 1,
        gstore: 20,
        isSelected:false,
        imageURL: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
      }]
    };
  },
    beforeRouteLeave(to, from, next){
        //导航离开该组件的对应路由时调用
        if(this.showTips===true){
            let res = confirm("确定要离开吗？");

            if(res){
                //保存用户编辑数据
                let obj = {};
                this.goods.forEach((shop)=>{
                    this.$axios.put('https://afmva1.toutiao15.com/updateGoods',shop)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                })
                next();
            }else{
                next(false);
            }
        }else{
            this.goods.forEach((shop)=>{//先保存当前商品数据
                    this.$axios.put('https://afmva1.toutiao15.com/updateGoods',shop)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                })
            next();
        }
    },
    computed: {
        submitBarText() {
            let count = 0;
            this.goods.forEach((shop)=>{
                if(shop.isSelected) count++;
            })
            return '结算' + (count ? `(${count})` : '');
        },
        totalPrice() {
            let total = 0;
            this.goods.forEach((shop)=>{
                if(shop.isSelected) total += shop.cnum*shop.gprice;
            })
            return total*100;
        }
    },
    methods:{
        onSubmit() {
            this.showTips = false;
            this.$router.push('/order')
        },
        allChecked(checkedAll){
            if(checkedAll===true){
                this.goods.forEach((shop)=>{
                     shop.isSelected=true;
                })
            }else{
                this.goods.forEach((shop)=>{
                    shop.isSelected=false;
                })
            }
        },
        delGoods(item, index){
            let res = confirm("确认要删除吗？")
            if(res){
                item.cnum=0;
                //删除数据
                console.log(item);
                this.$axios.put('https://afmva1.toutiao15.com/updateGoods',item)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                this.goods.splice(index,1);
            }
        },
        selectOne(item){
          
        }
    },
    created(){
        this.$axios.get("https://afmva1.toutiao15.com/getGood")
        .then(res=>{
            this.goods = res.data.result;
            //GoodsTool.saveGoods(this.shopCart);
            
            //给数组元素添加属性
            /*for(var i=0;i<this.goods.length;i++){
                let shop = this.goods[i];
                let num = goods[shop.gid];
                if(num){
                    //如果数据不完整的情况下要添加属性，需要手动通知vue完成响应
                    this.$set(shop,'num',num);
                    this.$set(shop,'isSelected',true)
                }
            }*/
        })
        .catch(err=>{
            console.log("购物商品获取失败",err)
        })
    }
}
</script>

<style lang="less">
.card-goods {
  font-size: 12px;
  &__item {
    position: relative;
    .van-checkbox{
      width: 20px;
      height: 20px;
      top: 40px;
      left: 5px;
      z-index: 1;
      position: absolute;
    }
    .additional{
      width: 100%;
        padding-left: 15px;
    box-sizing: border-box;
    }
  }
}
.head{
      padding-left: 5px;
  border-bottom: 1px solid #eee;
}
.card{
  background: #f7f7f7;
  .van-submit-bar__bar {
      border-top: 1px solid #f7f7f7;
      .van-checkbox{
        padding-left: 5px;
      }
  }
  .promotion{
      .van-tag {
          line-height: 12px;
          margin-right: 5px;
      }
      .van-cell__title{

      flex: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }
    }
    .promotion-group{
      margin-top: 10px;
      box-shadow: 5px 5px 5px #e5e5e5;
    }
}

    
</style>