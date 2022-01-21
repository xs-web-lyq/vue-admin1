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
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数时再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "Count",
  data() {
    return {
      n: 1,
    }
  },
  computed:{

    // 借助mapState生成计算属性，是state中读取数据.（对象写法）
    ...mapState({sum:'sum',school:'school',name:'name'}),
    
    // 借助mapState生成计算属性，是state中读取数据。（数组写法）
    // ...mapState(['sum','school','name']),

    // 借助mapGetters生成计算属性，是state中读取数据。（对象写法）
    ...mapGetters({bigSum:'bigSum'})
  },
  methods: {
    // increment() {
    //   this.$store.commit('JIA',this.n)
    // },
    // decrement() {
    //   this.$store.commit('JIAN',this.n)
    // },

    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),


    // incrementOdd() {
    //   this.$store.dispatch('jiaOdd',this.n)
    // },
    // incrementWait() {
    //   this.$store.dispatch('jiaWait',this.n)
    // },

    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
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