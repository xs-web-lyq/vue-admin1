<template>
  <div>
      <h2 @click="showName">学生姓名：{{name}}</h2>
      <h2>学生性别：{{sex}}</h2>
  </div>
</template>

<script>
import {hunched,hunched2} from '../mixin'
export default {
    name:'Student',
    data(){
        return {
          name:'刘永奇',
          sex:18
        }
    },
    mixins: [hunched,hunched2]
}
</script>

<style>

</style>