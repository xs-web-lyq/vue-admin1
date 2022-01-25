import VueRouter from "vue-router";

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'
const router =  new VueRouter({
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About,
            meta:{title:'关于'}
        },
        {
            name:'zhuye',
            path:'/home',
            component:Home,
            meta:{title:'首页'},
            children:[
                {
                    name:'xinwen',
                    path:'news',
                    component:News,
                    meta:{isAuth:true,title:'新闻'},
                },
                {
                    name:'xiaoxi',
                    path:'message',
                    component:Message,
                    meta:{isAuth:true,title:'消息'},
                    children:[
                        {   
                            name:'xiangqing',
                            path:'detail/:id/:message',
                            component:Detail,
                            meta:{title:'详情'},
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


// 全局前置路由守卫,初始化时执行，每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
    console.log('前置路由守卫',to,from);
    if(to.meta.isAuth){ //判断路由是否需要进行权限控制
        if(localStorage.getItem('school') === "atguigu"){ //权限控制的具体规则
            next()
        }else{
            alert('学校名不对，无权限访问')
        }
    }else{
        next(); //放行
    }
})

// 后置路由守卫，初始化时执行，每次路由切换后执行
router.afterEach((to,from)=>{
    console.log('后置路由守卫',to,from);
    document.title = to.meta.title
})

export default  router