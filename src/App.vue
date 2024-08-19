<script setup>
import Home from "./components/Home.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
<div class="flex">
  <div class="tab">
<router-link to="/hex2024-vue-week1">
  home
</router-link>
|
<router-link to="/home">
  week1
</router-link>
|
<router-link to="/about">
 week2
</router-link>

</div>
<router-view></router-view>
</div>

</template>

<style scoped>
.flex{
  display: flex;
  flex-direction: column;
}
</style>
