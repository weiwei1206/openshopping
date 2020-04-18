<template>
    <van-cell-group class="additional">
        <van-card
        :title="product.title"
        :desc="product.desc"
        :num="(iscard?null:product.cnum)"
        style="background:#fff"
        >
            <template slot="thumb">
                <img :src="product.gpic_small" />
            </template>
            <template slot="tags">
                <p class="price" v-if="product.gprice>0" >
                    ￥<span>{{product.gprice}}</span>
                    <van-tag v-for="tag in product.tags" :key="tag" plain type="danger">{{tag}}</van-tag>
                </p>
            </template>
        </van-card>
        <slot />
    </van-cell-group>
</template>

<script>
export default {
    name:'order-card',
    props:{
        product:Object,
        iscard: {
            type: Boolean,
            default: false
        },
    },
    methods:{
        changeHandle(product){
        }
    }
}
</script>

<style scoped>
.additional img{
    height: 90px;
    width: 90px;
}
.van-cell{
    padding: 0 15px;
    font-size: 12px;
}
.van-card__title{
    font-size: 14px;
}
.van-cell:not(:last-child)::after{
    border:0;
}
.van-cell_title{
    flex: 10;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.van-tag{
    line-height: 12px;
    margin-right: 5px;
}
.additional p{
    color: #e93b3d;
    font-size: 16px;
    overflow: hidden;
    height: 18px;
}
.span{
    font-size: 16px;
    margin-right: 5px;  
}
.additional.price van-tag{
    font-size: 12px;
}
.van-stepper_{
    position: absolute;
    bottom: 5px;
    right: 5px;
}
.van-stepper__plus{
    width: 30px;
}
.van-stepper__minus{
    width: 30px;
}
.image_tag{
    position: absolute;
    bottom: 0;
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: #fff;
    text-align: center;
    background-color: rgba(0,0,0,.7);
}
.additional::after{
    border-color: #f7f7f7;

}

.van-card__num {
    float: left;
}
</style>
