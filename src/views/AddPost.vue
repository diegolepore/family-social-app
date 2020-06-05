<template>
  <div>
    <h1>Add todo</h1>
    <form @submit.prevent="ADD_POST({title, subtitle, body})">
      <input type="text" placeholder="Title" v-model="title" />
      <input type="text" placeholder="Subtitle" v-model="subtitle" />
      <input type="text" placeholder="Body" v-model="body" />
      <button type="submit">Add post</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      subtitle: "",
      body: ""
    };
  },
  methods: {
    ...mapActions("posts", ["ADD_POST"])
  }
};
</script>

<style lang="scss" scoped>
</style>