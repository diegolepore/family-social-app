<template>
  <div id="app">
    <Nav />
    <div class="flex justify-center p-10 overflow-auto">
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

<style lang="scss">
body {
  background-color: #EDF2F7;
}
</style>