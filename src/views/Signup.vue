<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="signUp()">
      <input type="email" placeholder="Add your email" v-model="email" />
      <input type="password" placeholder="Add your email" v-model="pass" />
      <input type="password" placeholder="Add your email" v-model="passConfirm" />
      <button type="submit" :disabled="!isValid">Signup</button>
    </form>
    <p>{{ GET_AUTH_ITEM('error') }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      pass: "",
      passConfirm: ""
    };
  },
  methods: {
    ...mapActions("auth", ["CREATE_USER"]),
    signUp() {
      const newUserPayload = {
        email: this.email,
        pass: this.pass
      };

      this.CREATE_USER(newUserPayload);
    }
  },
  computed: {
    ...mapGetters("auth", ["GET_AUTH_ITEM"]),
    isValid() {
      return (
        this.pass === this.passConfirm &&
        this.pass.trim() != "" &&
        this.pass.length >= 6
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>