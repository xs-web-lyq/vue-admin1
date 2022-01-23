#vue2学习笔记

## Vue.config.js配置文件
>使用vue inspect > output.js 可以查看Vue脚手架的默认配置
>使用Vue.config.js 可以对脚手架进行个性化订制。详情见：https://cli.vuejs.org/zh


## ref属性
   1. 被用来给元素或子组件注册引用信息（id的替代者）
   2. 应用在html标签上获取的真实DOM元素，应用在组件标签上是组件实例对象(vc)
   3. 使用方法：
        打标识：<h1 v-text="msg" ref="title"></h1>
        获取： this.$refs.xxx

## 配置项props
    功能：让组件接收外部传过来的数据
    1. 传递数据：
        <Student name="刘永奇" :age="18" sex="男"/>
    2. 接收数据：
        第一种方式（只接受）
            props:['name']
    
        第二种方式（限制类型）
            props:{
                name:String
            }
        第三种方式（限制类型，限制必要性，指定默认值）
            props:{
                name:{
                    type:String,
                    required:true //必要性
                    default:'刘永奇' //默认值
                }
            }
        备注： 
            props 是只读的，Vue底层会检测你对props的修改，如果进行了修改，就会发出警告
            如果业务需求需要修改，那么可以复制props的内容到data中一份然后去修改data中的数据


## mixin(混入)
    功能：可以把几个组件共有的配置提取出来为一个混入对象
    使用方法： 
        第一步定义混入，例如：
            {
                data(){
                    ....
                },
                methods:{
                    ...
                }
            }
        第二步使用混入，例如：
            1.全局混入，：Vue.mixin(xxx)
            2.局部混入：mixin：['xxx']

## 插件

    功能：用于增强Vue
    本质：包含install = function(Vue,options){
        //1.添加全局过滤器
            Vue.filter(...)
        //2.添加全局指令
            Vue.directive(...)
        //3.配置全局混入
            Vue.mixin(...)
        //4.添加实例方法
            Vue.prototype.$myMethod = function(){...}
            Vue.prototype.$myProperty = xxx
    
        使用插件：Vue.use()
    }

## scoped样式
```js
作用：让样式局部生效，防止冲突
写法：<style scoped>
```


## 总结TodoList案例
    1. 组件化编程流程：
        1.拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突
        2.实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用
            （1）.一个组件再用，放在组件本身即可
            （2）.一些组件再用，放在他们共同的父组件上（状态提升）。
        3.实现交互：从绑定事件开始
    2.props适用于：
        1. 父组件==》子组件通信
        2. 子组件==》父组件通信（要求先给子组件一个函数）
    3.使用v-model 时切记： v-model绑定的值不能时props传递过来的值，因为props是不可以修改的！
    4.props传递过来的若是对象的值，修改对象中的属性是Vue不会报错，但不推荐这样做




## webStorage:
    1.存储内存大小一般支持5MB左右（不同浏览器不同）
    2.浏览器通过localStorage 和sessionStorage 属性实现本地存储机制
    3.相关API：
        1.xxxxStorage.setItem('key','value');
            该方法接收一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其相应的值
        2.JSON.stringify(sessionStorage.getItem('person'))
            该方法接收一个键名作为参数，返回键名相对应的值
        3.sessionStorage.removeItem('person')
            该方法接收一个键名作为参数，并把该键名从存储中删除
        4.sessionStorage.clear()
            该方法会清空存储中的所有数据
    
    4.备注：
        1.SessionStorage中存储的内容会随着浏览器窗口关闭而消失
        2.LocalStorage存储的内容，需要手动清除才会消失
        3.xxxxStorage.getItem(xxx)如果xxx对应的value获取不到,那么getItem的返回值是null
        4.JSON.parse(null)的结果还是null


## 组件的自定义事件：
    1.一种组件间的通信方式，适用于：子组件 ==》 父组件
    2.使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）
    3.绑定自定义事件：
    
        1.第一种方法，在父组件中：<!-- <Student @getName="getStudentName" @demo="a"/> -->
        2.第二种方法，在父组件中：
            Student ref="student" @click.native="show"/>
            ....
            mounted(){
                this.$refs.xxx.$on('getName',this.text)
            }
        3.若想让自定义事件只能触发一次，可以使用once修饰符 或者 $once方法
    4.触发自定义事件：this.$emit('getName',数据)
    5.解绑自定义事件：this.$off('getName')
    6.组件上也可以绑定原生DOM事件，需要使用native修饰符
    7.注意：通过this.$refs.xxx.$on('getName',回调)绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题

## 全局事件总线（GlobalEventBus）
    1.一种组件间的通信方式，适用于任何组件间通信。
    2.安装全局事件总线：
        new Vue({
            ......
            beforeCreate(){
                Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
            }
            ......
        })
    3.使用事件总线：
        1.接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身，
            methods:{
                demo(data){......}
            }
            .....
            mounted(){
                this.$bus.$on('xxx',this.demo)
            }
        2.提供数据： this.$bus.$emit('xxx',数据)
    4.最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

## 消息订阅与发布（pubsub）
    1.一种组件间通信的方式，适用于任意组件间通信
    2.使用步骤：
        1.安装pubsub:npm i pubsub-js
        2.引入：import pubsub from 'pubsub-js'
        3.接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件本身
        `
           mounted(){
            // 因为pubsub是外部库，所以function(msgName,data)中this指向是undefined，可以将函数写成箭头函数解决此问题 。第一个参数为订阅名，第二个参数为数据
            this.pubId=pubsub.subscribe('hello',(msgName,data)=>{
                console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data);
            })
            },
        `
        4.提供数据：pubsub.publish('xxx',数据)
        5.最好在beforeDestroy钩子中，用PubSub.unsubscribe(this.pubId)去取消订阅

## nextTick:
    1.语法：this.$nextTick(回调函数)
    2.作用：在下一次DOM更新结束之后执行其指定回调
    3.什么时候用：当改变数据后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

## Vue封装的过度与动画

1. 作用：在插入，更新或者移除DOM元素时，在适合的时候给元素添加样式类名
2. 图示：

![Transition Diagram](../../../Pictures/Saved Pictures/transition.png)

​	3.写法：

​			1.准备好样式:

- 元素进入的样式：

​				1.v-enter:进入的起点

​				2.v-enter-active:进入过程中

​				3.v-enter-to:进入终点

- 元素离开样式：

  ​      1.v-leave:离开的起点

  ​		2.v-leave-active:离开过程中

  ​		3.v-leave-to:离开的终点

  ​	2.使用<transition>包裹的要过度的元素，并配置name属性：

  ```
     <transition name="hello" appear>
  
  ​    <h1 v-show="isShow">好久不见</h1>
  
     </transition>
  ```

  ​	3.备注：若有多个元素需要过渡，则需要使用<transition-group>,且每个元素都要指定key值

   	
## Vue脚手架配置代理：
#### 方法一：

在Vue.config.js 中添加如下配置：

```
    devServer: {
        proxy: 'http://localhost:5000'
      },
```

说明：

​	1.优点：配置简单，请求资源时直接发给前端（8080）即可。

​	2.缺点：不能配置多个代理，不能灵活的控制请求是否走代理。

​	3.工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器，（优先匹配前端资源）

#### 方法二

​	编写Vue.config.js配置具体代理规则：

```vue
 devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            pathRewrite:{'^/api':''},
            ws: true, //用于支持websocket
            changeOrigin: false //用于控制请求头中的host值
          },
          '/love': {
            target: 'http://localhost:5001',
            pathRewrite:{'^/love':''},
            ws: true, //用于支持websocket
            changeOrigin: false //用于控制请求头中的host值
          },
      changeOrigin设置为true时，服务器收到请求头中的host为，localhost:5000      		 changeOrigin设置为false时，服务器收到请求头中的host为，localhost:8080
      changeOrigin默认值为true
```

说明：

​	1.优点：可以配置多个代理，且可以灵活的控制是否走代理。

​	2.缺点：配置略微繁琐，请求资源时必须添加前缀



## Vuex

​	1.概念

​			在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读写），也是一种组件间的通信方式，且适用于任意组件间通信

​	2.什么时候使用

​			多个组件需要共享数据时

3. 搭建Vuex环境

   1. 创建文件：src/store/index.js

      ```vue
      
      // 引入Vue核心库
      import Vue from 'vue'
      // 引入vuex
      import Vuex from 'vuex'
      // 应用Vuex
      Vue.use(Vuex)
      
      // 准备actions对象--响应组件中用户的动作
      const actions = {}
      // 准备mutations对象--修改state中数据
      const mutations = {}
      // 准备state对象--保存具体的数据
      const state = {}
      
      // 创建并暴露store
      export default new Vuex.Store({
          actions,
          mutations,
          state
      })
      ```

      2.在main.js中创建vm时传入store配置项

      ```
      // 引入vue
      import Vue from 'vue'
      // 引入app组件
      import App from './App.vue'
      // 引入store，因为在引入store时，./store/index文件内使用了Vuex所以将Vuex的引用放在了./store/index文件内
      import store from './store/index'
      
      
      Vue.config.productionTip = false
      
      new Vue({
        render: h => h(App),
        store,
        beforeCreate(){
          Vue.prototype.$bus = this
        }
      }).$mount('#app')
      ```

      

4.基本使用：

​					1.初始化数据，配置actions，配置mutations,操作文件store.js

​							

```vue

// 引入Vue核心库
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 应用Vuex
Vue.use(Vuex)

// 准备actions对象--响应组件中用户的动作
const actions = {
	//响应组件中的动作，在actions中处理逻辑
    jiaOdd(context,value){
        if(context.state.sum % 2){
            context.commit('JIA',value)
        }
    },
}
// 准备mutations对象--修改state中数据
const mutations = {
	//执行修改操作
    JIA(state,value){
        state.sum +=value
    },
}
// 准备state对象--保存具体的数据
const state = {
    sum : 0
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

​						2.组件中读取vuex中的数据：$store.state.sum

​						3.组件中修改vuex中的数据：**$store.dispatch('actions中的方法名',数据)**或								$store.commit('mutations中的方法名',数据)

​						备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions,即不写dispatch,直									接编写commit			

5.getters的使用

​		1.概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

​		2.在store.js中追加getters配置

```vue
......
// 准备getters
const getters = {
    bigSum(state){
		//注意要写返回值
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
```

​		3.组件中读取数据：$store.getters.bigSum

6.四个map方法的使用

​	1.mapState方法：用于帮助我们映射state中的数据为计算属性

```
  computed:{

    // 借助mapState生成计算属性，是state中读取数据.（对象写法）
    ...mapState({sum:'sum',school:'school',name:'name'}),
    
    // 借助mapState生成计算属性，是state中读取数据。（数组写法）
    // ...mapState(['sum','school','name']),
  },
```

​	2.mapGetters方法：用于帮助我们映射getters中的数据为计算属性

```
  computed:{

    // 借助mapGetters生成计算属性，是state中读取数据。（对象写法）
    ...mapGetters({bigSum:'bigSum'})
  },
```

​	3.mapActions方法：用于帮助我们生成与actions对话的方法，即：包括$store.dispatch(xxx)的函数

```
  methods: {
    // incrementOdd() {
    //   this.$store.dispatch('jiaOdd',this.n)
    // },
    // incrementWait() {
    //   this.$store.dispatch('jiaWait',this.n)
    // },

    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
  },
```

​	4.mapMutations方法：用于帮助我们生成与mutations对话的方法，即：包含$store.commit(xxx)的函数

```
  methods: {
    // increment() {
    //   this.$store.commit('JIA',this.n)
    // },
    // decrement() {
    //   this.$store.commit('JIAN',this.n)
    // },

    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),
  },
```

备注：mapActions与Mutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数就是事件对象

##### 7.模块化+命名空间

​	1.目的：让代码更好维护，让更多数据分类更加明确。

​	2.修改：store.js

```
const countAbout = {
	namespaced:true, //开启命名空间
	state:{x:1},
	mutations:{...},
	actions:{...},
	getters:{
		bigSum(state){
			return state.sum * 10;
		}
	}
}
const personAbout = {
	namespaced:true, //开启命名空间
	state:{...},
	mutations:{...},
	actions:{...}
}
const store = new Vue.Store({
	modules:{
		countAbout,
		personAbout
	}
})
```

​	3.开启命名空间后，组件中读取state数据

```
//方法一：自己直接读取
this.$store.state.personAbout.persons
//方法二：借助mapState读取
...mapState('countAbout',['sum','school','name'])
```

​	4.开启命名空间后，组件中读取getters数据：

```
//方法一：自己直接读取
this.$store.getters['personAbout/persons']
//方法二：借助mapGetters
...mapGetters('countAbout',['bigSum'])
```

​	5.开启命名空间后，组件中调用dispatch：

```
//方法一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonLiu',person)
//方法二：组件mapActions:
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

​	6.开启命名空间后，组件中调用commit：

```
//方法一：自己直接commit:
this.$store.commit('personAbout/ADD_PERSON',person)
//方法二：组件中调用mapMutations:
...mapMutations('personAbout',{increment:'JIA',decrement:'JIAN'})
```

