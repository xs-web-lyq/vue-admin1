<template>
  <div>
      <h1>{{school}}</h1>
      <h2>学生姓名：{{name}}</h2>
      <h2>学生性别：{{sex}}</h2>
      <h2>学生年龄：{{myAge+1}}</h2>
      <button @click="add">点我＋1</button>
  </div>
</template>

<script>
export default {
    name:'Student',
    data(){
        return {
          school:'河南理工大学',
          myAge:this.age,
        }
    },
    methods:{
      add(){
        this.myAge++
      }
    },
    // props:['name','sex','age'],//简单声明接受

    // 接受的同时对数据进行类型限制
    // props:{
    //   name:String,
    //   age:Number,
    //   sex:String
    // },

    // 接收时对数据，进行类型限制，默认值的指定，必要性的限制
    props:{
      name:{
        type:String, //name为字符串类型
        required:true,//name是必传的
      },
      age:{
        type:Number,
        default:99, //默认值
      },
      sex:{
        type:String,
        required:true
      }
    }
}
</script>

<style>

</style>