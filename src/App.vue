<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="IS_USER_ACTIVE" to="/">Inicio</router-link>&nbsp;|
      <router-link v-if="!IS_USER_ACTIVE" to="/signup">Signup</router-link>&nbsp;|
      <router-link v-if="!IS_USER_ACTIVE" to="/login">Login</router-link>&nbsp;|
      <button v-if="IS_USER_ACTIVE" @click="LOG_OUT">Log out</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("auth", ["LOG_OUT"])
  },
  computed: {
    ...mapGetters("auth", ["IS_USER_ACTIVE"])
  }
};
</script>

<style lang="scss" scoped>
</style>