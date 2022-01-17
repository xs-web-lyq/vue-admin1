<template>
  <div class="app">
    <h2>{{msg}}</h2>{{studentName}}
    <!-- 通过父组件给子组件传递函数类型的props实现，子给父传递数据 -->
    <School :getSchoolName="getSchoolName"/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现，子给父传递数据（第一种方式@和v-on -->
    <!-- <Student @getName="getStudentName" @demo="a"/> -->

    <!-- 通过父组件给子组件绑定一个自定义事件实现，子给父传递数据（第一种方式使用 ref -->
    <Student ref="student" @click.native="show"/>
    
  </div>
</template>

<script>
import Student from './components/Student.vue'
import School from './components/School.vue'

export default {
  name: 'App',
  data(){
    return {
      msg:'你好啊',
      studentName:''
    }
  },
  components: {
    Student,
    School
  },
  methods:{
    getSchoolName(name){
      console.log(name);
      
    },
    getStudentName(value,...params){
      console.log(value,params);
      this.studentName = value
    },
    a(){
      console.log('a事件被触发');
    },
    show(){
      alert('1233')
    }
  },
  mounted(){
  //   // 完成其他需求
    setTimeout(()=>{
      this.$refs.student.$on('getName',this.getStudentName)//绑定自定义事件
      // this.$refs.student.$once('getName',this.getStudentName)
    },3000)
  }
}
</script>

<style>
    .app{
      background:rgb(117, 114, 114);
    }

</style>
