<template>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Users",
  methods: {
    ...mapActions("users", ["GET_USERS"])
  },
  created() {
    this.GET_USERS();
  },
  computed: {
    ...mapState("users", ["users"])
  }
};
</script>

<style lang="scss" scoped>

</style>