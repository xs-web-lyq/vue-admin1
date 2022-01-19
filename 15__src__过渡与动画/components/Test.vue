<template>
  <div>
      <button @click="handleClick">显示/隐藏</button>
      <!-- 给transition 起名字 -->
      <transition name="hello" appear>
        <h1 v-show="isShow">好久不见</h1>
      </transition>
      
  </div>
</template>

<script>
export default {
    name:'Test',
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
    .hello-enter-active{
        animation:love 1s;
    }
    .hello-leave-active{
        animation:love 1s reverse;
    }

    @keyframes love {
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0);
        }
    }
</style>