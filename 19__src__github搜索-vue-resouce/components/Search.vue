<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyWord"
      />&nbsp;
      <button @click="handleClick">Search</button>
    </div>
  </section>
</template>

<script>
// import axios from 'axios'
import pubsub from 'pubsub-js'
export default {
  name: "Search",
  data(){
    return{
      keyWord:'',
    }
  },
 
  methods:{
    handleClick(){
      // 请求前更新List的数据
      // this.$bus.$emit('updateListDate',{isFirst:false,isLoading:true,errMsg:'',users:[]})
      
      // 消息发布
      pubsub.publish('updateListDate',{isFirst:false,isLoading:true,errMsg:'',users:[]})


      this.$http.get(`https://api.github.com/search/users?q=$(this.keyWord)`).then(
        response =>{
          console.log('请求成功');
          // this.$bus.$emit('updateListDate',{isFirst:false,isLoading:false,errMsg:'',users:response.data.items})
          pubsub.publish('updateListDate',{isFirst:false,isLoading:false,errMsg:'',users:response.data.items})

        },
        error =>{
          console.log('请求失败',error.massage);
              // this.$bus.$emit('updateListDate',{isFirst:false,isLoading:true,errMsg:error.massage,users:[]})
          pubsub.publish('updateListDate',{isFirst:false,isLoading:true,errMsg:error.massage,users:[]})

        }
      )
    }
  },
};
</script>
