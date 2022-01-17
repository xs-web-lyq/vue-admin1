<template>
  <div id="app">
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
    <School ref="sch"/>
  </div>
</template>

<script>
import School from './components/School.vue'

export default {
  name: 'App',
  components: {
    School
  },
  data(){
    return {
      msg:'欢迎来到我的世界',
    }
  },
  methods:{
    showDOM(){
      console.log(this.$refs);//真实的DOM元素
      console.log(this.$refs.sch);//School组件的实例对象（vc）
    }
  }
}
</script>

<style>

</style>
