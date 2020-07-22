<template>
  <div id="app" class="bg-gray-200 h-screen">
    <Nav />
    <div class="flex justify-center p-10">
        <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";
export default {
  components: {
    Nav
  }
};
</script>

<style lang="scss" scoped>
</style>