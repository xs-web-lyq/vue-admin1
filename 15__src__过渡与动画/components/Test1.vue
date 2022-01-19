<template>
  <div>
      <button @click="handleClick">显示/隐藏</button>
      <!-- 给transition 起名字 -->
      <!-- transition-group可以对多个元素添加过度，但每个元素都要有key值，可以在多个元素外包裹一个壳子但对交叉显示元素时不适用 -->
      <transition-group name="hello" appear>
        <h1 v-show="!isShow" key="1">好久不见</h1>
        <h1 v-show="isShow" key="2">好久不见</h1>
      </transition-group>
      
  </div>
</template>

<script>
export default {
    name:'Test1',
    data(){
        return {
            isShow:true
        }
    },
    methods:{
        handleClick(){
            this.isShow = !this.isShow
        }
    }

}
</script>

<style scoped>
    h1{
        background-color:orange;
    }
    .hello-enter,.hello-leave-to{
        transform: translateX(-100%);
    }
    .hello-enter-active,.hello-leave-active{
        transition: 1s linear;
    }
    .hello-enter-to,.hello-leave{
        transform: translateX(0);
    }

</style>