<template>
  <div class="w-full md:w-9/12">
    <div
      class="mb-10 w-full max-w-screen-lg m-auto lg:flex"
      v-for="(post, index) in posts"
      :key="index"
    >
      <div
        v-if="post.mainImage"
        class="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        :style="`background-image: url('${post.mainImage}')`"
        :title="post.title"
      >
      
      </div>

      <div
        :class="[post.mainImage ? 'lg:border-l-0 lg:rounded-l-none lg:rounded-b-none' : '']"
        class="w-full border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-l lg:rounded-r p-4 flex flex-col justify-between leading-normal"
      >
        <div class="mb-8">
          <div class="text-gray-900 font-bold text-xl mb-2">
            <router-link :to="{name: 'PostDetail', params: {id: post.id}}">{{ post.title }}</router-link>
          </div>
          <p class="text-gray-700 text-base">{{ post.body }}</p>
        </div>
        <div class="flex items-center">
          <div class="flex-1 flex items-center justify-between text-sm">
            <div class="flex items-center">
              <div
                class="rounded-full w-8 h-8 mr-3"
                :style="`background: url(${post.user.photo}) center; background-size: cover;`"
              ></div>
              <p
                class="text-sm text-gray-600 flex items-center"
              >{{ post.user.name }} {{ post.user.lastname }}</p>
            </div>

            <div class="flex">
              <div class="flex items-center mr-2 text-gray-700 text-sm mr-3 cursor-pointer">
                <svg fill="none" viewBox="0 0 24 24"  class="w-4 h-4 mr-1" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                <span>0</span>
              </div>
              <button
                v-if="(post.user.uid === user.uid)"
                @click="DELETE_POST(post.id)"
                class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
              >Eliminar artículo</button>
            </div>
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
    ...mapState("auth", ["user"]),
  },
};
</script>
