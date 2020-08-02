<template>
  <div class="w-full md:w-9/12">
    <div
      class="mb-10 w-full max-w-screen-lg m-auto lg:flex"
      v-for="(post, index) in posts"
      :key="index"
    >
      <div class="flex-1 border border-gray-400 rounded p-4 bg-white">
        <div class="mb-8">
          <div class="text-gray-900 font-bold text-xl mb-2">
            <router-link :to="{name: 'PostDetail', params: {id: post.id}}">{{ post.title }}</router-link>
          </div>
          <p class="text-gray-700 text-base">{{ post.body }}</p>
        </div>
        <div class="flex items-center">
          <div class="text-sm">
            <p
              class="text-sm text-gray-600 flex items-center"
            >{{ post.user.name }} {{ post.user.lastname }}</p>
            <!-- <p class="text-gray-600">Aug 18</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";

export default {
  name: "Inicio",
  methods: {
    ...mapActions("posts", ["GET_POSTS", "DELETE_POST"]),
    ...mapActions("users", ["GET_USERS"]),
  },
  created() {
    this.GET_USERS("all-users");
  },
  computed: {
    ...mapState("posts", ["posts"]),
  },
};
</script>
