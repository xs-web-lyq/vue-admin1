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
           mounted(){
            // 因为pubsub是外部库，所以function(msgName,data)中this指向是undefined，可以将函数写成箭头函数解决此问题 。第一个参数为订阅名，第二个参数为数据
            this.pubId=pubsub.subscribe('hello',(msgName,data)=>{
                console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data);
            })
            },
        4.提供数据：pubsub.publish('xxx',数据)
        5.最好在beforeDestroy钩子中，用PubSub.unsubscribe(this.pubId)去取消订阅