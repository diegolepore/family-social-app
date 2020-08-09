<template>
  <div class="w-full max-w-screen-sm">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Sign up</h1>
    </div>
    <form @submit.prevent="signUp()" class="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <input
          class="px-3 py-2 border rounded w-full"
          type="text"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="mb-4">
        <input
          class="px-3 py-2 border rounded w-full"
          type="text"
          placeholder="Lastname"
          v-model="lastname"
        />
      </div>
      <div class="mb-4">
        <input
          class="px-3 py-2 border rounded w-full"
          type="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-4">
        <input
          class="px-3 py-2 border rounded w-full"
          type="password"
          placeholder="Password"
          v-model="pass"
        />
      </div>
      <div class="mb-4">
        <input
          class="px-3 py-2 border rounded w-full"
          type="password"
          placeholder="Repeat password"
          v-model="passConfirm"
        />
      </div>
      <div class="flex justify-end">
        <button
          :disabled="!isValid"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Sign up</button>
      </div>
    </form>
    <p class="text-red-500 text-xs italic">{{ GET_AUTH_ITEM('error') }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import unsplash, { toJson } from "../plugins/unsplash";
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      pass: "",
      passConfirm: "",
      bannerPhoto: "",
    };
  },
  methods: {
    ...mapActions("auth", ["CREATE_USER"]),
    signUp() {
      const newUserPayload = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        pass: this.pass,
        photo:
          "https://www.biography.com/.image/t_share/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg",
        bannerPhoto: this.bannerPhoto,
        following: [],
        followers: [],
        followingsLength: 0,
        followersLength: 0,
        likedPosts: []
      };

      this.CREATE_USER(newUserPayload);
    },
  },
  created() {
    axios({
      method: "get",
      url: "https://api.unsplash.com/photos/random",
      params: {
        query: "europe",
        orientation: "landscape",
        client_id: "_dUNgJYVixJ-k02_PwL2JFmZWF-Qyh0c2MqJvhcCb-o",
      },
    })
      .then((res) => {
        this.bannerPhoto = res.data.urls.regular;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  computed: {
    ...mapGetters("auth", ["GET_AUTH_ITEM"]),
    isValid() {
      return (
        this.pass === this.passConfirm &&
        this.pass.trim() != "" &&
        this.pass.length >= 6
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>