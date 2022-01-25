import VueRouter from "vue-router";

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'
export default new VueRouter({
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                    path:'news',
                    component:News,
                },
                {
                    path:'message',
                    component:Message,
                    children:[
                        {   
                            name:'xiangqing',
                            path:'detail/:id/:message',
                            component:Detail,
                            // 第一种写法：props值为对象，该对象中所有key-value的组合最终都会通过props传递给Detail
                            // props:{a:900},

                            // 第二种写法：props值为布尔值，布尔值为true,则把路由收到的所有params参数通过props传递给Detail组件
                            // props:true,

                            // 第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传递给Detail组件
                            props(route){
                                return {
                                    // id:route.query.id,
                                    // message:route.query.message
                                    id:route.params.id,
                                    message:route.params.message
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
})

