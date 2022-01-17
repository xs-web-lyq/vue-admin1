<template>
  <div>
      <h2>学生姓名：{{name}}</h2>
      <h2>学生性别：{{age}}</h2>
      <button @click="sendStudentName(name)"> 发送姓名给兄弟组件School</button>
  </div>
</template>

<script>
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
      sendStudentName(name){
        this.$bus.$emit('hello',name)
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