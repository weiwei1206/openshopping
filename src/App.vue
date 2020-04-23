<template>
  <div id="app">
    <keep-alive :include="keepAlive">
    <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import './assets/style/common.css';

export default {
  name: 'app',
  data(){
    return {
      keepAlive:["order"]
    }
  }
}
</script>


