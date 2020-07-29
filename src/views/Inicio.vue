<template>
  <div class="w-full md:w-9/12">
    <div
      class="mb-10 w-full max-w-screen-lg m-auto lg:flex"
      v-for="(post, index) in posts"
      :key="index"
    >
      <!-- <div
        class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style="background-image: url('https://images.unsplash.com/photo-1595927238580-797684d76bd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80')"
        title="Woman holding a mug"
      ></div>
      <div
        class="flex-1 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
      >-->
      <div class="flex-1 border border-gray-400 rounded p-4 bg-white">
        <div class="mb-8">
          <!-- <p class="text-sm text-gray-600 flex items-center">
            <svg
              class="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
              />
            </svg>
            Members only
          </p>-->
          <div class="text-gray-900 font-bold text-xl mb-2">{{ post.title }}</div>
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
    <!-- <ul>
      <li class="mb-12" v-for="(post, index) in posts" :key="index">
        <h2 class="font-bold text-xl mb-2">{{ post.title }}</h2>
        <h3>{{ post.subtitle }}</h3>
        <hr />
        <p class="text-gray-700 text-base">{{ post.body }}</p>
        <strong>Author: {{ post.user.email }}</strong>
        <br />
        <br />
        <router-link :to="{name: 'EditPost', params: {id: post.id}}">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            type="button"
          >Edit</button>
        </router-link>
        <button
          class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full"
          @click="DELETE_POST(post.id)"
        >Delete post</button>
      </li>
    </ul>-->
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
