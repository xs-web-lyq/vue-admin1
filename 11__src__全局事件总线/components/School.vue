<template>
  <div class="school">
      <h2>学校名称：{{name}}</h2>
      <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>


export default {
    name:'School',
    props:['getSchoolName'],
    data(){
        return {
          name:'河南理工大学',
          address:'焦作',
        }
    },
    mounted(){
      // console.log(this.x);
      this.$bus.$on('hello',(data)=>{
        console.log('我是School组件，收到了数据',data);
      })
    },
    beforeDestroy(){
      this.$bus.$off('hello')
    }
}
</script>

<style>
  .school{
    background-color:skyblue;
    padding:20px;
  }

</style>