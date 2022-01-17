<template>
  <div class="todo-footer" v-show="todos.length">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="all"/> -->
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ todos.length }}
    </span>
    <button class="btn btn-danger" @click="handleClick">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos",'allTodo','deletoDoneTodo'],
  computed: {
    doneTotal(){
      const x = this.todos.reduce((pre,current)=>{

        return pre + (current.done ? 1 : 0)
      },0)
      return x
    },
    isAll:{
      get(){
        return this.doneTotal===this.todos.length &&this.todos.length>0
      },
      set(value){
        this.allTodo(value)
      }
    }
  },
  methods:{
    handleClick(){
      this.deletoDoneTodo()
    }
  }
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>