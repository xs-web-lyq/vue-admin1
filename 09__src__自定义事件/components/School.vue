<template>
  <div class="school">
      <h2>学校名称：{{name}}</h2>
      <h2>学校地址：{{address}}</h2>
      <button @click="sendSchoolName(name)">获得学校名</button>
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
    methods:{
      sendSchoolName(name){
        this.getSchoolName(name)
      }

    }


}
</script>

<style>
  .school{
    background-color:skyblue;
    padding:20px;
  }

</style>