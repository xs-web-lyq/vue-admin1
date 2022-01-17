<template>
  <div>

      <h2>学校名称：{{name}}</h2>
      <h2>学校地址：{{address}}</h2>
      <button @click="hello">hello</button>
  </div>
</template>

<script>


export default {
    name:'School',
    data(){
        return {
          name:'河南理工大学',
          address:'焦作',
        }
    },


}
</script>

<style>

</style>