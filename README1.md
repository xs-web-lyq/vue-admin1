## 插槽

​	1.作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间的通信方式，适用于**父组件 ===》子组件**

​	2.分类：默认插槽，具名插槽，作用域插槽

​	3.使用方式：					

```
		1.默认插槽：
父组件中：
	<Category title="电影">
      <video src=""></video>
    </Category>
子组件中：
    <template>
      <div class="category">
          <h3>{{title}}</h3>
          <!-- 定义一个插槽 -->
          <slot>我是默认值，当使用者没有传递具体结构时，我会显示</slot>
      </div>
    </template>
```

​				2.具名插槽：

```vue
父组件中：
	<Category title="电影">
		<template slot="center">
			 <video src=""></video>
		</template>
     	<template v-slot="footer">
			 <video src=""></video>
		</template>
    </Category>
子组件中：
	<template>
      <div class="category">
          <h3>{{title}}</h3>
          <!-- 定义一个插槽 -->
          <slot name="center">我是默认值，当使用者没有传递具体结构时，我会显示</slot>
          <slot name="footer">我是默认值，当使用者没有传递具体结构时，我会显示</slot>
      </div>
    </template>
```

​					3.作用域插槽:

​									1.理解：**数据在组件的自身，但根据组件生成的结构需要组件的使用者来决定，**

（games数据在Category组件中，但使用在数据所遍历出来的结构由app组件决定）

```vue
父组件中：
	<Category title="游戏">
	//作用域插槽在app中html结构必须在<template scope="goods">标签内通过scope接收数据
      <template scope="goods">
        <ul>
          <li v-for="(item, index) in goods.goods" :key="index">{{ item }}</li>
        </ul>
      </template>
    </Category>
    
子组件中：
	<template>
      <div class="category">
          <h3>{{title}}</h3>
          <!-- 定义一个插槽 -->
          //可以传递多个数据，最终会以键值对的方式传给父组件中的scoped中数据组成对象
          <slot :goods="items.goods" x="a">我是默认值，当使用者没有传递具体结构时，我会显示</slot>
      </div>
    </template>

    <script>
    export default {    
        name:'Category',
        props:['title'],
         data(){
        return {
          items:{
            goods:['err','err','err']
          }
        }
      }
    }
    </script>
```

