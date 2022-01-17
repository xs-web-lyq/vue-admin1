<template>
  <div class="app">
    <h2>{{msg}}</h2>
    <School/>
    <Student />
  </div>
</template>

<script>
import Student from './components/Student.vue'
import School from './components/School.vue'

export default {
  name: 'App',

  components: { Student, School},  
  data(){
    return {
      msg:'你好啊',
    }
  },
}
</script>

<style>
    .app{
      background:rgb(117, 114, 114);
    }

</style>
