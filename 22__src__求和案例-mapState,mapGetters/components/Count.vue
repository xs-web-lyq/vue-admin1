<template>
  <div>
    <p>sum:{{ sum }}</p>
    <p>sum:{{ bigSum }}</p>
    <p>{{ school }}：{{name}}</p>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数时再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  name: "Count",
  data() {
    return {
      n: 1,
    }
  },
  computed:{
    // sum(){
    //   return this.$store.state.sum
    // },
    // school(){
    //   return this.$store.state.school
    // },
    // name(){
    //   return this.$store.state.name
    // }
    
    // 借助mapState生成计算属性，是state中读取数据.（对象写法）
    ...mapState({sum:'sum',school:'school',name:'name'}),
    
    // 借助mapState生成计算属性，是state中读取数据。（数组写法）
    // ...mapState(['sum','school','name']),

    // 借助mapGetters生成计算属性，是state中读取数据。（对象写法）
    ...mapGetters({bigSum:'bigSum'})
  },
  methods: {
    increment() {
      this.$store.commit('JIA',this.n)
    },
    decrement() {
      this.$store.commit('JIAN',this.n)
    },
    incrementOdd() {
      this.$store.dispatch('jiaOdd',this.n)
    },
    incrementWait() {
      this.$store.dispatch('jiaWait',this.n)
    },
  },
  mounted(){
      console.log('count',this);
  }
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>