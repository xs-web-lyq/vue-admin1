<template>
  <div id="app">
    <Student name="刘永奇" :age="18" sex="男"/>
  </div>
</template>

<script>
import Student from './components/Student.vue'

export default {
  name: 'App',
  components: {
    Student
  },
}
</script>

<style>

</style>
