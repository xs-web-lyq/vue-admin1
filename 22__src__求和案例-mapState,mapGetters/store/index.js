
// 引入Vue核心库
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 应用Vuex
Vue.use(Vuex)

// 准备actions对象--响应组件中用户的动作
const actions = {
    jiaOdd(context,value){
        if(context.state.sum % 2){
            context.commit('JIA',value)
        }
    },
    jiaWait(context,value){
        setTimeout(()=>{
            context.commit('JIA',value)
        },500)
    }
}
// 准备mutations对象--修改state中数据
const mutations = {
    JIA(state,value){
        state.sum +=value
    },
    JIAN(state,value){
        state.sum -=value
    }
}
// 准备state对象--保存具体的数据
const state = {
    sum : 0,
    school:'河南理工大学',
    name:'刘'
}
// 准备getters
const getters = {
    bigSum(state){
        return state.sum * 10
    }
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})