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
      ></div>

      <div
        :class="[post.mainImage ? 'lg:border-l-0 lg:rounded-l-none lg:rounded-b-none' : '']"
        class="w-full border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-l lg:rounded-r p-4 flex flex-col justify-between leading-normal"
      >
        <div class="mb-8">
          <div class="text-gray-900 font-bold text-xl mb-2">
            <router-link :to="{name: 'PostDetail', params: {id: post.id}}">{{ post.title }}</router-link>
          </div>
          <p class="text-gray-700 text-base" v-html="post.body"></p>
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
              <Like :post="post" />
              <router-link
                :to="{ name: 'EditPost', params: {id: post.id} }"
                v-if="(post.user.uid === user.uid)"
                class="bg-blue-500 hover:bg-blue-400 text-white font-bold mr-2 py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >Editar artículo</router-link>
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
import Like from "../components/Like";

export default {
  name: "Inicio",
  components: {
    Like
  },
  methods: {
    ...mapActions("posts", [
      "GET_POSTS",
      "GET_POST",
      "DELETE_POST",
    ]),
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
