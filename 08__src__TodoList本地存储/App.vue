<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addTodo="addTodo"/>
        <MyList :todos="todos" :deleteTodo="deleteTodo" :checkTodo="checkTodo"/>
        <MyFooter :todos="todos" :allTodo="allTodo" :deletoDoneTodo="deletoDoneTodo"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyFooter from "./components/MyFooter";
import MyHeader from "./components/MyHeader";
import MyList from "./components/MyList";

export default {
  name: "App",
  data(){
    return {
      todos:JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  components: {
    MyFooter,
    MyHeader,
    MyList,
  },
  methods:{
    addTodo(item){
      this.todos.unshift(item)
    },
    // 删除一项item
    deleteTodo(id){
      this.todos = this.todos.filter((item)=>{
        return item.id !== id;
      })
    },
    // 勾选or取消勾选一个item
    checkTodo(id){
      this.todos.forEach((item)=>{
        if(item.id === id){
          item.done = !item.done
        }
      })
    },
    // 全选或全部不选
    allTodo(checked){
      this.todos.forEach((item)=>{
        item.done = checked
      })
    },
    // 清除已完成
    deletoDoneTodo(){
      this.todos = this.todos.filter((item)=>{
        return item.done ===false
      })
    },
  },  
  watch:{
      todos:{
        deep:true,
        handler(value){
          localStorage.setItem('todos',JSON.stringify(value))
        }
      }
    }
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}



</style>
