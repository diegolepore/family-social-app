<template>
  <div class="w-full max-w-screen-sm"> 
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Sign up</h1>
    </div>
    <form @submit.prevent="signUp()" class="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <input class="px-3 py-2 border rounded w-full" type="text" placeholder="Name" v-model="name" />
      </div>
      <div class="mb-4">
        <input class="px-3 py-2 border rounded w-full" type="text" placeholder="Lastname" v-model="lastname" />
      </div>
      <div class="mb-4">
        <input class="px-3 py-2 border rounded w-full" type="email" placeholder="Email" v-model="email" />
      </div>
      <div class="mb-4">
        <input class="px-3 py-2 border rounded w-full" type="password" placeholder="Password" v-model="pass" />
      </div>
      <div class="mb-4">
        <input class="px-3 py-2 border rounded w-full" type="password" placeholder="Repeat password" v-model="passConfirm" />
      </div>
      <div class="flex justify-right">
        <button :disabled="!isValid" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign up</button>
      </div>
    </form>
    <p class="text-red-500 text-xs italic">{{ GET_AUTH_ITEM('error') }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      pass: "",
      passConfirm: ""
    };
  },
  methods: {
    ...mapActions("auth", ["CREATE_USER"]),
    signUp() {
      const newUserPayload = {
        name: this.name,
        lastname: this.lastname,
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