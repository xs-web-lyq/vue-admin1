
<template>
  <div class="container">
    <Category title="美食">
      <img src="" alt="">
    </Category>
    <Category title="游戏">
      <ul>
        <li v-for="(item,index) in items.goods" :key="index">{{item}}</li>
      </ul>
    </Category>
    <Category title="电影">
      <video src=""></video>
    </Category>
  </div>
</template>

<script>
import Category from './components/Category.vue'

export default {
  name: "App",
  components:{
    Category
  },
  data(){
    return {
      items:{
        goods:['err','err','err']
      }
    }
  }
};
</script>
<style lang="css">
  .container{
    display:flex;
    justify-content:space-around;
  }
</style>