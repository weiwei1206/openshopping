<template>
<div>

    <headerNav title="我的地址"/>
    <van-address-list
  v-model="chosenAddressId"
  :class="isSelect?'':'hideselect'"
  :list="list"
  @add="onAdd"
  @edit="onEdit"
  @select="onSelect"
/>
</div>
</template>

<script>

import { GetAddressList } from "@/api/address";
import { AddressList } from 'vant';
import Bus from '@/page/user/address/bus.js'
export default {
    name:"addresslist",
    components:{
        [AddressList.name]:AddressList,
    },
    data() {
        return {
        chosenAddressId: '1',
        isSelect:false,
        list: [],
        }
    },

    methods: {
        onAdd() {
            this.$router.push('/user/address/edit')
        },

        onEdit(item, index) {
            this.$router.push('/user/address/edit?id='+item.id);
        },
        onSelect(item,index){
            if(!this.isSelect){
                return;
            }
            Bus.$emit('selectAddress',item);
            this.$router.go(-1);
        }
    },
    created:function(){
        this.chosenAddressId=this.$route.query.id;
        this.isSelect=this.$route.query.id>0;
        GetAddressList().then(response=>{
            let data = response.data.address_list
            this.list=data;
        })
    }

}
</script>

<style lang="less">
.hideselect{
    .van-radio__input{
        display: none;
    }
}
</style>
