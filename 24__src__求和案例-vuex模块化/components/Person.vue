<template>
  <div>
      <h2>人员列表</h2>
      <p>Count组件求和为：{{sum}}</p>
      <h3>列表中第一个人的名字是：{{firstPersonName}}</h3>
      <p>
          <input type="text" v-model="text">
          <button @click="ADD_PEROSN">添加</button>
          <button @click="addLiu">添加一个姓刘的人</button>
          <button @click="addPersonServer">添加一个随机的人</button>

      </p>
      <ul>
          <li v-for="person in persons" :key="person.id">{{person.name}}</li>
      </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {nanoid} from 'nanoid'
export default {
    name:'Person',
    data(){
        return {
            text:''
        }
    },
    computed:{
        // persons(){
        //     return this.$store.state.persons
        // },
        ...mapState('personAbout',['persons']),
        ...mapState('countAbout',['sum']),
        firstPersonName(){
            return this.$store.getters['personAbout/firstPersonName']
        }
    },
    methods:{
        // ...mapMutations(['ADD_PERSON'])
        ADD_PEROSN(){
            const personObj = {id:nanoid(),name:this.text}
            this.$store.commit('personAbout/ADD_PERSON',personObj)
            this.text = ''
        },
        addLiu(){
            const personObj = {id:nanoid(),name:this.text}
            this.$store.dispatch('personAbout/addPersonLiu',personObj)
            this.text = ''
        },
        addPersonServer(){
            this.$store.dispatch('personAbout/addPersonServer')
        }

    }
}
</script>

<style>

</style>