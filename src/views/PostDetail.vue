<template>
  <div>
    <div class="w-full md:w-2/5 mx-auto">
      <div class="mx-5 my-3 text-sm">
        <!-- <a href class="text-red-600 font-bold tracking-widest">CATEGORY</a> -->
      </div>
      <div class="w-full text-gray-800 text-4xl px-5 font-bold leading-none">{{ post.title }}</div>

      <div class="w-full text-gray-500 px-5 pb-5 pt-2">{{ post.subtitle }}</div>

      <div class="mx-5">
        <img
          :v-if="post.mainImage"
          :src="post.mainImage"
        />
      </div>

      <!-- <div class="w-full text-gray-600 text-normal mx-5">
        <p
          class="border-b py-3"
        >Georgia Gov. Brian Kemp speaks to the media during a press conference. | Kevin C. Cox/Getty Images</p>
      </div>-->

      <div class="w-full text-gray-600 font-thin italic px-5 pt-3">
        By
        <strong class="text-gray-700">{{ post.user.name }} {{ post.user.lastname }}</strong>
        <br />07/17/2020 09:57 AM EDT
        <br />Updated: 07/17/2020 10:33 AM EDT
      </div>

      <div class="px-5 w-full mx-auto">
        <p class="my-5">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      postId: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("posts", ["post"]),
  },
  created() {
    this.GET_POST(this.postId);
  },
  methods: {
    ...mapActions("posts", ["GET_POST"]),
  },
};
</script>

<style lang="scss" scoped>
</style>