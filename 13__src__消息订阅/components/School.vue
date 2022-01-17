<template>
  <div class="school">
      <h2>学校名称：{{name}}</h2>
      <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'

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
      // // console.log(this.x);
      // this.$bus.$on('hello',(data)=>{
      //   console.log('我是School组件，收到了数据',data);
      // }),

      // 因为pubsub是外部库，所以function(msgName,data)中this指向是undefined，可以将函数写成箭头函数解决此问题
      this.pubId=pubsub.subscribe('hello',(msgName,data)=>{
        console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data);
      })
    },
    beforeDestroy(){
      // this.$bus.$off('hello')
      this.unsubscribe(this.pubId)

    }
}
</script>

<style>
  .school{
    background-color:skyblue;
    padding:20px;
  }

</style>