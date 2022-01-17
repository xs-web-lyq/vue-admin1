<template>
  <div>
      <h2>学生姓名：{{name | mySlice}}</h2>
      <h2>学生性别：{{sex}}</h2>
      <input type="text" v-fbind:value = "name">
  </div>
</template>

<script>
export default {
    name:'Student',
    data(){
        return {
          name:'刘永奇abc',
          sex:18
        }
    },
    
}
</script>

<style lang="less" scoped>
  div{
    background: pink;
    h2{
      color:blue
    }
  }
</style>