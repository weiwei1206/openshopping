<template>
    <div>
      <headerNav title="登录"/>
      <div>
          <div class="img"></div>
          <div style="padding-top: 70px;">
            <van-cell-group>
                <van-field
                    placeholder="请输入用户名"
                    v-model="account"
                />
                <van-field
                    type="password"
                    placeholder="请输入密码"
                     v-model="password"
                />
            </van-cell-group>
            <div style="margin: 10px;">
                <van-button size="large" type="primary" style="height: 45px;line-height:45px;" @click="login">登录</van-button>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import {login} from '@/api/user'
export default {
    data(){
        return {
            account:null,
            password:null
        }
    },
    methods: {
      login(){
          login(JSON.stringify({account:this.account,password:this.password})).then(Response=>{
              let data = Response
              if(data.data == false){
                   this.$toast(data.msg);
                   return false
              }else{
                  this.$toast(data.msg);
                this.$router.push({
                    path:'/home'
                })
              }
              
          })
      }  
    },
}
</script>

<style>
.img{
    background:url('./passwordimg.jpg')  no-repeat;
    width: 100px;
    height: 100px;
    margin: 0 auto;
}
</style>
