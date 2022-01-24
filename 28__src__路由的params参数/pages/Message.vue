<template>
   <div>
        <ul>
            <li v-for="item in messageList" :key="item.id">
                <!-- 跳转路由并携带params参数，to的字符串写法 -->
                <!-- <router-link :to="`/home/message/detail/${item.id}/${item.message}`">{{item.message}}</router-link> -->

                <!-- 跳转路由并且带qarams参数，to的对象写法 -->
                <router-link :to="{
                    name:'xiangqing',//必须使用name进行标识，不能使用path
                    params:{
                        id:item.id,
                        message:item.message
                    }
                }">
                    {{item.message}}
                </router-link>

                <!-- 固定数据 -->
                <!-- <router-link to="/home/message/detail?id=001&message=abc">
                    {{item.message}}
                </router-link> -->
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name:'Message',
    data(){
        return {
            messageList:[
                {id:'001',message:'详情一'},
                {id:'002',message:'详情二'},
                {id:'003',message:'详情三'}
            ]
        }
    },
    mounted(){
        console.log(this.$route);
    }
}
</script>

<style>

</style>