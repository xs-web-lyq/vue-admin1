/* eslint-disable no-prototype-builtins */
<template>
  <li>
    <label>
      <input type="checkbox" :checked="item.done" @click="handleClick(item.id)"/>
      <!-- 如下代码也可以实现效果，但是不推荐 -->
      <!-- <input type="checkbox" v-model="item.done"/> -->
      <span v-show="!item.isEdit">{{item.name}}</span>
      <input 
        type="text" 
        v-show="item.isEdit"
        :value ="item.name"
        @blur="handleBlur(item,$event)"
        ref="inputName"
      >
    </label>
    <button class="btn btn-danger"  @click="deleteItem(item.id)">删除</button>
    <button class="btn btn-edit" @click="handleEdit(item)" v-show="!item.isEdit">编辑</button>
  </li>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "MyItem",
  props:['item'],
  methods:{
    deleteItem(id){
      // if(confirm('确定删除吗？')) this.$bus.$emit('deleteTodo',id)
      if(confirm('确定删除吗？')) pubsub.publish('deleteTodo',id)
    },
    handleClick(id){
      this.$bus.$emit('checkTodo',id)
    },
    handleEdit(item){
      // eslint-disable-next-line no-prototype-builtins
      if(item.hasOwnProperty('isEdit')){
        item.isEdit = true
      }else{
        this.$set(item,'isEdit',true)
      }
      this.$nextTick(function(){
        this.$refs.inputName.focus()
      })
      
    },
    handleBlur(item,e){
      item.isEdit = false
      if(!e.target.value.trim()) return alert('输入不能为空')
      this.$bus.$emit('updateItem',item.id,e.target.value)
      
    }
  }
};
</script>

<style scoped>
  /*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover{
  background: rgb(212, 206, 206);
}
li:hover button{
  display:block;
}
</style>