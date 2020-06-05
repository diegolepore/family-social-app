<template>
  <div>
    <h1>Edit todo</h1>
    <div>{{ post }}</div>
    <form @submit.prevent="EDIT_POST(post)">
      <input type="text" v-model="post.title" />
      <input type="text" v-model="post.subtitle" />
      <input type="text" v-model="post.body" />
      <button type="submit">Edit</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "EditPost",
  data() {
    return {
      postId: this.$route.params.id
    };
  },
  methods: {
    ...mapActions("posts", ["GET_POST", "EDIT_POST"])
  },
  computed: {
    ...mapState("posts", ["post"])
  },
  created() {
    this.GET_POST(this.postId);
  }
};
</script>

<style lang="scss" scoped>
</style>