import axios from 'axios'
import { nanoid } from 'nanoid'

export default  {
    namespaced:true,
    actions:{
        addPersonLiu(context,value){
            if(value.name.indexOf('刘') === 0){
                context.commit('ADD_PERSON',value)
            }else{
                alert('添加的人必须姓刘')
            }
        },
        addPersonServer(context){
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response =>{
                    context.commit('ADD_PERSON',{id:nanoid(),name:response.data})
                },
                err =>{
                    console.log('请求失败',err.message);
                }
            )
        }
    },
    mutations:{
        ADD_PERSON(state,value){
            state.persons.unshift(value)
        }
    },
    state:{
        persons:[
            {id:'001',name:'小刘'}
        ]
    },
    getters:{
        firstPersonName(state){
            return state.persons[0].name;
        }
    }
}