<template>
  <div>
    <home-header />
    <page />
    <navigate />
  </div>
</template>

<script>
import navigate from '../components/footer/navigate.vue'
import page from './page/page.vue'
import homeHeader from '../components/header/homeHeader'

export default {
  components: {
    homeHeader,
    page,
    navigate
  }
}
</script>
<style>
</style>


