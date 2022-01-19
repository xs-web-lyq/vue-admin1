<template>
  <ul class="todo-main">
    <transition-group name="item" appear>
      <MyItem v-for="item in todos" :key="item.id" :item="item" />
    </transition-group>
  </ul>
</template>

<script>
import MyItem from "./MyItem";
export default {
  name: "MyList",
  props: ["todos"],
  components: {
    MyItem,
  },
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
.item-enter-active {
  animation: love 1s;
}
.item-leave-active {
  animation: love 1s reverse;
}

@keyframes love {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>