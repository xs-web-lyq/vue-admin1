
<template>
  <div class="container">
    <Category title="游戏">
      <template scope="goods">
        <ul>
          <li v-for="(item, index) in goods.goods" :key="index">{{ item }}</li>
        </ul>
      </template>
    </Category>
    <Category title="游戏">
      <template scope="goods">
        <ol>
          <li v-for="(item, index) in goods.goods" :key="index">{{ item }}</li>
        </ol>
      </template>
    </Category>
    <Category title="游戏">
      <template scope="goods">
          <h4 v-for="(item, index) in goods.goods" :key="index">{{ item }}</h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";

export default {
  name: "App",
  components: { Category },
};
</script>
<style lang="css">
.container {
  display: flex;
  justify-content: space-around;
}
</style>