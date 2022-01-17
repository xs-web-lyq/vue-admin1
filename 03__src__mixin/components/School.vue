<template>
  <div>

      <h2 @click="showName">学校名称：{{name}}</h2>
      <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
import {hunched} from '../mixin'

export default {
    name:'School',
    data(){
        return {
          name:'河南理工大学',
          address:'焦作',
        }
    },
      mixins: [hunched]


}
</script>

<style>

</style>