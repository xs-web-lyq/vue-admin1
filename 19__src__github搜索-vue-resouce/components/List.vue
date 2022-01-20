<template>
  <div class="row">
    <div 
      class="card" 
      v-for="user in infos.users" 
      :key="user.login"
      v-show="users.length"
      >
      <a :href="user.html_url" target="_blank">
        <img src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
    <!-- 欢迎信息 -->
    <div v-show="infos.isFirst">welcome</div>
    <!-- 加载信息 -->
    <div v-show="infos.isLoading">正在加载...</div>
    <!-- 错误信息 -->
    <div v-show="infos.errMsg">{{infos.errMsg}}</div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "List",
  data(){
      return {
        infos:{
          isFirst:true,
          isLoading:false,
          users:[],
          errMsg:''
        }
      }

  },
  mounted(){
      // this.$bus.$on('updateListDate',(object)=>{
      //     this.infos = {...this.infos,...object}
      // })
      pubsub.subscribe('updateListDate',(_,object)=>{
         this.infos = {...this.infos,...object}
      })
  }
};
</script>

<style scoped>
.row {
  width: 100%;
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-top:1rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 29.6%;
  padding: 0.75rem;
  margin-left:0.5rem;
  margin-right:0.5rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>