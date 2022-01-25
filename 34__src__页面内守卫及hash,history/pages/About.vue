<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
    name:'About',
    
    // // 通过路由规则，进入该组件时被调用
    // beforeRouteEnter(to,from,next){
    //   console.log('About--beforeRouteEnter',to,from);
    //   if(to.meta.isAuth){ //判断路由是否需要进行权限控制
    //       if(localStorage.getItem('school') === "atguigu"){ //权限控制的具体规则
    //           next()
    //       }else{
    //           alert('学校名不对，无权限访问')
    //       }
    //   }else{
    //       next(); //放行
    //   }
    // },
    // // 通过路由规则，离开该组件时被调用
    // beforeRouteLeave(to,from,next){
    //   console.log('About--beforeRouteLeave',to,from);
    //   next();
    // }
}

</script>

<style>

</style>