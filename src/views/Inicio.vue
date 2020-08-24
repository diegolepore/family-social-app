<template>
  <div class="w-full md:w-9/12">

    <PostExcerptItem v-for="(post, index) in posts" :key="index" :post="post" />
  
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
import PostExcerptItem from "../components/PostExcerptItem";

export default {
  name: "Inicio",
  components: {
   
    PostExcerptItem
  },
  methods: {
    ...mapActions("posts", ["GET_POSTS"]),
    ...mapActions("users", ["GET_USERS"]),
  },
  async created() {
    await this.GET_USERS("all-users");
    await this.GET_POSTS();
  },
  computed: {
    ...mapState("posts", ["posts"]),
  },
};
</script>
