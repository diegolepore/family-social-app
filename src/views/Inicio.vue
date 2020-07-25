<template>
  <div class="w-full md:w-9/12">
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <h1>{{ post.title }}</h1>
        <h3>{{ post.subtitle }}</h3>
        <hr />
        <p>{{ post.body }}</p>

        <router-link :to="{name: 'EditPost', params: {id: post.id}}">
          <button type="button">Edit</button>
        </router-link>
        <button @click="DELETE_POST(post.id)">Delete post</button>
      </li>
    </ul>
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
    this.GET_POSTS();
    this.GET_USERS("all-users");
  },
  computed: {
    ...mapState("posts", ["posts"]),
  },
};
</script>
