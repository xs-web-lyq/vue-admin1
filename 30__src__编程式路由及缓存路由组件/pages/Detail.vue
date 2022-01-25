<template>
   <ul>
       <li>消息编号：{{$route.params.id}}</li>
       <li>消息标题：{{$route.params.message}}</li>
       <!-- <li>{{a}}</li> -->
   </ul>
</template>

<script>
export default {
    name:'Detail',
    props:['id','message'],
    mounted(){
        console.log(this.$route);
    }
}
</script>

<style>

</style>