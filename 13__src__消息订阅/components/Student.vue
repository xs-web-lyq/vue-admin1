<template>
  <div>
      <h2>学生姓名：{{name}}</h2>
      <h2>学生性别：{{age}}</h2>
      <button @click="sendStudentName"> 发送姓名给兄弟组件School</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    name:'Student',
    data(){
        return {
          name:'刘永奇',
          age:18
        }
    },
    // mounted(){
    //   console.log(this.x);
    // },
    methods:{
      sendStudentName(){
        // this.$bus.$emit('hello',name)
        pubsub.publish('hello',666)
      }
    }
}
</script>

<style scoped>
  div{
    background: pink;
    padding:5px;
  }
</style>