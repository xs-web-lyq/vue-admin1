import VueRouter from "vue-router";

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
const router = new VueRouter({
    routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home
        }
    ]
})

export default router