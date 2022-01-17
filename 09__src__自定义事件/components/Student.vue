<template>
  <div>
      <h2>学生姓名：{{name}}</h2>
      <h2>学生性别：{{age}}</h2>
      <button @click="sendStudentName">发送学生姓名</button>
      <button @click="unbind">解除事件getName绑定</button>
      <button @click="death">销毁组件</button>
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
    methods:{
      sendStudentName(){
        // 触发Student组件身上的getName事件
        this.$emit('getName',this.name,0,11,22)
        this.$emit('demo')
      },
      unbind(){
        // this.$off('getName')//只适合解绑一个事件
        // this.$off(['getName','demo'])//适合解绑多个事件
        this.$off();//全部解绑 
      },
      death(){
        this.$destroy()//销毁了当前Student组件的实例，销毁之后所有Student实例的自定义事件全部不生效
        
      }
    },

    
}
</script>

<style scoped>
  div{
    background: pink;
    padding:5px;
  }
</style>